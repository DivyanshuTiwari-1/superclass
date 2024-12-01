"use client";
import axios from "axios";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { isThenable } from "next/dist/client/components/router-reducer/router-reducer-types";
export default function Course() {
  const { data: session } = useSession();
  const [user, setUser] = useState({
    email: "",
    subject: "pcm", // default subject
  });
  const [paymentDone, setPaymentDone] = useState(false);
 
  const[teach,setteach]=useState(false);
  



  // Set email when session is available
  useEffect(() => {
    if (session && session.user) {
      // Function to fetch payment status
      const fetchPaymentStatus = async () => {
        try {
          // Send correct user details to the backend
          const response = await axios.post("/api/saveuser", {
            email: session.user.email,
            name: session.user.name,
          });

          const { paymentstatus,isteacher } = response.data;

          // If the paymentstatus is true, set paymentDone to true
          if (paymentstatus) {
            setPaymentDone(true);

          }
          if(isteacher=== "Teacher"){
            setteach(true);
          }
        } catch (error) {
          console.error("Error fetching payment status:", error);
        }
      };

      // Call the fetchPaymentStatus function
      fetchPaymentStatus();
    }
  }, [session]);
  const handlePayment =  async () => {
    

    try {
      const response = axios.post('/api/payments', {
       
        body: JSON.stringify({ email:session.user.email, amount:1999}),
      });

      const data = await  response.json();

      if (data.success) {
        // Redirect to Paytm's payment page
        window.location.href = data.paymentUrl;
      } else {
        alert('Payment initialization failed.');
      }
    } catch (error) {
      console.error('Error during payment:', error);
    }
  };
  
  

  if (!session) {
    return (
      <div className="flex flex-col md:flex-row">
        {/* PCM Course Card */}
        <div className=" bg-black p-6 rounded-lg shadow-lg max-w-sm mx-auto text-white" key="pcm">
          <div className="relative">
            <img
              src="https://i.ibb.co/pQGfBvK/DALL-E-2024-10-09-10-24-32-A-cheerful-high-school-girl-smiling-while-holding-books-in-her-arms-weari.webp" // Replace with correct image path
            
              alt="PCM Full course"
              width={400}
              height={200}
              className="rounded-lg"
            />
       
          </div>

          <h2 className="text-lg font-bold mt-4"> Class 12th PCM Full course</h2>
          <div className="flex items-center mt-2">
            <span className="text-2xl font-bold">₹1999</span>
            <span className="text-gray-400 line-through ml-2">₹3999</span>
            <span className="ml-2 text-green-500">(50% off)</span>
          </div>

          <button
            className="bg-green-600 text-white px-4 py-2 rounded mt-4 w-full font-bold hover:bg-green-500 transition"
            onClick={() => signIn("google")}
          >
            Buy Now
          </button>

          {/* Course Offers */}
          <ul className="text-sm text-gray-400 mt-4 space-y-2">
            <li className="flex items-center">
              <span className="text-green-500">✔</span>
              <span className="ml-2">Complete syallabus in 3 months</span>
            </li>
            <li className="flex items-center">
              <span className="text-green-500">✔</span>
              <span className="ml-2">Lifetime Access to resources</span>
            </li>
            <li className="flex items-center">
              <span className="text-green-500">✔</span>
              <span className="ml-2">Live class and recorded as well</span>
            </li>
            <li className="flex items-center">
              <span className="text-green-500">✔</span>
              <span className="ml-2">Revision notes and guides</span>
            </li>
            <li className="flex items-center">
              <span className="text-green-500">✔</span>
              <span className="ml-2">weekly Test</span>
            </li>
          </ul>
        </div>

        {/* PCB Course Card */}
        <div className="bg-black p-6 rounded-lg shadow-lg max-w-sm mx-auto text-white" key="pcb">
          <div className="relative">
            <img
              src="https://i.ibb.co/1GcL8j0/Class-12th-PCB-Full-Course-Image.webp" // Replace with correct image path

              alt="PCB Full course"
              width={400}
              height={200}
              className="rounded-lg"
            />
          
          </div>

          <h2 className="text-lg font-bold mt-4"> Class 12th PCB Full course</h2>
          <div className="flex items-center mt-2">
            <span className="text-2xl font-bold">₹1999</span>
            <span className="text-gray-400 line-through ml-2">₹3999</span>
            <span className="ml-2 text-green-500">(50% off)</span>
          </div>

          <button
            className="bg-green-600 text-white px-4 py-2 rounded mt-4 w-full font-bold hover:bg-green-500 transition"
            onClick={() => {
              setUser((prevUser) => ({
                ...prevUser,
                subject: "pcb",
              }));
              signIn("google");
            }}
          >
            Buy Now
          </button>
          <ul className="text-sm text-gray-400 mt-4 space-y-2">
            <li className="flex items-center">
              <span className="text-green-500">✔</span>
              <span className="ml-2">Complete syallabus in 3 months</span>
            </li>
            <li className="flex items-center">
              <span className="text-green-500">✔</span>
              <span className="ml-2">Lifetime Access to resources</span>
            </li>
            <li className="flex items-center">
              <span className="text-green-500">✔</span>
              <span className="ml-2">Live class and recorded as well</span>
            </li>
            <li className="flex items-center">
              <span className="text-green-500">✔</span>
              <span className="ml-2">Revision notes and guides</span>
            </li>
            <li className="flex items-center">
              <span className="text-green-500">✔</span>
              <span className="ml-2">weekly Test</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  if (session && !paymentDone) {
    return (
      <div className="bg-black-900 p-6 rounded-lg shadow-lg max-w-sm mx-auto text-white">
        {/* Course card when session exists */}
        <h2 className="text-lg font-bold mt-4">Proceed with your payments </h2>
        <h2 className="text-lg font-bold mt-4">Buy one course you will have acess to multiple courses</h2>
        <Link href="/components/Razorpay">
        <button className="bg-green-600 text-white px-4 py-2 rounded mt-4 w-full font-bold hover:bg-green-500 transition">
         pay 1999/-
        </button> 
        </Link>
      </div>
    );
  }

  if (session && paymentDone) {
    if(teach){
         return (
          <div className="h-80 w-80 justify-center">
          <h1>Congratulations, you have successfully enrolled in the  course.Join WhatsApp group for further updates</h1>
          <Link href="https://chat.whatsapp.com/JkBFNmBs6lw7v8uD9xIUdv">
                  <button className="bg-green-600 text-white px-4 py-2 rounded mt-4 w-full font-bold hover:bg-green-500">Join WhatsApp</button>
              </Link>
          <Link href="/components/student">
                  <button className="bg-green-600 text-white px-4 py-2 rounded mt-4 w-full font-bold hover:bg-green-500">Go to Live Class</button>
              </Link>
              <Link href="/Subjects">
                  <button className="bg-green-600 text-white px-4 py-2 rounded mt-4 w-full font-bold hover:bg-green-500">explore courses</button>
              </Link>
              <Link href="/components/Teacher">
                  <button className="bg-green-600 text-white px-4 py-2 rounded mt-4 w-full font-bold hover:bg-green-500">Take Class</button>
              </Link>
        </div>
         )
    }
    return (
      <div className="h-80 w-80 justify-center">
        <h1>Congratulations, you have successfully enrolled in the  course.Join WhatsApp group for further updates</h1>
        <Link href="https://chat.whatsapp.com/JkBFNmBs6lw7v8uD9xIUdv">
                <button className="bg-green-600 text-white px-4 py-2 rounded mt-4 w-full font-bold hover:bg-green-500">Join WhatsApp</button>
            </Link>
        <Link href="/components/student">
                <button className="bg-green-600 text-white px-4 py-2 rounded mt-4 w-full font-bold hover:bg-green-500">Go to Live Class</button>
            </Link>
            <Link href="/Subjects">
                <button className="bg-green-600 text-white px-4 py-2 rounded mt-4 w-full font-bold hover:bg-green-500">explore courses</button>
            </Link>
      </div>
    );
  }

  return null;
}
