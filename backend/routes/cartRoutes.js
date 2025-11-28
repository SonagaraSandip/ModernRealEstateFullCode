const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  addToCart,
  getCart,
  updateQuantity,
  changeSize,
  removeFromCart,
} = require("../controllers/cartController");

// Add to cart
router.post("/", protect, addToCart);

// Get user cart
router.get("/", protect, getCart);

// Update quantity
router.put("/quantity/:cart_id", protect, updateQuantity);

// Change size
router.put("/size/:cart_id", protect, changeSize);

// Remove from cart
router.delete("/:cart_id", protect, removeFromCart);

module.exports = router;
