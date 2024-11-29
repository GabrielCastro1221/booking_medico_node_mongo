const { Router } = require("express");
const UserController = require("../controller/user.controller");
const AuthMiddleware = require("../middlewares/verifyToken.middleware");

const router = Router();
const auth = new AuthMiddleware();
const user = new UserController();

router.get("/", auth.authenticate, auth.restrict(["admin"]), user.getAllUsers);

router.get(
  "/:id",
  auth.authenticate,
  auth.restrict(["paciente", "admin"]),
  user.getUserById
);

router.put(
  "/:id",
  auth.authenticate,
  auth.restrict(["paciente", "admin"]),
  user.updateUser
);

router.delete(
  "/:id",
  auth.authenticate,
  auth.restrict(["paciente", "admin"]),
  user.deleteUser
);

router.post(
  "/create-appointment",
  auth.authenticate,
  auth.restrict(["paciente", "admin"]),
  user.createAppointment
);

router.get(
  "/profile/me",
  auth.authenticate,
  auth.restrict(["paciente", "admin"]),
  user.getUserProfile
);

router.get(
  "/appoinment/my-appoinment",
  auth.authenticate,
  auth.restrict(["paciente", "admin"]),
  user.getMyAppoinments
);

router.put(
  "/cancelled/:id",
  auth.authenticate,
  auth.restrict(["paciente", "admin"]),
  user.cancelledAppointment
);

router.put(
  "/admin/:id",
  auth.authenticate,
  auth.restrict(["admin"]),
  user.changeRolAdmin
);

module.exports = router;
