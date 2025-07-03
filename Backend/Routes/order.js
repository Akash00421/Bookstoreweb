import express from "express";
const router = express.Router();
import Order from "../models/Order.js";
import mongoose from "mongoose";
import nodemailer from "nodemailer";

// Place Order Route
router.post("/place", async (req, res) => {
  const { user, product } = req.body;

  try {
    // 1. Save order to MongoDB
    const order = new Order({
      username: user.name,
      email: user.email,
      mobile: user.mobile,
      address: user.address,
      age: user.age,
      productName: product.name,
      productQuantity: product.quantity,
      productPrice: product.price,
      productImage: product.image || "",
    });

    await order.save();

    // 2. Setup email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 3. Prepare the email body
    const emailBody = `
    <h2>THANK YOU FOR YOUR ORDER !</h2>
    <h3>Order Confirmation</h3>

    <p><strong>Name:</strong> ${user.name}</p>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Mobile:</strong> ${user.mobile}</p>
    <p><strong>Age:</strong> ${user.age}</p>
    <p><strong>Address:</strong> ${user.address}</p>
    <p><strong>Product:</strong> ${product.name}</p>
    <p><strong>Price:</strong> ₹${product.price}</p>
    <p><strong>Quantity:</strong> ${product.quantity}</p>
    <p><strong>Time:</strong> ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>

    <p><strong>Book Image:</strong></p>
    <img src="${product.image}" alt="Book Image" width="200"/>
    <p>We will process your order shortly and send you a confirmation email once it is shipped.</p>
`;

    // 4. Send to both user and admin
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "✅ Order Placed Successfully",
      html: emailBody,
    };

    // 5. Send the email
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully");

    return res.status(200).json({
      message: "Order placed and email sent successfully!",
      emailSent: true,
    });

  } catch (error) {
    console.error("❌ Order placement failed:", error.message);
    res.status(500).json({ error: "Internal server error: " + error.message });
  }
});

export default router;

