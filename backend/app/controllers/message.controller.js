const MessageModel = require("../models/message.model");

const addMsg = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await MessageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) {
      return res.json({ msg: "Message added successfully." });
    } else {
      return res.json({ msg: "Failed to add message to the database" });
    }
  } catch (error) {
    next({
      status: 500,
      msg: error,
    });
  }
};

const getAllMsg = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await MessageModel.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });
    const projectMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        messages: msg.message.text,
      };
    });
    res.json(projectMessages);
  } catch (err) {
    next({
      status: 500,
      msg: err,
    });
  }
};

module.exports = { addMsg, getAllMsg };
