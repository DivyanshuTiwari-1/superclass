"use client"
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function LiveClass() {
  const { data: session } = useSession();
  const [liveStreamId, setLiveStreamId] = useState('');
  const [videoId, setVideoId] = useState('');
  const [role, setRole] = useState('');

  const startStream = async () => {
    if (role !== 'teacher') {
      return alert('Only teachers can start streams');
    }

    const response = await axios.post('/api/start-stream',{
      accesstoken:session.accesstoken,
    });
    setLiveStreamId(response.data.liveStreamId);
  };

  const endStream = async () => {
    if (role !== 'teacher') {
      return alert('Only teachers can end streams');
    }

    const response = await axios.post('/api/end-stream');
    setVideoId(response.data.videoId);
  };

  useEffect(() => {
    if (session && session.user) {
      // Function to fetch the role
      const checkRole = async () => {
        try {
          // Send correct user details to the backend
          const response = await axios.post("/api/saveuser", {
            email: session.user.email,
            name: session.user.name,
          });

          const { isteacher } = response.data;

          // If the role is "teacher", set it to the role state
          if (isteacher === "teacher") {
            setRole('teacher');
          } else {
            setRole('student');
          }
        } catch (error) {
          console.error("Error fetching role:", error);
        }
      };

      // Call the checkRole function
      checkRole();
    }
  }, [session]);

  return (
    <div>
      <h1>Live Interactive Class</h1>

      {!session ? (
        <button onClick={() => signIn('google')}>Login with Google</button>
      ) : (
        <div>
          <p>Logged in as {session.user.name} ({role})</p>
          <button onClick={signOut}>Logout</button>

          {role === 'teacher' && (
            <div>
              <button onClick={startStream}>Start Live Stream</button>
              <button onClick={endStream}>End Live Stream</button>
            </div>
          )}

          {liveStreamId && (
            <div>
              <h2>Live Stream</h2>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${liveStreamId}?autoplay=1`}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {videoId && (
            <div>
              <h2>Stream Ended. Video ID: {videoId}</h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
