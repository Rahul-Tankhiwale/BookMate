const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: ["REQUEST_CREATED", "REQUEST_ACCEPTED", "REQUEST_REJECTED", "MESSAGE"],
      required: true,
    },
    data: { type: Object, default: {} }, // e.g., { requestId, bookId, bookTitle }
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

notificationSchema.index({ user: 1, read: 1, createdAt: -1 });

module.exports = mongoose.model("Notification", notificationSchema);
