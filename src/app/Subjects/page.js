// app/Subjects/page.js
"use client";
import { useRouter } from 'next/navigation';
import Navbar from "../components/Navbar/page";
import Footer from "../components/footer/page";

const SubjectsPage = () => {
    const router = useRouter();

    const handleSubjectClick = (subject) => {
        router.push(`/Videos/${subject}`);
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col min-h-screen">
                <main className="flex-grow flex justify-center items-center mt-10">
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        <button
                            onClick={() => handleSubjectClick('Physics')}
                            className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition"
                        >
                            Physics
                        </button>
                        <button
                            onClick={() => handleSubjectClick('Chemistry')}
                            className="bg-green-500 text-white p-4 rounded-lg shadow-lg hover:bg-green-600 transition"
                        >
                            Chemistry
                        </button>
                        <button
                            onClick={() => handleSubjectClick('Math')}
                            className="bg-yellow-500 text-white p-4 rounded-lg shadow-lg hover:bg-yellow-600 transition"
                        >
                            Math
                        </button>
                        <button
                            onClick={() => handleSubjectClick('Biology')}
                            className="bg-red-500 text-white p-4 rounded-lg shadow-lg hover:bg-red-600 transition"
                        >
                            Biology
                        </button>
                    </div>
                </main>
            </div>
            <Footer />
        </>
    );
};

export default SubjectsPage;
