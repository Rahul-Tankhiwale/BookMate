const Book = require("../models/Book");
const User = require("../models/User");

exports.addBook = async (req, res) => {
  try {
    const { title, author, description, imageUrl } = req.body;
    const owner = await User.findById(req.userId);
    if (!owner) return res.status(404).json({ message: "Owner not found" });

    const book = await Book.create({
      title,
      author,
      description,
      imageUrl,
      owner: owner._id,
      country: owner.country,
      state: owner.state,
      city: owner.city,
      pincode: owner.pincode,
    });

    res.status(201).json({ message: "Book added", book });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const { city, pincode } = req.query;
    const filter = {};
    if (city) filter.city = city;
    if (pincode) filter.pincode = pincode;

    const books = await Book.find(filter)
      .populate("owner", "fullName email city pincode")
      .sort({ createdAt: -1 });

    res.json(books);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate("owner", "fullName email city pincode");
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.searchBooks = async (req, res) => {
  try {
    const { query, city, pincode } = req.query;
    const mongoQuery = { isAvailable: true };

    if (query) {
      mongoQuery.$text = { $search: query };
      // Fallback partial regex match too
      mongoQuery.$or = [
        { title: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } },
      ];
    }
    if (city) mongoQuery.city = city;
    if (pincode) mongoQuery.pincode = pincode;

    const results = await Book.find(mongoQuery)
      .populate("owner", "fullName email city pincode")
      .sort({ createdAt: -1 });

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Search failed", error: err.message });
  }
};
