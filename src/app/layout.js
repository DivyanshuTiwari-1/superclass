
import "./globals.css";
import AuthProvider from "../context/AuthProvider";



export const metadata = {
    title: "Superclass",
    description: "Superclass is a dynamic e-learning platform offering interactive classes, recorded videos, and specialized content in Physics, Chemistry, Math, and Biology. Join live classes, access exclusive content, and learn on your own schedule.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" >
            <AuthProvider>
                <body className="bg-black">
                    {children}
                </body>
            </AuthProvider>
        </html>
    );
}
