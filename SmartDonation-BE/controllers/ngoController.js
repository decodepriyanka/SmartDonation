import asyncHandler from "express-async-handler";
import imageToBase64 from "image-to-base64";
import Ngo from "../models/ngoModel.js";
import Category from "../models/categoryModel.js";
import Admin from "../models/adminModel.js";

// @desc    Add Ngos
// @access  Private
export const addNgos = asyncHandler(async (req, res) => {
  const { title, content, categoryId, userId, imageUrl } = req.body;

  const category = await Category.findById(categoryId);
  const user = await Admin.findById(userId);
  if (category && user) {
    let urlImage = "";
    if (imageUrl) {
      urlImage = imageUrl;
    } else {
      urlImage = await imageToBase64(req.files.imageUrl.path);
    }

    const ngos = await Ngo.create({
      title,
      content,
      category: category._id,
      addedBy: user._id,
      urlToImage: imageUrl
        ? imageUrl
        : `data:${req.files.imageUrl.type};base64,` + urlImage,

      addedAt: Date.now(),
    });

    if (ngos) {
      res.status(201).json({
        success: true,
        msg: "Successfully Added News",
        data: ngos,
      });
    } else {
      res.status(400);
      throw new Error("Invalid News data");
    }

    if (!req.files) {
      res.status(400).send("Select an Image.");
    } else {
    }
  } else {
    res
      .status(400)
      .send(
        "Select an appropriate category and User id should be apporpriate."
      );
  }
});

// @desc    Get All Ngos
// @access  Private
export const getAllNgos = asyncHandler(async (req, res) => {
  let ngos = await Ngo.find({});
  let result = await Ngo.find({})
    .sort("-addedAt")
    .populate({ path: "category", select: ["_id", "category_name"] })
    .populate({ path: "addedBy", select: ["_id", "name", "email"] });

  if (result) {
    res.status(201).json({
      success: true,
      msg: "All Registered Ngo",
      data: result,
    });
  } else {
    res.status(400).send("Something Went Wrong");
  }
});

// @desc    Get Ngo by Id
// @access  Private
export const getNgosId = asyncHandler(async (req, res) => {
  const ngos = await Ngo.findById(req.params.ngosId)
    .populate({
      path: "category",
      select: ["_id", "category_name"],
    })
    .populate({
      path: "addedBy",
      select: ["_id", "name", "email"],
    });

  if (ngos) {
    res.status(201).json({
      success: true,
      msg: "Succefully fetched Ngo",
      data: ngos,
    });
  } else {
    res.status(400).send("Something Went Wrong");
  }
});

// @desc    Get Ngo by CategoryId
// @access  Private
export const getNgosByCategory = asyncHandler(async (req, res) => {
  let result = await Ngo.find({ category: req.params.catId })
    .sort("-addedAt")
    .populate({ path: "category", select: ["_id", "category_name"] })
    .populate({
      path: "addedBy",
      select: ["_id", "name", "email"],
    });

  if (result) {
    res.json({
      success: true,
      msg: "Succefully fetched Ngo",
      data: result,
    });
  } else {
    res.status(400).send("Something Went Wrong");
  }
});

// @desc    Get Ngo by CategoryId
// @access  Private
export const getNgosByUser = asyncHandler(async (req, res) => {
  let result = await Ngo.find({ addedBy: req.params.userId })
    .sort("-addedAt")
    .populate({ path: "category", select: ["_id", "category_name"] })
    .populate({
      path: "addedBy",
      select: ["_id", "name", "email"],
    });
  if (result) {
    res.json({
      success: true,
      msg: "Succefully fetched Ngo",
      data: result,
    });
  } else {
    res.status(400).send("Something Went Wrong");
  }
});

export const editNgo = asyncHandler(async (req, res) => {
  let ngo = await Ngo.findById(req.params.ngosId);

  if (!ngo) {
    return res.status(401).json({
      success: false,
      msg: "Ngo not found.",
    });
  }

  ngo = await Ngo.findByIdAndUpdate(req.params.ngosId, req.body, {
    new: true,
  });

  res
    .status(200)
    .json({ success: true, data: ngo, msg: "Successfully updated" });
});

export default {
  addNgos,
  getAllNgos,
  getNgosId,
  getNgosByCategory,
  getNgosByUser,
  editNgo,
};
