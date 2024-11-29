const { Router } = require("express");
const AuthController = require("../controller/auth.controller");

const router = Router();
const auth = new AuthController();

router.post("/register", auth.register);
router.post("/login", auth.login);

module.exports = router;