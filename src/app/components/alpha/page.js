"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function TeacherPage() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [videoId, setVideoId] = useState("");
  const [liveClass, setLiveClass] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);

  const { data: session } = useSession();

  // Fetch live class details and payment status on load
  useEffect(() => {
    if (session?.user) {
      const fetchPaymentStatus = async () => {
        try {
          const response = await axios.post("/api/saveuser", {
            email: session.user.email,
            name: session.user.name,
          });

          const { paymentstatus, isteacher } = response.data;
          setPaymentDone(paymentstatus);
          setIsTeacher(isteacher === "Teacher");
        } catch (error) {
          console.error("Error fetching payment status:", error);
        }
      };

      fetchPaymentStatus();
    }
  }, [session]);

  const startClass = async () => {
    try {
      const response = await axios.post("/api/liveclass", { title, subject, videoId });
      setLiveClass(response.data.liveClass);
    } catch (error) {
      console.error("Error starting live class:", error.response?.data || error.message);
    }
  };

  const endClass = async () => {
    try {
      const response = await axios.patch("/api/liveclass", { videoId });
      if (response.status === 200) {
        setLiveClass(null);
        setTitle("");
        setSubject("");
        setVideoId("");
      }
    } catch (error) {
      console.error("Error ending live class:", error.response?.data || error.message);
    }
  };

  // Handle drag events
  const handleMouseDown = () => setIsDragging(true);
  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({ x: e.clientX - 200, y: e.clientY - 50 });
    }
  };
  const handleMouseUp = () => setIsDragging(false);

  if (!paymentDone && !isTeacher) {
    return <p>You cannot access this page</p>;
  }

  return (
    <div>
      <div
        className="fixed bg-white shadow-lg rounded-lg p-6 w-96 h-96 cursor-move"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          width: "400px",
          height: "400px",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <h1 className="text-xl font-bold text-black mb-4 text-center">Teacher Live Class Control</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-1">Subject:</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-1">Video ID:</label>
            <input
              type="text"
              value={videoId}
              onChange={(e) => setVideoId(e.target.value)}
              className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
            />
          </div>
          <div className="flex space-x-4 mt-6">
            <button
              onClick={startClass}
              className="w-full bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-500 transition duration-150 ease-in-out font-semibold"
            >
              Start Class
            </button>
            <button
              onClick={endClass}
              className="w-full bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-500 transition duration-150 ease-in-out font-semibold"
            >
              End Class
            </button>
          </div>
        </div>
      </div>

      {liveClass && (
        <div className="live-video p-4 mt-10">
          <h2 className="text-2xl font-semibold text-center mb-2">Live Class: {liveClass.title}</h2>
          <h3 className="text-lg text-center mb-4">Subject: {liveClass.subject}</h3>
          <div className="relative overflow-hidden rounded-lg" style={{ paddingTop: "56.25%" }}>
            <iframe
              src={`https://vimeo.com/event/${videoId}/embed/interaction`}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
              style={{
                width: "800px",
                height: "800px",
                borderRadius: "8px",
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
              }}
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
