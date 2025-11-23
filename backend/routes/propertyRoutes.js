const express = require("express");
const router = express.Router();
const {
  getAllProperties,
  getPropertyById,
  addProperty,
  updateProperty,
  deleteProperty,
  filterProperties,
} = require("../controllers/propertyController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const upload = require("../utils/upload");

//public routes
router.get("/filter", filterProperties);
router.get("/", getAllProperties);
router.get("/:id", getPropertyById);

//admin routes
router.post(
  "/addProperty",
  protect,
  adminOnly,
  upload.fields([
    { name: "main_image", maxCount: 1 },
    { name: "image_1200", maxCount: 1 },
    { name: "image_1400", maxCount: 1 },
    { name: "image_1600", maxCount: 1 },
  ]),
  addProperty
);
router.put(
  "/:id",
  protect,
  adminOnly,
  upload.fields([
    { name: "main_image", maxCount: 1 },
    { name: "image_1200", maxCount: 1 },
    { name: "image_1400", maxCount: 1 },
    { name: "image_1600", maxCount: 1 },
  ]),
  updateProperty
);
router.delete("/:id", protect, adminOnly, deleteProperty);

module.exports = router;
