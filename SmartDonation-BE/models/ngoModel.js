import { Schema, model } from "mongoose";

const ngoSchema = Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  url: {
    type: String,
  },
  urlToImage: {
    type: String,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  addedAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  addedBy: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
  },
});

export default model("Ngo", ngoSchema);
