const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token found , access denied" });
  }

  //extract token from header
  const token = authHeader.split(" ")[1];

  try {
    //varify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // add user info to request
    next(); // continue to next middleware
  } catch (error) {
    return res.status(401).json({ message: "Invalid token or expired" });
  }
};

// admin only
exports.adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied, admin only" });
  }
  next();
};
