const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @route   POST /api/books/add
 * @desc    Add a new book (requires login)
 * @access  Private
 */
router.post("/add", authMiddleware, async (req, res) => {
  const { title, author, description } = req.body;

  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newBook = new Book({
      title,
      author,
      description,
      owner: user._id,
      location: user.location,
    });

    await newBook.save();

    res.status(201).json({
      message: "Book added successfully",
      book: newBook,
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
});

/**
 * @route   GET /api/books/nearby
 * @desc    Get books near a given location (lat, lng)
 * @access  Public
 */
router.get("/nearby", async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ message: "Latitude and Longitude are required" });
  }

  try {
    const books = await Book.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: 5000, // 5 km
        },
      },
    }).populate("owner", "name email");

    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Error fetching nearby books", error: err.message });
  }
});

/**
 * @route   GET /api/books/search?title=...&author=...
 * @desc    Search books by title and/or author
 * @access  Public
 */
router.get("/search", async (req, res) => {
  const { title, author } = req.query;

  const query = {};
  if (title) query.title = { $regex: title, $options: "i" };
  if (author) query.author = { $regex: author, $options: "i" };

  try {
    const books = await Book.find(query).populate("owner", "name email");
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Search failed", error: err.message });
  }
});

/**
 * @route   GET /api/books/:id
 * @desc    Get book details by ID
 * @access  Public
 */
  router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("owner", "name email");
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
