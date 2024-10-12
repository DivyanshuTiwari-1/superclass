import axios from 'axios';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const session = await getServerSession(req, res, authOptions);

    if (!session ) {
        return res.status(401).json({ error: "Unauthorized access" });
    }

    const accessToken = session.accessToken;

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
        console.error("Error starting live stream:", error);
        return res.status(500).json({ error: "Failed to start live stream" });
    }
}
