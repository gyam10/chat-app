const mongoose = require("mongoose");

const MessageSchemaDef = new mongoose.Schema(
  {
    message: {
      text: { type: String, required: true },
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
  }
);

const MessageModel = mongoose.model("Message", MessageSchemaDef);

module.exports = MessageModel;
