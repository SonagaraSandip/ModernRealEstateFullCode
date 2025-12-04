const db = require("../db");
exports.addToCart = (req, res) => {
  const userId = req.user.id;
  const { property_id, quantity, size } = req.body;

  if (!property_id || !size)
    return res
      .status(400)
      .json({ message: "property_id and size are required" });

  //id same quantity and size should be unique
  const checkSql =
    "SELECT * FROM cart where user_id = ? AND property_id = ? AND size = ?";
  db.query(checkSql, [userId, property_id, size], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Failed to check cart" });
    }

    if (results.length > 0) {
      const updateSql =
        "UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND property_id = ? AND size = ?";

      db.query(updateSql, [quantity || 1, userId, property_id, size]);
      return res
        .status(200)
        .json({ message: "Property updated in cart successfully" });
    }

    const insertSql =
      "INSERT INTO cart (user_id, property_id, quantity, size) VALUES (?, ?, ?, ?)";
    db.query(insertSql, [userId, property_id, quantity || 1, size]);
    return res
      .status(200)
      .json({ message: "Property added to cart successfully" });
  });
};

exports.getCart = (req, res) => {
  const userId = req.user.id;

  const sql = `select c.id as cart_id , c.quantity , c.size , p.* from cart c join properties p on c.property_id = p.id where c.user_id = ?`;

  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });

    const formatted = results.map((r) => ({
      cart_id: r.cart_id,
      property_id: r.id,
      title: r.title,
      size: r.size,
      quantity: r.quantity,
      price: r.price,
      image: r.image,
      size_sqft: r.size_sqft.split(","),
    }));

    res.json({ cart: formatted });
  });
};

exports.updateQuantity = (req, res) => {
  const cart_id = req.params.cart_id;
  const { quantity } = req.body;

  const sql = `UPDATE cart SET quantity = quantity + ? WHERE id = ?`;

  db.query(sql, [quantity, cart_id], (err) => {
    if (err) return res.status(500).json({ message: "Failed to update" });

    res.json({ message: "Quantity updated" });
  });
};

exports.changeSize = (req, res) => {
  const cart_id = req.params.cart_id;
  const { size } = req.body;

  const sql = `UPDATE cart SET size = ? WHERE id = ?`;

  db.query(sql, [size, cart_id], (err) => {
    if (err) return res.status(500).json({ message: "Failed to update size" });

    res.json({ message: "Size updated" });
  });
};

exports.removeFromCart = (req, res) => {
  const  cart_id  = req.params.cart_id;

  const sql = `DELETE FROM cart WHERE id = ?`;

  db.query(sql, [cart_id], (err) => {
    if (err) return res.status(500).json({ message: "Failed to remove" });

    res.json({ message: "Item removed" });
  });
};
