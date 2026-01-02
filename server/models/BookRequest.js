const mongoose = require("mongoose");

const bookRequestSchema = new mongoose.Schema(
  {
    requester: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    message: { type: String, default: "I would like to borrow this book." },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

bookRequestSchema.index({ owner: 1 });
bookRequestSchema.index({ requester: 1 });

module.exports = mongoose.model("BookRequest", bookRequestSchema);
