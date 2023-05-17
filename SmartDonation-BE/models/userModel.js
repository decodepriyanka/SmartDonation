import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";
const userSchema = Schema({
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

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

export default model("User", userSchema);
