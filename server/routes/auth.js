const express = require("express");
const router = express.Router();
const {
  googleAuthController,
  signUpController,
  sigInController,
  activationController,
  getConfirmationEmail,
} = require("../controllers/authController");

router.post("/google", googleAuthController);
router.post("/local/signup", signUpController);
router.post("/local/signin", sigInController);
router.get("/email/verify/:token", activationController);
router.post("/email/conformation", getConfirmationEmail);

module.exports = router;
