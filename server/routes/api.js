const express = require("express");
const router = express.Router();
const News = require("../models/News");
const User = require("../models/User");

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/news", async (req, res) => {
  try {
    const page = parseInt(req.query._page) || 1;
    const limit = parseInt(req.query._per_page) || 1000;
    const skip = (page - 1) * limit;

    if (req.query._page && req.query._per_page) {
      const total = await News.countDocuments();
      const data = await News.find().skip(skip).limit(limit);

      res.json({
        data: data,
        pages: Math.ceil(total / limit),
        items: total,
      });
    } else {
      const news = await News.find();
      res.json(news);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/news/:id", async (req, res) => {
  try {
    const news = await News.findOne({ id: req.params.id });
    if (!news) return res.status(404).json({ message: "News not found" });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/news", async (req, res) => {
  try {
    const newId = Date.now().toString();
    const news = new News({
      id: newId,
      ...req.body,
    });
    const savedNews = await news.save();
    res.status(201).json(savedNews);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/news/:id", async (req, res) => {
  try {
    const news = await News.findOneAndUpdate({ id: req.params.id }, req.body, {
      new: true,
    });
    res.json(news);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/news/:id", async (req, res) => {
  try {
    await News.findOneAndDelete({ id: req.params.id });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
