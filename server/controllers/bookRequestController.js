const Book = require("../models/Book");
const BookRequest = require("../models/BookRequest");
const Notification = require("../models/Notification");

exports.sendBookRequest = async (req, res) => {
  try {
    const { bookId, message } = req.body;

    const book = await Book.findById(bookId).populate("owner");
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.owner._id.toString() === req.userId) {
      return res.status(400).json({ message: "You cannot request your own book" });
    }

    const request = await BookRequest.create({
      requester: req.userId,
      owner: book.owner._id,
      book: book._id,
      message: message || "I would like to borrow this book.",
    });

    // Notify owner
    await Notification.create({
      user: book.owner._id,
      type: "REQUEST_CREATED",
      data: { requestId: request._id, bookId: book._id, bookTitle: book.title },
    });

    res.status(201).json({ message: "Request sent", request });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getReceivedRequests = async (req, res) => {
  try {
    const requests = await BookRequest.find({ owner: req.userId })
      .populate("book", "title")
      .populate("requester", "fullName email city pincode")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getSentRequests = async (req, res) => {
  try {
    const requests = await BookRequest.find({ requester: req.userId })
      .populate("book", "title")
      .populate("owner", "fullName email")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body; // accepted | rejected
    if (!["accepted", "rejected", "pending"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const request = await BookRequest.findById(req.params.id).populate("book");
    if (!request) return res.status(404).json({ message: "Request not found" });

    // Only book owner can update
    if (request.owner.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    request.status = status;
    await request.save();

    // Notify requester
    await Notification.create({
      user: request.requester,
      type: status === "accepted" ? "REQUEST_ACCEPTED" : "REQUEST_REJECTED",
      data: { requestId: request._id, bookId: request.book._id, bookTitle: request.book.title },
    });

    res.json({ message: `Request ${status}`, request });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
