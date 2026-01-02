const BookRequest = require("../models/BookRequest");
const Message = require("../models/Message");
const Notification = require("../models/Notification");

exports.sendMessage = async (req, res) => {
  try {
    const { requestId, body } = req.body;
    const request = await BookRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });

    // Only participants can chat
    const participants = [request.owner.toString(), request.requester.toString()];
    if (!participants.includes(req.userId)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Determine recipient
    const to = req.userId === request.owner.toString() ? request.requester : request.owner;

    const msg = await Message.create({
      request: request._id,
      from: req.userId,
      to,
      body,
    });

    // Notify recipient
    await Notification.create({
      user: to,
      type: "MESSAGE",
      data: { requestId: request._id, messageId: msg._id },
    });

    res.status(201).json({ message: "Message sent", data: msg });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { requestId } = req.params;
    const request = await BookRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });

    const participants = [request.owner.toString(), request.requester.toString()];
    if (!participants.includes(req.userId)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const msgs = await Message.find({ request: requestId }).sort({ createdAt: 1 });
    res.json(msgs);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
