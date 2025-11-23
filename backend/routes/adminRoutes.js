const express = require("express");
const router = express.Router();
const db = require("../db");
const { protect, adminOnly } = require("../middleware/authMiddleware");

//get all user
router.get("/users", protect, adminOnly, (req, res) => {
  db.query("SELECT id , name , email , role FROM users", (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database query error" });
    }
    res.json(results);
  });
});

//promote user to admin
router.put("/promote/:id", protect, adminOnly, (req, res) => {
  const id = req.params.id;
  db.query(
    "UPDATE users SET role = 'admin' WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Failed to promote" });
      }
      res.json({ message: "User promoted to admin" });
    }
  );
});

//database summary
router.get("/summary", protect, adminOnly, (req, res) => {
  db.query(
    `SELECT 
    (SELECT COUNT(*) FROM users) AS users,
    (SELECT COUNT(*) FROM properties) AS properties,
    (SELECT COUNT(*) FROM properties WHERE in_stock = 1) AS inStock`,
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database query error" });
      } else {
        res.json(results[0]);
      }
    }
  );
});

//admin route
router.get("/dashboard", protect, adminOnly, (req, res) => {
  res.json({ message: "Welcome to admin dashboard", user: req.user });
});

module.exports = router;
