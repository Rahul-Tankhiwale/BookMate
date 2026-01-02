const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, default: "" },
    description: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // denormalized location from owner for quick matching
    country: { type: String, default: "India" },
    state: { type: String },
    city: { type: String },
    pincode: { type: String },

    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

bookSchema.index({ title: "text", author: "text" });
bookSchema.index({ city: 1, pincode: 1 });

module.exports = mongoose.model("Book", bookSchema);
