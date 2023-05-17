import { Schema, model } from "mongoose";
const categorySchema = Schema({
  category_name: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default model("Category", categorySchema);
