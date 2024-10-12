import Image from "next/image";
import Navbar from "./components/Navbar/page";
import Course from "./components/Course/page";
import Footer from "./components/Footer/page";
import TypedText from "./components/Typed/page";

export default function Home() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-black flex items-center justify-center mt-20">
                <div className="flex flex-col justify-center">
                    <TypedText />
                    <Course />
                </div>
            </div>
            <Footer />
        </>
    );
}
