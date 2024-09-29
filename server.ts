import express, { Request, Response } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // Cast to number
  secure: false, // true for 465, false for other ports
  auth: {
    user: "oussamathegoat222@gmail.com",
    pass: "mdqa kykj bfhi fkle",
  },
});

// Email sending route
app.post("/invite", async (req: Request, res: Response) => {
  const { to, token } = req.body;

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to, // recipient
      subject: "Project invitation",
      html: `<div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; background-color: #F4F4F4; border: 1px solid #E5E5E5;">
  
          <h2 style="color: #2C3E50; font-size: 22px; font-weight: 700; margin-bottom: 24px; text-align: left; border-bottom: 2px solid #E5E5E5; padding-bottom: 10px;">
            Confirm Your Signup
          </h2>

          <p style="color: #333; font-size: 16px; margin-bottom: 20px; line-height: 1.6; text-align: left;">
            Dear User,
          </p>
          
          <p style="color: #4D4D4D; font-size: 16px; margin-bottom: 24px; line-height: 1.6; text-align: left;">
            Thank you for registering with us. To complete your account setup, please confirm your email address by clicking the button below. This will verify your identity and ensure full access to our services.
          </p>

          <p style="text-align: left; margin-bottom: 30px;">
            <a href="{{ http://localhost:3000/verification?email=${to}&token=${token} }}" style="background-color: #0056b3; color: #ffffff; padding: 14px 28px; text-decoration: none; 
            border-radius: 4px; font-size: 16px; font-weight: 600; border: 1px solid #004085; letter-spacing: 0.5px; transition: background-color 0.3s ease; 
            display: inline-block;">
              Confirm Email Address
            </a>
          </p>

          <p style="color: #4D4D4D; font-size: 14px; margin-top: 30px; line-height: 1.6; text-align: left;">
            If you did not create this account, no further action is required, and you may disregard this email.
          </p>
          
          <p style="color: #7A7A7A; font-size: 14px; margin-top: 20px; line-height: 1.5; text-align: left;">
            Best regards,<br>
            The SMILY Team
          </p>

          <p style="color: #A0A0A0; font-size: 12px; margin-top: 40px; text-align: center;">
            © [Company Name]. All rights reserved. | <a href="#" style="color: #A0A0A0; text-decoration: none;">Privacy Policy</a>
          </p>
        </div>
      `,
    });

    res.status(200).json({ message: "Email sent successfully", info });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email", error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
