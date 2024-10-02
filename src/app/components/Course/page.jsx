"use client";
import axios from "axios";
import { useSession, signIn } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function Course() {
  const { data: session } = useSession();
  const [user, setUser] = useState({
    email: "",
    subject: "pcm", // default subject
  });
  const [paymentDone, setPaymentDone] = useState(false);
 
  
  



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

          const { paymentstatus } = response.data;

          // If the paymentstatus is true, set paymentDone to true
          if (paymentstatus) {
            setPaymentDone(true);
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
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-sm mx-auto text-white" key="pcm">
          <div className="relative">
            <img
              src="../../../asset/Green Passive Income Ideas YouTube Thumbnail.png" // Replace with correct image path
              alt="PCM Full course"
              width={400}
              height={200}
              className="rounded-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="bg-white p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 10.197v3.606a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14.75V3.25" />
                </svg>
              </button>
            </div>
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
              <span className="ml-2">Complete syallabus in 4 months</span>
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
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-sm mx-auto text-white" key="pcb">
          <div className="relative">
            <img
              src="/path-to-your-img.png" // Replace with correct image path
              alt="PCB Full course"
              width={400}
              height={200}
              className="rounded-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="bg-white p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 10.197v3.606a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14.75V3.25" />
                </svg>
              </button>
            </div>
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
              <span className="ml-2">Complete syallabus in 4 months</span>
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
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-sm mx-auto text-white">
        {/* Course card when session exists */}
        <h2 className="text-lg font-bold mt-4">Proceed with your payment </h2>
        <h2 className="text-lg font-bold mt-4">you are buying a {user.subject} course</h2>

        <button className="bg-green-600 text-white px-4 py-2 rounded mt-4 w-full font-bold hover:bg-green-500 transition"
       onClick={()=>{initiatePayment()}}
        >
         pay 1999/-
        </button> 
      </div>
    );
  }

  if (session && paymentDone) {
    return (
      <div>
        <h1>Congratulations, you have successfully enrolled in the {user.subject} course.</h1>
        <a href="">Join WhatsApp group for further updates</a>
      </div>
    );
  }

  return null;
}