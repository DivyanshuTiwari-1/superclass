"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Navbar from "../../components/Navbar/page";
import Footer from "../../components/footer/page";
import axios from 'axios';

const VideosPage = () => {
    const params = useParams();
    const subject = params.subject;
    const { data: session } = useSession(); // Get session data
    const [videos, setVideos] = useState([]);
    const [page, setPage] = useState(1); // Track the current page
    const [playingVideo, setPlayingVideo] = useState(null); // Track currently playing video
    const [dropdownOpen, setDropdownOpen] = useState(false); // Track dropdown state
    const [loading, setLoading] = useState(false); // Track loading state
    const [error, setError] = useState(null); // Track error state
    const [paymentDone, setPaymentDone] = useState(false); // Track payment status

    useEffect(() => {
        const fetchPaymentStatus = async () => {
            if (session) {
                try {
                    // Send correct user details to the backend
                    const response = await axios.post("/api/saveuser", {
                        email: session.user.email,
                        name: session.user.name,
                    });

                    const { paymentstatus } = response.data;

                    // If the paymentstatus is true, set paymentDone to true
                    if (paymentstatus) {
                        setPaymentDone(true);
                    }
                } catch (error) {
                    console.error("Error fetching payment status:", error);
                }
            }
        };

        // Call the fetchPaymentStatus function
        fetchPaymentStatus();
    }, [session]);

    useEffect(() => {
        const fetchVideos = async () => {
            setLoading(true);
            try {
                const response = await axios.post('/api/fetchVideos', { subject });
                const allVideos = response.data.videos || [];
                setVideos(allVideos);
            } catch (error) {
                setError('Failed to fetch videos. Please try again later.');
                console.error('Error fetching videos:', error);
            } finally {
                setLoading(false);
            }
        };

        if (subject) {
            fetchVideos();
        }
    }, [subject]);

    const loadMoreVideos = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const displayedVideos = videos.slice(0, page * 5); // Show videos based on the current page

    return (
        <>
            <Navbar />
            <div className="flex flex-col min-h-screen">
                <main className="flex-grow flex flex-col items-center mt-20 w-full">
                    <div className="flex justify-between items-center w-full max-w-4xl px-4">
                        <h1 className="text-2xl text-center flex-grow">{subject} Videos</h1>
                        <div className="relative">
                            <button 
                                onClick={() => setDropdownOpen(!dropdownOpen)} 
                                className="px-4 py-2 bg-gray-800 text-white rounded"
                            >
                                ☰
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 bg-gray-700 border-2 border-gray-300 rounded shadow-lg h-fit w-48">
                                    <a href="/" className="block px-4 py-2 text-white hover:bg-black">Home</a>
                                    <a href="/live-class" className="block px-4 py-2 text-white hover:bg-black">Live Class</a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Loading/Error States */}
                    {loading && <p className="text-blue-500">Loading videos...</p>}
                    {error && <p className="text-red-500">{error}</p>}

                    {/* Check if payment is done */}
                    {!paymentDone ? (<>
                        <p className="text-red-500">Please complete your payment to access the videos.</p>
                        <a href="/" className="bg-green-600 text-white px-4 py-2 rounded mt-4  font-bold hover:bg-green-500 transition">Home</a>
                        </>
                    ) : (
                        <>
                            {/* Video Player Section */}
                            {playingVideo && (
                                <div className="w-full max-w-4xl mb-5">
                                    <iframe 
                                        width="100%" 
                                        height="400" 
                                        src={`https://www.youtube.com/embed/${playingVideo}?autoplay=1&controls=1&modestbranding=1&rel=0`} 
                                        title="YouTube video player" 
                                        frameBorder="0" 
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                        allowFullScreen
                                    ></iframe>
                                    <button 
                                        onClick={() => setPlayingVideo(null)} 
                                        className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Close Player
                                    </button>
                                </div>
                            )}

                            {/* Video List */}
                            <div className="w-full max-w-4xl">
                                {displayedVideos.map((video) => (
                                    <div key={video.id} className="flex items-center border p-4 transition rounded-lg m-2">
                                        <img 
                                            src={video.thumbnail} 
                                            alt={video.title} 
                                            className="w-24 h-12 object-cover rounded-lg mr-4" 
                                        />
                                        <div>
                                            <h3 className="text-lg font-semibold">{video.title}</h3>
                                            <p className="text-white-500">{video.duration}</p>
                                            <button 
                                                onClick={() => setPlayingVideo(video.id)} 
                                                className="text-blue-500 hover:underline text-xs"
                                            >
                                                Watch Video
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </main>

                {/* Load More Button */}
                {displayedVideos.length < videos.length && paymentDone && (
                    <div className="flex justify-center mb-4">
                        <button 
                            onClick={loadMoreVideos} 
                            className="bg-green-600 text-white px-4 py-2 rounded mt-4  font-bold hover:bg-green-500 transition"
                        >
                            Load More
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default VideosPage;

