const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const user_routes = require("./routes/user.route");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/v1", user_routes);

// Mongoose Listen
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongoose connected successfully");
  })
  .catch((err) => {
    console.log(err.msg);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server has been successfully started on port ${process.env.PORT}`
  );
});
