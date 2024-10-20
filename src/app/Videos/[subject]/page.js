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
    const { data: session } = useSession();
    const [videos, setVideos] = useState([]);
    const [page, setPage] = useState(1);
    const [playingVideo, setPlayingVideo] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [paymentDone, setPaymentDone] = useState(false);

    useEffect(() => {
        const fetchPaymentStatus = async () => {
            if (session) {
                try {
                    const response = await axios.post("/api/saveuser", {
                        email: session.user.email,
                        name: session.user.name,
                    });

                    const { paymentstatus } = response.data;

                    if (paymentstatus) {
                        setPaymentDone(true);
                    }
                } catch (error) {
                    console.error("Error fetching payment status:", error);
                }
            }
        };

        fetchPaymentStatus();
    }, [session]);

    useEffect(() => {
        const fetchVideos = async () => {
            setLoading(true);
            try {
                const folderIDs = {
                    Physics: '1nQc0jq2CVhBmYdqGmja2Z37ViJhKSe5o',
                    Chemistry: '1Xu-qgeDmfzMdht2eNemRiB85EF81l_fl',
                    Math: '1XpbY8nU7yo-HPOPfviQ6rDPIyJTz9Ugh',
                    Biology: '1Xu-qgeDmfzMdht2eNemRiB85EF81l_fl',
                };

                const folderId = folderIDs[subject]; // Get the folder ID for the subject

                const response = await axios.get(`https://www.googleapis.com/drive/v3/files?q='${folderId}' in parents&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&fields=files(id,name,mimeType)`);
                const videoFiles = response.data.files.filter(file => file.mimeType.startsWith('video/'));
                
                setVideos(videoFiles);
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
        setPage(prevPage => prevPage + 1);
    };

    const displayedVideos = videos.slice(0, page * 5);

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

                    {loading && <p className="text-blue-500">Loading videos...</p>}
                    {error && <p className="text-red-500">{error}</p>}

                    {!paymentDone ? (
                        <>
                            <p className="text-red-500">Please complete your payment to access the videos.</p>
                            <a href="/" className="bg-green-600 text-white px-4 py-2 rounded mt-4 font-bold hover:bg-green-500 transition">Home</a>
                        </>
                    ) : (
                        <>
                            {playingVideo && (
                                <div className="w-full max-w-4xl mb-5">
                                    <iframe 
                                        width="100%" 
                                        height="400" 
                                        src={`https://drive.google.com/file/d/${playingVideo}/preview`} 
                                        title="Google Drive video player" 
                                        frameBorder="0" 
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        allowFullScreen
                                         sandbox="allow-same-origin allow-scripts allow-presentation"
                                    ></iframe>
                                    <button 
                                        onClick={() => setPlayingVideo(null)} 
                                        className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Close Player
                                    </button>
                                </div>
                            )}

                            <div className="w-full max-w-4xl">
                                {displayedVideos.map(video => (
                                    <div key={video.id} className="flex items-center border p-4 transition rounded-lg m-2 bg-gray-800">
                                        <div className="flex-shrink-0">
                                            <img 
                                                src={`https://drive.google.com/thumbnail?id=${video.id}`} 
                                                alt={video.name} 
                                                className="w-24 h-12 object-cover rounded-lg mr-4" 
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white">{video.name}</h3>
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

                {displayedVideos.length < videos.length && paymentDone && (
                    <div className="flex justify-center mb-4">
                        <button 
                            onClick={loadMoreVideos} 
                            className="bg-green-600 text-white px-4 py-2 rounded mt-4 font-bold hover:bg-green-500 transition"
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
