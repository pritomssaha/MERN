const express = require("express");
const mongoose = require("mongoose");
const app = express();

const env = require("dotenv/config");
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration

app.use(express.json());

const userRoutes = require("./routes/user");
const authRoute = require("./routes/auth");

app.use("/api/", userRoutes);
app.use("/auth/", authRoute);

app.listen(3000, () => {
  console.log("server is running at port 3000");
});

mongoose.connect(process.env.DB, (err) => {
  if (err) console.log(err.message);
  else console.log("database is connected successfully");
});
