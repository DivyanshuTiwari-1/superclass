import axios from 'axios';
import { getServerSession } from 'next-auth';
import { handler } from '../auth/[...nextauth]/route'; // Adjust this path to where your auth config is located

export async function POST(req) {
    // Retrieve session to get the access token
    const session = await getServerSession(handler);
    if (!session || !session.accessToken) {
        return new Response(JSON.stringify({ error: 'Not authenticated' }), { status: 401 });
    }

    const accessToken = session.accessToken;
    const { streamId } = await req.json();

    try {
        // Step 1: End the live stream
        await axios.post(
            `https://youtube.googleapis.com/youtube/v3/liveBroadcasts/delete`,
            { id: streamId },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        return new Response(JSON.stringify({ message: "Stream ended successfully" }), { status: 200 });
    } catch (error) {
        console.error("Error ending live stream:", error);
        return new Response(JSON.stringify({ error: "Failed to end live stream" }), { status: 500 });
    }
}

export const config = {
    api: {
        bodyParser: true,
    },
};
