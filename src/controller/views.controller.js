class ViewsController {
  renderHome = (req, res) => {
    try {
      res.render("home");
    } catch (err) {
      res
        .status(500)
        .json({ status: false, message: "Error al renderizar el inicio" });
    }
  };

  renderLogin = (req, res) => {
    try {
      res.render("login");
    } catch (err) {
      res
        .status(500)
        .json({ status: false, message: "Error al renderizar el login" });
    }
  };
}

module.exports = ViewsController;
