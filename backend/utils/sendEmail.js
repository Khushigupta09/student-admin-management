const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, htmlContent) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'khushigupta3450@gmail.com', // Your email
        pass: process.env.EMAIL_PASSWORD,  // Use your email password or app-specific password
      },
    });

    // Send email
    await transporter.sendMail({
      from: 'khushigupta3450@gmail.com', // Sender address
      to: to,  
      subject: subject,  // Subject of the email
      html: htmlContent, // HTML content (dynamic)
    });

    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = sendEmail;
