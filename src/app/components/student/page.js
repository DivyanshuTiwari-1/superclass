"use client";
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function StudentPage() {
  const [liveClass, setLiveClass] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const { data: session, status } = useSession(); // Using session for authentication

  useEffect(() => {
    const fetchLiveClass = async () => {
      const response = await fetch('/api/liveclass');
      const data = await response.json();
      setLiveClass(data.liveClass);
    };

    const fetchPaymentStatus = async () => {
      if (session?.user?.email) {
        const response = await fetch('/api/saveuser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: session.user.email }),
        });
        const data = await response.json();
        setPaymentStatus(data.paymentStatus); // Assuming response contains a paymentStatus field
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
    return <p>No live class is currently running.</p>;
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
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '500px',
            height: '500px',
          }}
        ></iframe>
      </div>
    </div>
  );
}
