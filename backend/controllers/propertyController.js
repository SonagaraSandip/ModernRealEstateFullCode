const db = require("../db");

//get all properties data using procedural sql
exports.getAllProperties = (req, res) => {
  db.query("CALL GetAllProperties()", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
    //store procedural data is inside a results
    const rows = results[0];

    //format data
    const formatted = rows.map((p) => ({
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

    res.status(200).json({
      message: "Properties fetched successfully",
      properties: formatted,
    });
  });
};

//get property by id
exports.getPropertyById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM properties WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "DB error occured" });
    } else if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No property found with this ID" });
    } else {
      return res.status(200).json({
        message: "Single Property fetched successfully",
        property: results[0],
      });
    }
  });
};

//get poperty count
exports.getPropertyCount = (req, res) => {
  const sql = "SELECT type , COUNT(*) as count FROM properties GROUP BY type";

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "DB error occured" });
    }
    res.status(200).json({
      count: results,
    });
  });
};

//add properties
exports.addProperty = (req, res) => {
  const { title, type, price, size_sqft, description, in_stock } = req.body;

  //field images
  const main_image = req.files?.main_image
    ? req.files.main_image[0].filename
    : null;
  const image_1200 = req.files?.image_1200
    ? req.files.image_1200[0].filename
    : null;
  const image_1400 = req.files?.image_1400
    ? req.files.image_1400[0].filename
    : null;
  const image_1600 = req.files?.image_1600
    ? req.files.image_1600[0].filename
    : null;

  const images_by_size = {
    1200: image_1200,
    1400: image_1400,
    1600: image_1600,
  };

  const sql =
    "INSERT INTO properties (title , type , price , size_sqft ,description , in_stock , image, images_by_size) VALUES (?,?,?,?,?,?,?, ?)";
  db.query(
    sql,
    [
      title,
      type,
      price,
      size_sqft,
      description,
      in_stock === "true" ? 1 : 0,
      main_image,
      JSON.stringify(images_by_size),
    ],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to add property" });
      }

      res.status(200).json({
        message: "Property added successfully",
        property: {
          id: results.insertId,
          title,
          type,
          price,
          size_sqft,
          description,
          in_stock: in_stock === "true" ? 1 : 0,
          image: main_image,
          images_by_size: images_by_size,
        },
      });
    }
  );
};

//update property
exports.updateProperty = (req, res) => {
  const { id } = req.params;
  const { title, type, price, size_sqft, description, in_stock } = req.body;

  //uploaded images
  const main_image = req.files?.main_image
    ? req.files.main_image[0].filename
    : null;
  const image_1200 = req.files?.image_1200
    ? req.files.image_1200[0].filename
    : null;
  const image_1400 = req.files?.image_1400
    ? req.files.image_1400[0].filename
    : null;
  const image_1600 = req.files?.image_1600
    ? req.files.image_1600[0].filename
    : null;

  //get old property
  db.query("SELECT * FROM properties WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Failed to fetch property" });
    }

    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "No property found with this ID" });
    }

    const old = result[0];

    //create new images JSON using old values if new not uploaded
    const images_by_size = {
      1200: image_1200 || JSON.parse(old.images_by_size)["1200"],
      1400: image_1400 || JSON.parse(old.images_by_size)["1400"],
      1600: image_1600 || JSON.parse(old.images_by_size)["1600"],
    };

    const finalMainImage = main_image || old.image;

    const sql =
      "UPDATE properties SET title = ? , type = ? , price = ? , size_sqft = ? , description = ? , in_stock = ? , image = ?, images_by_size = ?  WHERE id = ?";
    db.query(
      sql,
      [
        title,
        type,
        price,
        size_sqft,
        description,
        in_stock === "true" ? 1 : 0,
        finalMainImage,
        JSON.stringify(images_by_size),
        id,
      ],
      (err2) => {
        if (err2) {
          console.error(err2);
          return res.status(500).json({ message: "Failed to update property" });
        }

        res.status(200).json({
          message: "Property updated successfully",
          property: {
            id,
            title,
            type,
            price,
            size_sqft,
            description,
            in_stock: in_stock === "true",
            image: finalMainImage,
            images_by_size,
          },
        });
      }
    );
  });
};

//delete property
exports.deleteProperty = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM properties WHERE id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to delete property" });
    } else if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "No property found with this ID" });
    } else {
      return res.status(200).json({
        message: "Property deleted successfully , Deleted id :" + id,
        property: results[0],
      });
    }
  });
};

//filter + sort properties
exports.filterProperties = (req, res) => {
  const { type, in_stock, minSize, maxSize, sort } = req.query;

  let sql = "SELECT * FROM properties WHERE 1=1"; // 1=1 is means true
  const params = [];

  if (type) {
    sql += " AND type = ?";
    params.push(type);
  }
  //Filter by availability
  if (in_stock) {
    sql += " AND in_stock = ?";
    params.push(in_stock === "true");
  }

  // Filter by Size
  if (minSize) {
    sql += " AND size_sqft >= ?";
    params.push(minSize);
  }
  if (maxSize) {
    sql += " AND size_sqft <= ?";
    params.push(maxSize);
  }

  // Sorting
  switch (sort) {
    case "a-z":
      sql += " ORDER BY title ASC";
      break;
    case "z-a":
      sql += " ORDER BY title DESC";
      break;
    case "price_low_high":
      sql += " ORDER BY price ASC";
      break;
    case "price_high_low":
      sql += " ORDER BY price DESC";
      break;
    case "date_new_old":
      sql += " ORDER BY created_at DESC";
      break;
    case "date_old_new":
      sql += " ORDER BY created_at ASC";
      break;
    default:
      sql += " ORDER BY id ASC";
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Database error", error: err.message });
    }
    res.status(200).json({
      message: "Filtered Properties fetched successfully",
      count: results.length,
      properties: results,
    });
  });
};
