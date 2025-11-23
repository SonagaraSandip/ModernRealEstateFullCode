const mysql2 = require("mysql2");

const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "real_estate",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: ", err.message);
  } else {
    console.log("✅ Connected to the database");
  }
});


module.exports = db;