"use client";
import Image from 'next/image';
import Navbar from "../../components/Navbar/page"; // Adjust the import path as needed
import Footer from "../../components/footer/page"; // Adjust the import path as needed

export default function RefundPolicy() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center py-10">
                <Image src="/logo.png" alt="Logo" width={100} height={100} /> {/* Update with your logo path */}
                <h1 className="text-3xl font-bold mt-4">Superclass</h1>
                <div className="max-w-3xl mx-auto p-4">
                    <h2 className="text-xl font-semibold mb-4">Refund Policy</h2>
                    <p>
                        Thank you for choosing our e-learning platform We are dedicated to providing you with a high-quality learning experience. Please take a moment to review our refund policy below
                    </p>
                    
                    <h3 className="font-semibold mt-4">Non-Refundable Purchases</h3>
                    <p>
                        Once a payment is completed for any of our courses, subscriptions, or services, it is non-refundable. This policy allows us to keep our resources accessible and affordable for all our learners.
                    </p>

                    <h3 className="font-semibold mt-4">Access to Content</h3>
                    <p>
                        Immediately upon payment, you will have access to the full range of content associated with your purchase. We encourage you to review the course details and any other relevant information before completing your purchase to ensure it meets your needs.
                    </p>

                    <h3 className="font-semibold mt-4">Support for Technical Issues</h3>
                    <p>
                        If you experience any technical difficulties that prevent you from accessing your purchased content, please do not hesitate to contact our support team. We will be more than happy to assist you and ensure you have the access you need.
                    </p>

                    <p>
                        We are here to help you make the most of your learning experience, so if you have any questions about this policy or our services, please feel free to reach out to us. Thank you for your understanding and support
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
}
