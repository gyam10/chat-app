const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const user_routes = require("./routes/user.route");
const msg_routes = require("./routes/message.route");
const socket = require("socket.io");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/v1", user_routes);
app.use("/api/v1/messages", msg_routes);

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

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});
