import express from "express";
import {
  subscribe,
  getSubscribers
} from "../controllers/subscribersController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route
router.post("/subscribe", subscribe);

// Protected route
router.get(
  "/subscribers",
  authMiddleware,
  getSubscribers
);

export default router;
