import asyncHandler from "express-async-handler";
import DonationItem from "../models/donationItemModel.js";
import imageToBase64 from "image-to-base64";

// @desc    Add donation item
// @route   POST /api/donation/addItem
// @access  Private
export const addDonationItem = asyncHandler(async (req, res) => {
  const { title, description, imageUrl, price, coins } = req.body;
  const item = await DonationItem.findOne({ title: title });

  if (item) {
    return res.status(401).json({
      success: false,
      msg: "Item already added.",
    });
  }

  let urlImage = "";
  if (imageUrl) {
    urlImage = imageUrl;
  } else {
    urlImage = await imageToBase64(req.files.imageUrl.path);
  }

  const new_item = await DonationItem.create({
    title,
    description,
    imageUrl,
    price,
    coins,
    urlToImage: imageUrl
      ? imageUrl
      : `data:${req.files.imageUrl.type};base64,` + urlImage,
  });

  res.status(201).json({
    success: true,
    msg: "Added Donation Itme successfully",
    data: new_item,
  });
});

// @desc    Delete donation item
// @route   POST /api/donation/deleteById/itemId
// @access  Private
export const deleteDonationItem = asyncHandler(async (req, res) => {
  const item = await DonationItem.findByIdAndDelete(req.params.itemId);

  res.status(201).json({
    success: true,
    msg: "Successfully Deleted",
    data: item,
  });

  if (!item) {
    return res.status(401).json({
      success: false,
      msg: "Item not found.",
    });
  }
});

// @desc    getAllItems
// @route   GET /api/donation/getAllItems
// @access  Private
export const getAllDonationItems = asyncHandler(async (req, res) => {
  const items = await DonationItem.find({});
  res.json({
    success: true,
    msg: "succefully fetched items",
    data: items,
  });
});

// @desc    getAllItems
// @route   GET /api/donation/editById/itemId
// @access  Private
export const editDonationItem = asyncHandler(async (req, res) => {
  let item = await DonationItem.findById(req.params.itemId);

  if (!item) {
    return res.status(401).json({
      success: false,
      msg: "Category not found.",
    });
  }

  item = await item.findByIdAndUpdate(req.params.itemId, req.body, {
    new: true,
    runValidators: true,
  });

  res
    .status(200)
    .json({ success: true, data: item, msg: "Successfully updated" });
});

// @desc    getAllItems
// @route   GET /api/donation/getById/itemId
// @access  Private
export const getDonationItemById = asyncHandler(async (req, res) => {
  let item = await DonationItem.findById(req.params.itemId);

  if (!item) {
    return res.status(401).json({
      success: false,
      msg: "Item not found.",
    });
  }

  res
    .status(200)
    .json({ success: true, data: item, msg: "Successfully fetched item" });
});

export default {
  addDonationItem,
  deleteDonationItem,
  getDonationItemById,
  editDonationItem,
  getAllDonationItems,
};
