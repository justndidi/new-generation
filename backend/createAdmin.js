import "dotenv/config";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import dns from "dns";
import Admin from "./src/models/Admin.js";

// Use Google DNS for MongoDB Atlas SRV resolution
dns.setServers(["8.8.8.8"]);

const createAdmin = async () => {
  try {
    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;

    if (!username || !password) {
      throw new Error(
        "ADMIN_USERNAME or ADMIN_PASSWORD is missing from .env"
      );
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB.");

    const existingAdmin = await Admin.findOne({
      username
    });

    if (existingAdmin) {
      console.log("Admin already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash(
      password,
      12
    );

    await Admin.create({
      username,
      password: hashedPassword
    });

    console.log("Admin created successfully.");
    console.log(`Username: ${username}`);

  } catch (error) {
    console.error("Error creating admin:", error.message);

  } finally {
    await mongoose.connection.close();
  }
};

createAdmin();