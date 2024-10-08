import Image from "next/image";
import Navbar from "./components/Navbar/page";
import Course from "./components/Course/page";


export default function Home() {
  return (
    <>
     <Navbar></Navbar>
     <div className="min-h-screen bg-gray-800 flex items-center justify-center mt-20">
      <Course />
   
    </div>
   
    </>
  );
}