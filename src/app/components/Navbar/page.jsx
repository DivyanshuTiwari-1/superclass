"use client"

import { signIn, signOut,useSession } from "next-auth/react";
import Image from "next/image";

import { useEffect, useState } from "react";


export default function Navbar(){
   const[isSession,setisSession] =useState(false);
   
    const { data: session } = useSession();


    useEffect(()=>{
         if(session){
          setisSession(true);
          
         }

    },[session])






   return (
    isSession?<>
    

    <nav className="bg-white dark:bg-gray-900  w-full fixed z-50 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://t3.ftcdn.net/jpg/04/34/37/76/360_F_434377688_1RQdwGB8IjGPyuNsQgEcp0yGVYDR8yPz.jpg" className="h-8 w-8" alt="Flowbite Logo" width="32"/>
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Superclass</span>
      </a>
      <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
           onClick={()=>signOut()
    
           }
          >sign out</button>
         
      </div>
      <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
           <p className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"> Hi {session.user.name}</p>
           
          </li>
         
        </ul>
      </div>
      </div>
    </nav>
   
        
        </>:<div>
         
        <nav className="bg-white dark:bg-gray-900 fixed w-full  z-50 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
           <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
           <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
               <img src="https://t3.ftcdn.net/jpg/04/34/37/76/360_F_434377688_1RQdwGB8IjGPyuNsQgEcp0yGVYDR8yPz.jpg" className="h-8 w-8" alt="Flowbite Logo" />
               <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Superclass</span>
           </a>
           <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
               <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={()=>signIn("google",{callbackUrl:"/"})}
               >Get started</button>
              
           </div>
           <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
             <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
               <li>
               <p className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"> Hi welcome!</p>
               </li>
             
             </ul>
           </div>
           </div>
         </nav>

          
         
       </div>
   )
        
   
}
