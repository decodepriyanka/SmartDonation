import { Router } from "express";
const router = Router();

import {
  getNotification,
  getNotificationResult,
  sendNotification,
  sendNotificationResult,
} from "../controllers/notificationController.js";

router.route("/").post(sendNotification);
router.route("/:recieverId").get(getNotification);
router.route("/getResult/:notificationId").get(getNotificationResult);
router.route("/sendResult/:notificationId").post(sendNotificationResult);

export default router;
