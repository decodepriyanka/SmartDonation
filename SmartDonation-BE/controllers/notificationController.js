import asyncHandler from "express-async-handler";
import Notification from "../models/notificationModels.js";
import User from "../models/userModel.js";
import Admin from "../models/adminModel.js";
import Ngo from "../models/ngoModel.js";

// @desc    Send Notification
// @route   POST /api/notification
// @access  Private

//user will send notification to ngo owner with ngo id
export const sendNotification = asyncHandler(async (req, res) => {
  const { donationDetails, senderId, recieverId, ngoId } = req.body;

  const sender = await User.findById(senderId);
  const reciever = await Admin.findById(recieverId);
  const ngo = await Ngo.findById(ngoId);

  if (sender && reciever && ngo) {
    const notification = await Notification.create({
      donationDetails,
      donatedBy: senderId,
      donatedToUser: recieverId,
      donatedToNgo: ngoId,
      accepted: false,
      addedAt: Date.now(),
    });

    if (notification) {
      res.status(201).json({
        success: true,
        msg: "Successfully send notification",
        data: notification,
      });
    } else {
      res.status(400);
      throw new Error("Error in sending notification");
    }
  } else {
    res.status(400).send("User should be authenticated");
  }
});

// @desc    Get Notification Result
// @route   Get /api/notification/recieverId
// @access  Private

//Ngo owner will rcv notification from user with ngo id
export const getNotification = asyncHandler(async (req, res) => {
  let result = await Notification.find({ donatedToUser: req.params.recieverId })
    .sort("-addedAt")
    .populate({ path: "donatedBy", select: ["_id", "name", "email"] })
    .populate({ path: "donatedToUser", select: ["_id", "name", "email"] })
    .populate({ path: "donatedToNgo", select: ["_id", "title", "category"] });

  if (result) {
    res.json({
      success: true,
      msg: "Succefully fetched Notification",
      data: result,
    });
  } else {
    res.status(400).send("Something Went Wrong");
  }
});

// @desc    Get Notification Result
// @route   Get /api/notification/notificationId
// @access  Private

//user will get notification from ngo owner with ngo id and accepted or not accepted
export const getNotificationResult = asyncHandler(async (req, res) => {
  console.log("+++NOTIFICATION ID", req.params.notificationId);

  let notification = await Notification.findById(req.params.notificationId);
  console.log("+++NOTIFICATION", notification);

  if (!notification) {
    return res.status(401).json({
      success: false,
      msg: "not found.",
    });
  }

  res.status(200).json({
    success: true,
    data: notification,
    msg: "Successfully get result",
  });
});

// @desc    Send Notification Result
// @route   Post /api/notification/notificationId
// @access  Private

//ngo owner will send noti
export const sendNotificationResult = asyncHandler(async (req, res) => {
  let notification = await Notification.findById(req.params.notificationId);

  if (!notification) {
    return res.status(401).json({
      success: false,
      msg: "not found.",
    });
  }

  notification = await Notification.findByIdAndUpdate(
    req.params.notificationId,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: notification,
    msg: "Successfully send result",
  });
});

export default {
  sendNotification,
  getNotificationResult,
  getNotification,
  sendNotificationResult,
};
