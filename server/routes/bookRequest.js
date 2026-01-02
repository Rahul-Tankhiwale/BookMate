// server/routes/bookRequest.js

const express = require("express");
const router = express.Router();
const BookRequest = require("../models/BookRequest");
const Book = require("../models/Book");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ PUT: Update request status (accept/reject)
router.put("/:id/status", authMiddleware, async (req, res) => {
  const { status } = req.body;

  if (!["pending", "accepted", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const request = await BookRequest.findById(req.params.id).populate("book");

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.book.owner.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    request.status = status;
    await request.save();

    res.json({ message: `Request ${status}`, request });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ GET: Book owner sees requests made to their books
router.get("/my-requests", authMiddleware, async (req, res) => {
  try {
    const ownedBooks = await Book.find({ owner: req.userId });
    const bookIds = ownedBooks.map((b) => b._id);

    const requests = await BookRequest.find({ book: { $in: bookIds } })
      .populate("book", "title")
      .populate("requester", "name email");

    res.json(requests);
  } catch (err) {
    console.error("Error fetching book requests", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
