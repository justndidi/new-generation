import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Joi from "joi";

const loginSchema = Joi.object({
  username: Joi.string()
    .trim()
    .required(),

  password: Joi.string()
    .required()
});


export const loginAdmin = async (req, res) => {
  try {

    // Validate login data
    const { error, value } = loginSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: "Username and password are required."
      });
    }

    const { username, password } = value;


    // Find admin
    const admin = await Admin.findOne({
      username
    });

    if (!admin) {
      return res.status(401).json({
        message: "Invalid username or password."
      });
    }


    // Compare password
    const passwordMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid username or password."
      });
    }


    // Create JWT
    const token = jwt.sign(
      {
        id: admin._id,
        username: admin.username
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h"
      }
    );


    return res.status(200).json({
      message: "Login successful.",
      token
    });

  } catch (error) {

    console.error("Admin login error:", error);

    return res.status(500).json({
      message: "Something went wrong during login."
    });

  }
};