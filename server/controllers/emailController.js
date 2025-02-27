const mongoose = require("mongoose");
const nodemailer = require("nodemailer");


// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mohsinalijafery@gmail.com",
      pass: "oifx oeoj xdba ubwy",
    },
  });

// Send an email
exports.sendEmail = async (req, res) => {
    const { to, subject, message } = req.body;

    console.log('Sending an email');
    try {
        let info = await transporter.sendMail({
            from: "mohsinalijafery@gmail.com", // Sender address
            to, // Recipient address
            subject, // Subject line
            html: message, // HTML body (use `html` instead of `text`)
        });

        console.log("Email sent: ", info.response);
        res.status(200).json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        console.error("Error sending email: ", error);
        res.status(500).json({ success: false, message: "Error sending email", error });
    }
};
