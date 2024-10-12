import axios from 'axios';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/route'; // Adjust the path as needed

export async function POST(req) {
    // Retrieve session to get the access token
    const session = await getServerSession(authOptions);
    if (!session || !session.accessToken) {
        return new Response(JSON.stringify({ error: 'Not authenticated' }), { status: 401 });
    }

    const accessToken = session.accessToken;
    const { streamId } = await req.json();

    try {
        // End the live stream
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
