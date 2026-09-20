import mongoose from "mongoose";

const artistSubmissionSchema = new mongoose.Schema(
  {
    artistName: {
      type: String,
      required: true,
      trim: true
    },

    genre: {
      type: String,
      required: true,
      trim: true
    },

    location: {
      type: String,
      required: true,
      trim: true
    },

    musicLink: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },

    status: {
      type: String,
      enum: [
        "New",
        "Listened",
        "Featured",
        "Declined"
      ],
      default: "New"
    }
  },
  {
    timestamps: true
  }
);

const ArtistSubmission = mongoose.model(
  "ArtistSubmission",
  artistSubmissionSchema
);

export default ArtistSubmission;