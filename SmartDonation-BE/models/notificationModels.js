import { Schema, model } from "mongoose";

const NotificationSchema = Schema({
  donationDetails: {
    type: Array,
  },
  accepted: {
    type: Boolean,
  },
  addedAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  donatedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  donatedToUser: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
  },
  donatedToNgo: {
    type: Schema.Types.ObjectId,
    ref: "Ngo",
  },
});

export default model("Notification", NotificationSchema);
