import { google } from 'googleapis';
import { NextResponse } from 'next/server';

// Set up OAuth 2.0 client
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://localhost:3000/api/auth/callback'
);

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');

    // Redirect back to frontend after obtaining the code
    return NextResponse.redirect(`/api/start-stream?code=${code}`);
}