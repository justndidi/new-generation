import express from "express";

import {
  submitArtist,
  getArtistSubmissions,
  updateArtistStatus,
} from "../controllers/artistController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// =========================
// PUBLIC ROUTE
// =========================

router.post("/artists", submitArtist);

// =========================
// PROTECTED ADMIN ROUTES
// =========================

// Get all artist submissions

router.get("/artists", authMiddleware, getArtistSubmissions);

// Update artist status

router.patch("/artists/:id/status", authMiddleware, updateArtistStatus);

export default router;
