const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

//register
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is missing.." });
    }

    //check user already exits
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Server error" });
        }
        if (result.length > 0) {
          return res.status(400).json({ message: "User already exists" });
        }
      }
    );

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //insert new user in to database
    const sql =
      "INSERT INTO users (name , email , password , role) VALUES (?,?,?,?)";
    db.query(sql, [name, email, hashedPassword, role || "user"], (err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to register user" });
      }

      res.status(201).json({ message: "User registered successfully" });
    });
  } catch (error) {
    console.error(error);
    resw.status(500).json({ message: "Server error" });
  }
};

//login user (user / admin)
exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  //check user exits in database
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }
    if (results.length === 0) {
      return res
        .status(401)
        .json({ message: "user not exits, register first" });
    }

    const user = results[0];
    //compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).json({ message: "Password does not match" });
    }

    //generate jwt token
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, role: user.role, email: user.email },
    });
  });
};
