import ArtistSubmission from "../models/ArtistSubmission.js";
import Joi from "joi";


const artistSchema = Joi.object({
  artistName: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required(),

  genre: Joi.string()
    .trim()
    .min(2)
    .max(150)
    .required(),

  location: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required(),

  musicLink: Joi.string()
    .trim()
    .uri()
    .required(),

  email: Joi.string()
    .trim()
    .email()
    .required()
});


// =========================
// SUBMIT ARTIST
// =========================

export const submitArtist = async (req, res) => {

  try {

    const { error, value } =
      artistSchema.validate(req.body);


    if (error) {

      return res.status(400).json({
        message: error.details[0].message
      });

    }


    const {
      artistName,
      genre,
      location,
      musicLink,
      email
    } = value;


    const submission =
      await ArtistSubmission.create({
        artistName,
        genre,
        location,
        musicLink,
        email
      });


    console.log(
      "New artist submission:",
      submission.artistName
    );


    return res.status(201).json({

      message:
        "Your music has been submitted successfully.",

      submission: {
        id: submission._id,
        artistName: submission.artistName,
        genre: submission.genre,
        location: submission.location,
        musicLink: submission.musicLink,
        email: submission.email,
        status: submission.status
      }

    });


  } catch (error) {

    console.error(
      "Artist submission error:",
      error
    );


    return res.status(500).json({

      message:
        "Something went wrong. Please try again."

    });

  }

};


// =========================
// GET ARTIST SUBMISSIONS
// =========================

export const getArtistSubmissions =
  async (req, res) => {

    try {

      const submissions =
        await ArtistSubmission.find()
          .sort({ createdAt: -1 });


      return res.status(200).json({

        count: submissions.length,

        submissions

      });


    } catch (error) {

      console.error(
        "Get artist submissions error:",
        error
      );


      return res.status(500).json({

        message:
          "Unable to retrieve artist submissions."

      });

    }

  };


// =========================
// UPDATE ARTIST STATUS
// =========================

export const updateArtistStatus =
  async (req, res) => {

    try {

      const { id } = req.params;

      const { status } = req.body;


      // Allowed statuses

      const allowedStatuses = [
        "New",
        "Listened",
        "Featured",
        "Declined"
      ];


      // Validate status

      if (!allowedStatuses.includes(status)) {

        return res.status(400).json({

          message:
            "Invalid artist status."

        });

      }


      // Find artist

      const artist =
        await ArtistSubmission.findById(id);


      if (!artist) {

        return res.status(404).json({

          message:
            "Artist submission not found."

        });

      }


      // Update status

      artist.status = status;

      await artist.save();


      return res.status(200).json({

        message:
          "Artist status updated successfully.",

        submission: artist

      });


    } catch (error) {

      console.error(
        "Update artist status error:",
        error
      );


      return res.status(500).json({

        message:
          "Unable to update artist status."

      });

    }

  };