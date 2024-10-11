import Image from "next/image";
import Navbar from "./components/Navbar/page";
import Course from "./components/Course/page";
<<<<<<< HEAD
import Footer from "./components/Footer/page";
import TypedText from "./components/Typed/page"

export default function Home() {
    return ( <
        >
        <
        Navbar > < /Navbar> <
        div className = "min-h-screen bg-black flex items-center justify-center mt-20" >
        <
        div className = "flex flex-col justify-center" >
        <
        TypedText / >
        <
        Course / >

        <
        /div> <
        /div> <
        Footer / >
        <
        />
=======
import Footer from "./components/footer/page";


export default function Home() {
    return ( <>
        
       <Navbar> </Navbar>
        <div className = "min-h-screen bg-black flex items-center justify-center mt-20">
        
        <Course/>

        
        </div> 
        <Footer/>
        
        </>
>>>>>>> 080df3b23430f25b689f7d151e16b83d57f1d081
    );
}
