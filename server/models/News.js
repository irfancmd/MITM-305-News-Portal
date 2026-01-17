const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  text: { type: String, required: true },
  user_id: { type: String, required: true },
  timestamp: { type: String, required: true },
});

const NewsSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  author_id: { type: String, required: true },
  comments: [CommentSchema],
});

module.exports = mongoose.model("News", NewsSchema);
