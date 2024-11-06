import { NextResponse } from 'next/server';
import { dbconnect } from "../../../helper/dbconnect";
import LiveClass from '../../../models/LiveSchema';

export async function POST(req) {
  await dbconnect();

  try {
    const { title, subject, videoId } = await req.json();

    // Create or update the live class entry to start the class
    let liveClass = await LiveClass.findOne({ isLive: true });

    if (!liveClass) {
      liveClass = new LiveClass({ title, subject, videoId, isLive: true });
    } else {
      liveClass.title = title;
      liveClass.subject = subject;
      liveClass.videoId = videoId;
      liveClass.isLive = true;
    }

    await liveClass.save();
    return NextResponse.json({ success: true, message: 'Live class started successfully', liveClass });
  } catch (error) {
    console.error('Error starting live class:', error);
    return NextResponse.json({ success: false, message: 'Failed to start live class' }, { status: 500 });
  }
}

export async function PATCH() {
  await dbconnect();

  try {
    const liveClass = await LiveClass.findOne({ isLive: true });

    if (liveClass) {
      liveClass.isLive = false;
      await liveClass.save();
      return NextResponse.json({ success: true, message: 'Live class ended successfully' });
    } else {
      return NextResponse.json({ success: false, message: 'No live class to end' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error ending live class:', error);
    return NextResponse.json({ success: false, message: 'Failed to end live class' }, { status: 500 });
  }
}

export async function GET() {
  await dbconnect();

  try {
    const liveClass = await LiveClass.findOne({ isLive: true }).sort({ createdAt: -1 });

    return NextResponse.json({ liveClass: liveClass || null });
  } catch (error) {
    console.error('Error fetching live class details:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch live class details' }, { status: 500 });
  }
}

