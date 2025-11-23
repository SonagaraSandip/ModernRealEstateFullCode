const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv");
const path = require("path");

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use('/uploads' , express.static(path.join(__dirname , 'uploads')));

//import routes
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const propertyRoutes = require("./routes/propertyRoutes");

//use routes
app.use("/api/users", userRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/admin", adminRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});