const express = require("express");
const { sendMessage, getMessages } = require("../controllers/messageController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Send message in the context of a request
router.post("/", auth, sendMessage);

// Get messages for a request
router.get("/:requestId", auth, getMessages);

module.exports = router;
