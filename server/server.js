const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const matchRoutes = require("./routes/match");
const propertyRoutes = require("./routes/property");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/properties", propertyRoutes);
app.get('/', (req, res) => {
  res.send("Roommie Finder Backend is Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
 console.log(`Server running on port ${PORT}`)
);

