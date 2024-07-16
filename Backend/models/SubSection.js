const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema({
  videoUrl: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  timeDuration: {
    type: String,
  },
});

module.exports = mongoose.model("SubSection", subSectionSchema);
