import express from "express";
const router = express.Router();
import sendEmailController from "../controllers/emailController.js";

// Route to send an email
router.post('/send', sendEmailController);

export default router;
