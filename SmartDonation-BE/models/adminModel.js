import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";

const adminSchema = Schema({
  id: { type: String },
  name: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
    unique: true,
  },
  password: {
    type: "string",
    required: true,
  },
  avatar: {
    type: "string",
    default: "",
  },
});

adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

export default model("Admin", adminSchema);
