// pages/api/updatePaymentStatus.js

import { dbconnect } from "../../../helper/dbconnect";
import { userModel } from "../../../models/userSchema";
import { NextResponse } from "next/server";

export async function POST(req) {
    await dbconnect();

    try {
        const body = await req.json();
        const { email, orderId, paymentId } = body;

        // Validate that the necessary fields are present
        if (!email || !orderId || !paymentId) {
            return NextResponse.json({
                message: "Email, orderId, and paymentId are required",
                success: false,
            }, { status: 400 });
        }

        // Find the user by email
        const user = await userModel.findOne({ email });

        if (!user) {
            return NextResponse.json({
                message: "User not found",
                success: false,
            }, { status: 404 });
        }

        // Check payment status
        if (user.paymentdone === false) {
            // Update payment status, orderId, and paymentId if paymentStatus is false
            user.paymentdone = true;
            user.orderId = orderId;
            user.paymentId = paymentId;
            
            // Save the updated user document
            await user.save();

            return NextResponse.json({
                message: "Payment status updated successfully",
                success: true,
                user,
            }, { status: 200 });
        } else {
            // Payment is already marked as done
            return NextResponse.json({
                message: "Payment already completed",
                success: true,
            }, { status: 200 });
        }

    } catch (error) {
        console.error("Error updating payment status:", error);
        return NextResponse.json({
            message: "Error updating payment status",
            success: false,
        }, { status: 500 });
    }
}
