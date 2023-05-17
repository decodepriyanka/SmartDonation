import { Schema, model } from "mongoose";

const donationItemSchema = Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  urlToImage: {
    type: String,
  },
  addedAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  price: {
    type: Number,
  },
  coins: {
    type: Number,
  },
});

export default model("DonationItem", donationItemSchema);

// userId,
// DonationItemId
// DonationItemCount

// Schema for DonationDetails

// price
// imgUrl,
// title,
// description,
// price,id
