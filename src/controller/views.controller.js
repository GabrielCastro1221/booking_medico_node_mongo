class ViewsController {
  renderHome = (req, res) => {
    try {
      res.render("home");
    } catch (err) {
      res.render("404");
    }
  };

  renderLogin = (req, res) => {
    try {
      res.render("login");
    } catch (err) {
      res.render("404");
    }
  };

  renderServices = (req, res) => {
    try {
      res.render("services");
    } catch (err) {
      res.render("404");
    }
  };

  renderDoctors = (req, res) => {
    try {
      res.render("doctors");
    } catch (err) {
      res.render("404");
    }
  };

  renderContact = (req, res) => {
    try {
      res.render("contact");
    } catch (err) {
      res.render("404");
    }
  };

  renderRegister = (req, res) => {
    try {
      res.render("register");
    } catch (err) {
      res.render("404");
    }
  };

  renderNotFound = (req, res) => {
    try {
      res.render("404");
    } catch (err) {
      res.render("404");
    }
  };

  renderAccessDenied = (req, res) => {
    try {
      res.render("accessDenied");
    } catch (err) {
      res.render("404");
    }
  };

  renderResetPass = (req, res) => {
    try {
      res.render("resetPass");
    } catch (err) {
      res.render("404");
    }
  };

  renderChangePass = (req, res) => {
    try {
      res.render("changePass");
    } catch (err) {
      res.render("404");
    }
  };

  renderEmailConfirm = (req, res) => {
    try {
      res.render("emailConfirm");
    } catch (err) {
      res.render("404");
    }
  };
 
  renderDoctorDetail = (req, res) => {
    try {
      res.render("doctorDetail");
    } catch (err) {
      res.render("404");
    }
  };
  
  renderDoctorProfile = (req, res) => {
    try {
      res.render("doctorProfile");
    } catch (err) {
      res.render("404");
    }
  };
  
  renderUserProfile = (req, res) => {
    try {
      res.render("userProfile");
    } catch (err) {
      res.render("404");
    }
  };
  
  renderAdminProfile = (req, res) => {
    try {
      res.render("adminProfile");
    } catch (err) {
      res.render("404");
    }
  };
  
  renderMeeting = (req, res) => {
    try {
      res.render("meeting");
    } catch (err) {
      res.render("404");
    }
  };
}

module.exports = ViewsController;
