const Tag = require("../models/tags");

exports.createTag = async (req, res) => {
  try {
    // fetch data
    const { name, description } = req.body;

    if (!name || !description) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields are required" });
    }
    // create entry in db
    const tagsDetails = await Tag.create({ name, description });
    return res
      .status(200)
      .json({ success: true, message: "Tag Added Successfully" });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
};

// getalltags handler function

exports.showAllTags = async (req, res) => {
  try {
    const allTags = await Tag.find({}, { name: true, description: true });
    return res.status(200).json({
      success: true,
      message: "All tags fetched successfully",
      allTags,
    });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
};
