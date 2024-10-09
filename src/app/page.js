import Image from "next/image";
import Navbar from "./components/Navbar/page";
import Course from "./components/Course/page";
import Footer from "./components/Footer/page";


export default function Home() {
    return ( <
        >
        <
        Navbar > < /Navbar> <
        div className = "min-h-screen bg-black flex items-center justify-center mt-20" >
        <
        Course / >

        <
        /div> <
        Footer / >
        <
        />
    );
}