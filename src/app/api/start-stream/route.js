import { google } from "googleapis";
import { NextResponse } from "next/server";

// POST route to start YouTube live stream
export async function POST(req) {
    try {
        // Parse the request body to retrieve the access token
        const { accesstoken } = await req.json(); // Ensure the body is parsed

        // Check if the access token is provided
        if (!accesstoken) {
            return NextResponse.json({ message: "Access token is missing" }, { status: 400 });
        }

        // Create OAuth2 client
        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET
        );

        // Set the access token to the OAuth2 client
        oauth2Client.setCredentials({
            access_token: accesstoken,

        });



        const SCOPES = [
            'https://www.googleapis.com/auth/youtube',
            'https://www.googleapis.com/auth/youtube.force-ssl'
        ];
        // Initialize the YouTube API client
        const youtube = google.youtube({
            version: 'v3',
            auth: oauth2Client,
            scope: SCOPES
        });

        // Start a live broadcast by making a POST request
        const response = await youtube.liveBroadcasts.insert({
            part: ['snippet', 'status'],
            requestBody: {
                snippet: {
                    title: 'New Live Stream', // You can customize the title
                    scheduledStartTime: new Date().toISOString(), // Set stream start time
                },
                status: {
                    privacyStatus: 'unlisted', // You can also set it to 'public' or 'private'
                },
            },
        });

        // Extract live stream ID from the response
        const liveStreamId = response.data.id;

        // Return success response with live stream ID
        return NextResponse.json({
            liveStreamId,
            message: "Live stream started successfully!",
        });
    } catch (error) {
        // Log the error and return a 500 status
        console.error("Error starting stream:", error.response ? .data || error.message);
        return NextResponse.json({ message: "Error starting stream" }, { status: 500 });
    }
}