const express = require("express");
const {
  sendBookRequest,
  getReceivedRequests,
  getSentRequests,
  updateRequestStatus,
} = require("../controllers/bookRequestController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Create a request
router.post("/", auth, sendBookRequest);

// Requests received by the owner (current user)
router.get("/received", auth, getReceivedRequests);

// Requests sent by the current user
router.get("/sent", auth, getSentRequests);

// Accept/Reject
router.put("/:id/status", auth, updateRequestStatus);

module.exports = router;
