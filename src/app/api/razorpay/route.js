// pages/api/razorpay.js
import Razorpay from "razorpay";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID, // Your Razorpay key_id from env
            key_secret: process.env.RAZORPAY_KEY_SECRET, // Your Razorpay key_secret from env
        });

        const paymentCapture = 1;
        const amount = 50000; // Amount in paisa (50000 = ₹500)
        const currency = "INR";

        const options = {
            amount: amount * paymentCapture,
            currency,
            receipt: "receipt#1", // Unique receipt ID for the payment
            payment_capture: paymentCapture,
        };

        const order = await razorpay.orders.create(options);

        res.status(200).json({
            orderId: order.id,
            keyId: process.env.RAZORPAY_KEY_ID,
        });
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        res.status(500).json({ message: "Error creating Razorpay order" });
    }
}