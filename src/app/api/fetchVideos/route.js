// src/pages/api/fetchVideos.js

import { NextResponse } from 'next/server';

export async function POST(req) {
    if (req.method !== 'POST') {
        return NextResponse.json({ error: 'Only POST requests are allowed' }, { status: 405 });
    }

    const { subject } = await req.json(); // Parse the request body

    const playlists = {
        Physics: 'PLUbl0wCZEIJ-9x7O-UEBulwhE1VAh_9Lr',
        Chemistry: 'PLUbl0wCZEIJ_NPCKUsd33ugbqN-yvG_oL',
        Math: 'PLUbl0wCZEIJ8CzXhmJEpn-PN0ENEfvjgA',
        Biology: 'PLUbl0wCZEIJ9T-47CVVTlv6UlrJqoyLm-'
    };

    const playlistId = playlists[subject];
    if (!playlistId) {
        return NextResponse.json({ error: 'Invalid subject' }, { status: 404 });
    }

    try {
        const response = await fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${process.env.YOUTUBE_API_TOKEN}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const videos = data.items.map(item => ({
            id: item.snippet.resourceId.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails.high.url
        }));

        return NextResponse.json({ videos }, { status: 200 });
    } catch (error) {
        console.error('Error fetching videos:', error);
        return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
    }
}
