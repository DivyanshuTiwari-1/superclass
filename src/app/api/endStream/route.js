import axios from 'axios';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const refreshToken = process.env.YOUTUBE_REFRESH_TOKEN;
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    // Step 1: Get a new access token
    const tokenResponse = await axios.post(
        'https://oauth2.googleapis.com/token',
        new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            refresh_token: refreshToken,
            grant_type: 'refresh_token',
        }).toString(),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const accessToken = tokenResponse.data.access_token;

    // Step 2: End the live stream
    const { streamId } = req.body;
    try {
        await axios.post(
            `https://youtube.googleapis.com/youtube/v3/liveBroadcasts/delete`,
            { id: streamId },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        return res.status(200).json({ message: "Stream ended successfully" });
    } catch (error) {
        console.error("Error ending live stream:", error);
        return res.status(500).json({ error: "Failed to end live stream" });
    }
}
