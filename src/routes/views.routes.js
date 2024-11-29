const { Router } = require("express");
const ViewsController = require("../controller/views.controller");

const router = Router();
const views = new ViewsController();

router.get("/", views.renderLogin);
router.get("/home", views.renderHome);

module.exports = router;