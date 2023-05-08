const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToMongoDB = require("./config/db");
const port = process.env.PORT || 4000;

require("dotenv").config();

connectToMongoDB();

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use("/", userRoutes);
app.use("/", postRoutes);
app.use("/", todoRoutes);

app.listen(port);
