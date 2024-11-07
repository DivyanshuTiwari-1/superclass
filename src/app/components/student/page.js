"use client";
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function StudentPage() {
  const [liveClass, setLiveClass] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const { data: session, status } = useSession(); // Using session for authentication

  useEffect(() => {
    const fetchLiveClass = async () => {
      try {
        const response = await fetch('/api/liveclass');
        const data = await response.json();
        setLiveClass(data.liveClass);
      } catch (error) {
        console.error("Error fetching live class:", error);
      }
    };

    const fetchPaymentStatus = async () => {
      if (session?.user?.email) {
        try {
          const response = await fetch('/api/saveuser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: session.user.email, name: session.user.name }),
          });
          const data = await response.json();
          setPaymentStatus(data.paymentstatus); // Corrected payment status extraction
        } catch (error) {
          console.error("Error fetching payment status:", error);
        }
      }
    };

    if (session) {
      fetchPaymentStatus();
    }
    
    fetchLiveClass();
  }, [session]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>Please sign in to access the live class.</p>;
  }

  if (paymentStatus === null) {
    return <p>Loading payment status...</p>;
  }

  if (!paymentStatus) {
    return <p>You need to complete the payment to access the live class.</p>;
  }

  if (!liveClass || !liveClass.isLive) {
    return <p>No live class is currently running. classes start from 12Nov 2024</p>;
  }

  return (
    <div>
      <h1>Live Class - {liveClass.title}</h1>
      <div style={{ paddingTop: '56.25%', position: 'relative' }}>
        <iframe
          src={`https://vimeo.com/event/${liveClass.videoId}/embed/interaction`}
          frameBorder="1"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        
        ></iframe>
      </div>
    </div>
  );
}
