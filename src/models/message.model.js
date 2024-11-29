const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    user: { type: String },
    message: { type: String },
  },
  { timestamps: true }
);

module.exports = model("message", schema);
