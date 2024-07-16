const Course = require("../models/Course");
const Tag = require("../models/tags");
const User = require("../models/User");

const { uploadImageToCloudinary } = require("../utils/imageUploader");

// create course

exports.createCourse = async (req, res) => {
  try {
    // fetch data
    const { courseName, courseDescription, price, tag } = req.body;
    // get thumbnail
    const thumbnail = req.files.thumbnailImage;
    // validation
    if (!courseName || !courseDescription || !price || !tag || !thumbnail) {
      return res.status(400).json({
        success: false,
        message: "All Fields are required",
      });
    }

    // check for instructor
    const userId = req.user.Id;
    const intructorDetails = await User.findById(userId);
    console.log("Instructor Details", intructorDetails);

    if (!intructorDetails) {
      return res
        .status(400)
        .json({ success: false, message: "Instructor details not found" });
    }

    // check given tags is valid or not
    const tagDetails = await Tag.findById(tag);
    if (!tagDetails) {
      return res
        .status(400)
        .json({ success: false, message: "Tag details not found" });
    }

    // upload image to cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    // Create an entry for new course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: intructorDetails._id,
      whatYouWillLearn,
      price,
      tags: tagDetails._id,
      thumbnail: thumbnailImage.secure_url,
    });

    // update user
    await User.findByIdAndUpdate(
      { _id: intructorDetails._id },
      { $push: { courses: newCourse._id } },
      { new: true }
    );

    // update tag schema
    return res.status(200).json({
      success: true,
      message: "course created successfully",
      data: newCourse,
    });
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: "failed to create course" });
  }
};

// get all course
exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find({});

    return res.status(200).json({
      success: true,
      message: "data for all courses fetched successfully",
      data: allCourses,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Cannot fetch courses data",
      error: e.message,
    });
  }
};
