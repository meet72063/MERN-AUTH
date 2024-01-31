const express = require("express");
const router = express.Router();
const {
  forgotPasswordController,
  resetPasswordController,
  getUserProfile,
} = require("../controllers/userController");
const { authenticateUser } = require("../middleware/authentication");

router.post("/password/forgot", forgotPasswordController);
router.post("/password/reset/:verificationToken", resetPasswordController);
router.get("/profile", authenticateUser, getUserProfile);

module.exports = router;
