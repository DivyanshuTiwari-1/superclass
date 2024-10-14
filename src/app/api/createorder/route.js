// pages/api/createOrder.js
import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { amount, currency } = await req.json();

  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Create an order on Razorpay
    const options = {
      amount, // amount in smallest currency unit, e.g., 100 * 100 for INR 100
      currency: currency || 'INR',
      receipt: `receipt_${Math.random().toString(36).substring(2, 10)}`,
    };
    
    const order = await razorpay.orders.create(options);

    return NextResponse.json({ orderId: order.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error creating order' }, { status: 500 });
  }
}
