const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // user reference
  whatYouWillLearn: {
    Type: String,
  },
  courseContent: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
      },
    ],
  },
  ratingAndReviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RatingAndReview",
    },
  ], // ref
  price: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  tags: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tags",
  },
  language: {
    type: String,
  },
  studentsEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ], // user ref
});

module.exports = mongoose.model("Course", courseSchema);
