const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  addToWishlist,
  removeaFromWishlist,
  getWishlist,
  checkInWishlist
} = require("../controllers/wishlistController");

router.post("/", protect, addToWishlist);
router.get("/", protect, getWishlist);
router.delete("/:property_id", protect, removeaFromWishlist);
router.get("/check/:property_id", protect, checkInWishlist);

module.exports = router;
