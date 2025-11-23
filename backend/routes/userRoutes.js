const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");


router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", protect, (req, res) => {
  res.json({ message: "Profile is accessed", user: req.user });
});


module.exports = router;
