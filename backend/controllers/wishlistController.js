const db = require("../db");

exports.addToWishlist = (req, res) => {
  const userId = req.user.id;
  const { property_id } = req.body;

  if (!property_id) {
    return res.status(400).json({ message: "proprty_id is required" });
  }

  const sql = "INSERT INTO wishlist (user_id, property_id) VALUES (?, ?)";

  db.query(sql, [userId, property_id], (err, results) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res
          .status(400)
          .json({ message: "Property already in wishlist" });
      }
      return res.status(500).json({ message: " Failed to add to wihslist" });
    }
    res.status(200).json({
      message: "Property added to wishlist successfully",
      wishlistItemId: results.insertId,
    });
  });
};

//delete form wishlist
exports.removeaFromWishlist = (req, res) => {
  const userId = req.user.id;
  const property_id = req.params.property_id;

   if (!property_id) {
    return res.status(400).json({ message: "property_id is required" });
  }

  const sql = "DELETE FROM wishlist WHERE user_id = ? AND property_id = ? ";

  db.query(sql, [userId, property_id], (err , results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Failed to remove from wishlist" });
    }

    // results.affectedRows helps check if something was actually deleted
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Wishlist item not found" });
    }


    res.status(200).json({ message: "Property removed from wishlist" });
  });
};

//get user wishlist
exports.getWishlist = (req, res) => {
  const userId = req.user.id;

  const sql = `SELECT p.* FROM properties p
    JOIN wishlist w ON w.property_id = p.id
    WHERE w.user_id = ?`;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Failed to get wishlist" });
    }

    //format like your GET ALL API
    const formatted = results.map((p) => ({
      id: p.id,
      title: p.title,
      type: p.type,
      price: p.price,
      description: p.description,
      in_stock: p.in_stock === 1,
      image: p.image,
      size_sqft: p.size_sqft ? p.size_sqft.split(",") : [],
      images_by_size: p.images_by_size ? JSON.parse(p.images_by_size) : {},
      created_at: p.created_at,
    }));

    res.status(200).json({ wishlist: formatted });
  });
};

//check property in wishlist or not
exports.checkInWishlist = (req, res) => {
  const userId = req.user.id;
  const property_id = req.params.property_id;

   if (!property_id) {
    return res.status(400).json({ message: "property_id is required" });
  }

  const sql = "SELECT * FROM wishlist WHERE user_id = ? AND property_id = ?";

  db.query(sql, [userId, property_id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Failed to check wishlist" });
    }

    const inWishlist = results.length > 0;
    res.status(200).json({ inWishlist });
  });
};
