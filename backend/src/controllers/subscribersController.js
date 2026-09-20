import Subscriber from "../models/subscribersModel.js";
import Joi from "joi";
import { sendWelcomeEmail } from "../services/emailService.js";


const subscribeSchema = Joi.object({
  username: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required(),

  email: Joi.string()
    .trim()
    .email()
    .required(),

  role: Joi.string()
    .valid(
      "Music Journalist",
      "Producer",
      "Event Promoter",
      "Label A&R",
      "Just here for the culture"
    )
    .required()
});


export const subscribe = async (req, res) => {
  try {

    // Validate request data
    const { error, value } = subscribeSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message
      });
    }

    const { username, email, role } = value;


    // Check if email already exists
    const existingSubscriber = await Subscriber.findOne({
      email
    });

    if (existingSubscriber) {
      return res.status(409).json({
        message: "This email is already subscribed to NewGen."
      });
    }


    // Create subscriber
    const newSubscriber = await Subscriber.create({
      username,
      email,
      role
    });


    // Send welcome email
    const emailSent = await sendWelcomeEmail(
      email,
      username
    );


    console.log("New subscriber:", newSubscriber.email);

    if (emailSent) {
      console.log("Welcome email sent successfully.");
    } else {
      console.log("Subscriber saved, but welcome email could not be sent.");
    }


    return res.status(201).json({
      message: "Welcome to NewGen! You are now subscribed.",
      subscriber: {
        username: newSubscriber.username,
        email: newSubscriber.email,
        role: newSubscriber.role
      }
    });

  } catch (error) {

    console.error("Subscription error:", error);

    return res.status(500).json({
      message: "Something went wrong. Please try again."
    });

  }
};

export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find()
      .sort({ createdAt: -1 });

    return res.status(200).json({
      count: subscribers.length,
      subscribers
    });

  } catch (error) {
    console.error("Get subscribers error:", error);

    return res.status(500).json({
      message: "Unable to retrieve subscribers."
    });
  }
};