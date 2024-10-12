import axios from 'axios';

export async function POST(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { accessToken } = await req.json();

    if (!accessToken) {
        return res.status(401).json({ error: "Unauthorized access" });
    }

    try {
        // Create a new broadcast
        const broadcastResponse = await axios.post(
            'https://youtube.googleapis.com/youtube/v3/liveBroadcasts?part=snippet,contentDetails,status',
            {
                snippet: {
                    title: "Live Class Stream",
                    scheduledStartTime: new Date().toISOString(),
                },
                status: {
                    privacyStatus: "private"
                },
                contentDetails: {
                    monitorStream: { enableMonitorStream: true }
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const broadcastId = broadcastResponse.data.id;
        return res.status(200).json({ message: "Stream started successfully", broadcastId });
    } catch (error) {
        console.error("Error starting live stream:", error.response ? error.response.data : error.message);
        return res.status(500).json({ error: "Failed to start live stream" });
    }
}
