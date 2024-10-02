import { dbconnect } from "../../../helper/dbconnect";
import { userModel } from "../../../models/userSchema";

import { NextResponse } from "next/server";

export async function POST(req) {
    await dbconnect();

    try {
        const body = await req.json();
        const { name, email } = body;

        // Basic validation
        if (!name || !email) {
            return NextResponse.json({
                message: "Name and email are required",
                success: false,
            }, { status: 400 });
        }

        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return NextResponse.json({
                message: "User already exists",
                success: true,
                paymentstatus: existingUser.paymentdone,
                isteacher: existingUser.role, // make sure paymentdone field is set in DB
            }, { status: 200 });
        }

        // If user does not exist, create a new user
        const newUser = new userModel({ name, email });

        // Save the new user to the database
        await newUser.save();

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            paymentstatus: false, // Assume no payment is done for new users
        }, { status: 201 });

    } catch (error) {
        console.error("Error saving user:", error);
        return NextResponse.json({
            message: "Error saving user",
            success: false,
        }, { status: 500 });
    }
}