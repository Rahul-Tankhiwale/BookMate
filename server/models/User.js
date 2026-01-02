const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: String },
    country: { type: String, default: "India" },
    state: { type: String },
    city: { type: String },
    pincode: { type: String },
    // optional avatar later
    avatarUrl: { type: String },
  },
  { timestamps: true }
);

userSchema.index({ city: 1, pincode: 1 });

module.exports = mongoose.model("User", userSchema);
