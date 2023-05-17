// const { sendEmail } = require('../utils/emailUtility');
import sendEmail from "../utils/emailUtility.js";

// Controller function to handle email sending
const sendEmailController = async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    // Send the email using the sendEmail function from the emailUtility file
    await sendEmail(to, subject, text);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};

export default sendEmailController;
