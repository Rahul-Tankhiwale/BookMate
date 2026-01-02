const Notification = require("../models/Notification");

exports.getNotifications = async (req, res) => {
  try {
    const items = await Notification.find({ user: req.userId })
      .sort({ createdAt: -1 })
      .limit(100);
    res.json(items);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.markRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.userId, read: false },
      { $set: { read: true } }
    );
    res.json({ message: "Marked as read" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
