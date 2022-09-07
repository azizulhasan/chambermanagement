const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const educationSchema = new Schema(
  {
    degree: {
      type: String,
      required: true,
    },
    from: {
      type: Number,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    institution: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Education = mongoose.model("Education", educationSchema);

module.exports = Education;
