const express = require("express");
const { getNotifications, markRead } = require("../controllers/notificationController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", auth, getNotifications);
router.put("/read", auth, markRead);

module.exports = router;
