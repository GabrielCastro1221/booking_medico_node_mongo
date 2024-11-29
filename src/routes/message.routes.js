const { Router } = require("express");
const MessageManager = require("../controller/chat.controller");

const router = Router();
const message = new MessageManager();

router.post("/", message.createMessage);
router.get("/", message.getMessages);
router.delete("/", message.deleteAllMessages);

module.exports = router;