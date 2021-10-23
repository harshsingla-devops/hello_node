const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
  title: String,
  author: {
    type: String,
    default: "Harsh",
  },
  content: String,
});
module.exports = mongoose.model("BlogPost", blogSchema);
