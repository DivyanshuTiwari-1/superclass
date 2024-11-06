"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function TeacherPage() {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [videoId, setVideoId] = useState('');
  const [liveClass, setLiveClass] = useState(null);

  // Fetch live class details on load
  useEffect(() => {
    fetchLiveClass();
  }, []);

  const fetchLiveClass = async () => {
    try {
      const response = await axios.get('/api/liveclass');
      setLiveClass(response.data.liveClass);
    } catch (error) {
      console.error('Error fetching live class:', error);
    }
  };

  const startClass = async () => {
    try {
      const response = await axios.post('/api/liveclass', { title, subject, videoId });
      setLiveClass(response.data.liveClass);
    } catch (error) {
      console.error('Error starting live class:', error.response?.data || error.message);
    }
  };

  const endClass = async () => {
    try {
      await axios.patch('/api/liveclass');
      setLiveClass(null);  // Clear live class data when ending
    } catch (error) {
      console.error('Error ending live class:', error.response?.data || error.message);
    }
  };

  return (
    <div className="teacher-page">
      <h1>Teacher Live Class Control</h1>

      <div>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Subject:
          <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
        </label>
        <label>
          Video ID:
          <input type="text" value={videoId} onChange={(e) => setVideoId(e.target.value)} />
        </label>
        <button onClick={startClass}>Start Class</button>
        <button onClick={endClass}>End Class</button>
      </div>

      {liveClass && (
        <div className="live-video">
          <h2>Live Class: {liveClass.title}</h2>
          <h3>Subject: {liveClass.subject}</h3>
          <div style={{ paddingTop: '56.25%', position: 'relative' }}>
      <iframe
        src={`https://vimeo.com/event/${videoId}/embed/interaction`}
        frameBorder="0"
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
      )}
    </div>
  );
}
