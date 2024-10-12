"use client";
import Image from 'next/image';
import Navbar from "../../components/Navbar/page"; // Adjust the import path as needed
import Footer from "../../components/footer/page"; // Adjust the import path as needed

export default function PrivacyPolicy() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center py-10">
                <Image src="/logo.png" alt="Logo" width={100} height={100} /> {/* Update with your logo path */}
                <h1 className="text-3xl font-bold mt-4">Superclass</h1>
                <div className="max-w-3xl mx-auto p-4">
                    <h2 className="text-xl font-semibold mb-4">Privacy Policy</h2>
                    <p>
                        This Privacy Policy outlines the privacy practices for Superclass (We or Us) regarding your use of our online platform (Website). This Privacy Policy explains how we collect, store, use, share, and secure your personal information on our Website, and describes your choices in relation to your personal information. By visiting our Website, you agree to the terms of this Privacy Policy. If you disagree with these terms, please do not use the Website.
                    </p>

                    <h3 className="font-semibold mt-4">1. Collection of Information</h3>
                    <p>
                        As a visitor, you can browse our Website without providing personal information. We collect data when you register with us, inquire about our courses, participate in our activities, or communicate with us. Your information may be collected to provide a seamless and customized experience on our Website.
                    </p>
                    <p>
                        We may collect the following information from you:
                        <ul className="list-disc list-inside">
                            <li><strong>Personal Details:</strong> Name, email address, and contact information.</li>
                        </ul>
                    </p>

                    <h3 className="font-semibold mt-4">2. Use and Retention of Information</h3>
                    <p>
                        We specifically collect and retain:
                        <ul className="list-disc list-inside">
                            <li><strong>User Information:</strong> To provide a customized experience, allow access to course content, track progress, and support customer service.</li>
                            <li><strong>Payment Information:</strong> To process transactions securely and prevent fraud. Payment details are managed through secure third-party payment gateways, and we do not store payment information on our servers.</li>
                        </ul>
                    </p>

                    <h3 className="font-semibold mt-4">3. Community Spaces</h3>
                    <p>
                        Superclass may offer spaces, such as forums, for students and users to connect. Be cautious when sharing personal information in these spaces, as it may be viewed or used by others.
                    </p>

                    <h3 className="font-semibold mt-4">4. Sharing and Disclosure of Personal Information</h3>
                    <p>
                        We may share your information with third-party service providers who assist us with our services, such as IT support, payment processing, and customer service. These providers are authorized to use your information only as necessary to provide services on our behalf.
                    </p>

                    <h3 className="font-semibold mt-4">5. Security</h3>
                    <p>
                        We use various security measures to protect your information, including SSL certification, data encryption, and access control. While we strive to secure your information, please contact us if you suspect unauthorized access to your account.
                    </p>

                    <h3 className="font-semibold mt-4">6. Updates to This Policy</h3>
                    <p>
                        We may update this Privacy Policy periodically. Any changes will be posted on our Website, and by continuing to use the site, you accept these changes. We encourage you to review the Policy periodically.
                    </p>

                    <p>
                        Thank you for using Superclass For any questions or concerns regarding this policy, please contact our support team.
                    </p>

                    <p className="font-semibold mt-4">
                        By signing up with Superclass, you acknowledge that you have read and accepted this Privacy Policy.
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
}

