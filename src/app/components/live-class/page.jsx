"use client"
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function LiveClassPage() {
    const [streamId, setStreamId] = useState(null);
    const [videoId, setVideoId] = useState(''); // Placeholder for the stream's video ID
    const [isteacher,setisteacher]=useState(false);

    const {data:session}=useSession();
    const startStream = async () => {
        const response = await fetch('/api/youtube/startStream', { method: 'POST' });
        const data = await response.json();
        if (data.streamId) {
            setStreamId(data.streamId);
            setVideoId(data.streamId);  // Update as needed for your video ID
            alert('Live stream started!');
        } else {
            alert('Failed to start live stream.');
        }
    };

    const endStream = async () => {
        const response = await fetch('/api/youtube/endStream', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ streamId }),
        });

        const data = await response.json();
        if (data.message) {
            setStreamId(null);
            setVideoId('');
            alert('Live stream ended!');
        } else {
            alert('Failed to end live stream.');
        }
    };
   
    useEffect(() => {
        if (session && session.user) {
          // Function to fetch payment status
          const fetchteacherStatus = async () => {
            try {
              // Send correct user details to the backend
              const response = await axios.post("/api/saveuser", {
                email: session.user.email,
                name: session.user.name,
              });
    
              const { role } = response.data;
    
              // If the paymentstatus is true, set paymentDone to true
              if (role=="teacher") {
                setisteacher(true);
              }
            } catch (error) {
              console.error("Error fetching payment status:", error);
            }
          };
    
          // Call the fetchPaymentStatus function
          fetchteacherStatus();
        }
      }, [session]);

    return (
        <div>
            <h1>Live Class</h1>
            {isteacher? (
                <>
                    {streamId ? (
                        <button onClick={endStream}>End Live Stream</button>
                    ) : (
                        <button onClick={startStream}>Start Live Stream</button>
                    )}
                </>
            ) : (
                videoId ? (
                    <div>
                        <h2>Live Stream</h2>
                        <iframe
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                ) : (
                    <p>No live stream is currently available.</p>
                )
            )}
        </div>
    );
}
