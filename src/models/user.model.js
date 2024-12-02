const { Schema, model } = require("mongoose");

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String },
  photo: { type: String },
  gender: { type: String, enum: ["masculino", "femenino", "otro"] },
  role: { type: String, enum: ["paciente", "admin"], default: "paciente" },
  blood_type: { type: String },
  booking: [{ type: Schema.Types.ObjectId, ref: "bookings"}],
});

module.exports = model("users", schema);
