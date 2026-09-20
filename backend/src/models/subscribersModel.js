import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    role: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Subscriber = mongoose.model(
  "Subscriber",
  subscriberSchema
);

export default Subscriber;