const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");


const messageRouter = express.Router();

messageRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const messages = await Message.find({});
    res.send(messages);
  })
);

messageRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const message = new Message({
      name: req.body.name,
      message: req.body.message,
    });
    const createdMessage = await message.save();
    res.send({
      _id: createdMessage._id,
      name: createdMessage.name,
      message: createdMessage.message,
    });
  })
);

messageRouter.delete(
  "/",
  expressAsyncHandler(async (req, res) => {
    const messagesDeleted = Message.remove({});
    res.send({ message: "Messages Deleted" });
  })
);

module.exports = messageRouter;
