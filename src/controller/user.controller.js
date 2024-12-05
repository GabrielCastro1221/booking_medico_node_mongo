const userModel = require("../models/user.model");
const bookingModel = require("../models/booking.model");
const doctorModel = require("../models/doctor.model");
const ticketModel = require("../models/ticket.model");

class UserController {
  getAllUsers = async (req, res) => {
    try {
      const users = await userModel.find({});
      if (!users) {
        res
          .status(404)
          .json({ status: false, message: "Usuarios no encontrados" });
      }
      res.status(201).json({
        status: true,
        message: "Usuarios encontrados",
        usuarios: users,
      });
    } catch (err) {
      res
        .status(500)
        .json({ status: false, message: "error al obtener los usuarios" });
    }
  };

  getUserById = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await userModel.findById(id);
      if (!user) {
        res
          .status(404)
          .json({ status: false, message: "Usuario no encontrado" });
      }
      res
        .status(201)
        .json({ status: true, message: "Usuario encontrado", usuario: user });
    } catch (err) {
      res
        .status(500)
        .json({ status: false, message: "error al obtener los usuario" });
    }
  };

  updateUser = async (req, res) => {
    const { id } = req.params;
    try {
      let photoUrl = req.body.photo;
      if (req.file) {
        photoUrl = req.file.path;
      }
      const updatedUser = await userModel.findByIdAndUpdate(
        id,
        { $set: { ...req.body, photo: photoUrl } },
        { new: true }
      );
      if (!updatedUser) {
        return res
          .status(404)
          .json({ status: false, message: "Usuario no encontrado" });
      }
      res.status(200).json({
        status: true,
        message: "Usuario actualizado con éxito",
        usuario: updatedUser,
      });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ status: false, message: "Error al actualizar el usuario" });
    }
  };

  deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await userModel.findByIdAndDelete(id);
      if (!user) {
        res
          .status(404)
          .json({ status: false, message: "Usuario no encontrado" });
      }
      res.status(201).json({
        status: true,
        message: "Usuario eliminado con exito!",
        usuario: user,
      });
    } catch (err) {
      res
        .status(500)
        .json({ status: false, message: "error al eliminar los usuario" });
    }
  };

  createAppointment = async (req, res) => {
    try {
      const { userId, doctorId, appointment_date, ticket_price, type } =
        req.body;
      if (!userId || !doctorId || !appointment_date || !ticket_price) {
        return res
          .status(400)
          .json({ message: "Todos los campos son requeridos." });
      }
      const citaExistente = await bookingModel.findOne({
        doctor: doctorId,
        user: userId,
        appointment_date: new Date(appointment_date),
      });
      if (citaExistente) {
        return res.status(400).json({
          message:
            "Ya existe una cita entre este doctor y paciente en esa fecha.",
        });
      }
      const nuevaCita = new bookingModel({
        doctor: doctorId,
        user: userId,
        appointment_date: new Date(appointment_date),
        ticket_price,
        type,
      });
      await nuevaCita.save();
      const nuevoTicket = new ticketModel({
        code: `TICKET-${Date.now()}`,
        amount: ticket_price,
        appointment_date: new Date(appointment_date),
        doctor: doctorId,
        users: userId,
        bookings: nuevaCita._id,
        status: "pendiente",
      });
      await nuevoTicket.save();
      await doctorModel.findByIdAndUpdate(doctorId, {
        $push: { booking: nuevaCita._id },
      });
      await userModel.findByIdAndUpdate(userId, {
        $push: { booking: nuevaCita._id },
      });
      res.status(201).json({
        message: "Cita agendada exitosamente.",
        cita: nuevaCita,
        ticket: nuevoTicket,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al agendar la cita.", error: error.message });
    }
  };

  getUserProfile = async (req, res) => {
    const userId = req.userId;
    try {
      const user = await userModel.findById(userId).populate({
        path: "booking",
        populate: {
          path: "doctor",
          select: "name",
        },
      });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Usuario no encontrado",
        });
      }
      const { password, ...rest } = user._doc;
      res.status(200).json({
        success: true,
        message: "Informacion del perfil obtenida exitosamente",
        data: { ...rest, bookings: user.booking },
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
        message: "Error al obtener la informacion del perfil",
      });
    }
  };

  getMyAppoinments = async (req, res) => {
    try {
      const bookings = await bookingModel
        .find({ user: req.userId })
        .populate("doctor", "-password")
        .populate("user", "-password");
      if (!bookings || bookings.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No tienes ninguna cita médica",
        });
      }
      res.status(200).json({
        success: true,
        message: "Citas obtenidas exitosamente!",
        data: bookings,
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
        message: "Error al obtener la información",
      });
    }
  };

  cancelledAppointment = async (req, res) => {
    const { id } = req.params;
    try {
      const booking = await bookingModel.findById(id);
      if (!booking) {
        return res.status(404).send("Cita no encontrada");
      }
      const statusChange =
        booking.status === "pendiente" || "aprovada"
          ? "cancelada"
          : "pendiente";
      const statusUpdate = await bookingModel.findByIdAndUpdate(
        id,
        { status: statusChange },
        { new: true }
      );
      res.status(200).json(statusUpdate);
    } catch (error) {
      res.status(500).json({
        error: error.message,
        message: "Error al cambiar el estado de la cita",
      });
    }
  };

  changeRolAdmin = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await userModel.findById(id);
      if (!user) {
        return res.status(404).send("Usuario no encontrado");
      }
      const newRol = user.role === "paciente" ? "admin" : "paciente";
      const updatedUser = await userModel.findByIdAndUpdate(
        id,
        { role: newRol },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error cambiando el rol:", error);
      res.status(500).send("Error interno del servidor");
    }
  };
}

module.exports = UserController;
