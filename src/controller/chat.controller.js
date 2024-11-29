const messageModel = require("../models/message.model");
const { logger } = require("../middlewares/logger.middleware");

class MessageManager {
  async getMessages(req, res) {
    try {
      const messages = await messageModel.find().lean();
      res.status(200).json({ success: true, data: messages });
    } catch (error) {
      res
        .status(500)
        .json({
          success: false,
          message: "Error al obtener mensajes",
          error: error.message,
        });
    }
  }

  async createMessage(req, res) {
    const { message } = req.body;
    if (!message || message.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "El mensaje no puede estar vacío" });
    }
    try {
      const newMessage = await messageModel.create({ message });
      res.status(201).json({ success: true, data: newMessage });
    } catch (error) {
      logger.error("Error al crear mensaje:", error);
      res
        .status(500)
        .json({
          success: false,
          message: "Error al crear mensaje",
          error: error.message,
        });
    }
  }

  async deleteAllMessages(req, res) {
    try {
      const result = await messageModel.deleteMany({});
      res
        .status(200)
        .json({
          success: true,
          message: "Todos los mensajes han sido borrados",
          data: result,
        });
    } catch (error) {
      res
        .status(500)
        .json({
          success: false,
          message: "Error al borrar mensajes",
          error: error.message,
        });
    }
  }
}

module.exports = MessageManager;
