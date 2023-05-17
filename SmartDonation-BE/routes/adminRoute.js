import { Router } from "express";
const router = Router();
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/adminController.js";

import protectNgo from "../middleware/ngoAuthMiddleWare.js";

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router
  .route("/profile")
  .get(protectNgo, getUserProfile)
  .put(protectNgo, updateUserProfile);

export default router;
