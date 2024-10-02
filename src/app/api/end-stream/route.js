import axios from 'axios';
import { dbconnect } from '../../../helper/dbconnect';
import { videoModel } from '../../../models/videoSchema';
import { NextResponse } from 'next/server';

// Define the POST handler function
export async function POST(req) {
    try {
        // Parse the request body
        const body = await req.json();
        const { title, subject } = body;

        // Call YouTube API to end the stream
        const youtubeResponse = await axios.post(
            'https://www.googleapis.com/youtube/v3/liveBroadcasts/end', {}, {
                headers: {
                    Authorization: `Bearer ${process.env.YOUTUBE_API_TOKEN}`, // Fetch token from env variable
                },
            }
        );

        const videoId = youtubeResponse.data.id;

        // Connect to the database and save video details
        await dbconnect();
        const result = await videoModel.insertMany({
            videoId: videoId,
            subject: subject, // Correct the typo here
            title: title,
        });

        if (result) {
            return NextResponse.json({
                videoId,
                message: "Video saved successfully to the database"
            }, { status: 200 });
        }
    } catch (error) {
        console.error('Error ending stream:', error);
        return NextResponse.json({
            message: "Failed to end stream"
        }, { status: 500 });
    }
}