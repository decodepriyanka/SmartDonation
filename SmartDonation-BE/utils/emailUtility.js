import nodemailer from 'nodemailer';

// Create and configure the email transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Replace with your email provider
  auth: {
    user: 'abhishekkumar54635460@gmail.com', // Replace with your email address
    pass: 'xianeofllpbskolp', // Replace with your email password
  },
});

// Function to send an email
const sendEmail = async (to, subject, text) => {
  try {
    // Send email using the configured transporter
    await transporter.sendMail({
      from: 'abhishekkumar54635460@gmail.com', // Replace with your email address
      to,
      subject,
      text,
    });

    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default sendEmail;
