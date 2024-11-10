// components/BrowserPopup.js
"use client";
import { useEffect, useState } from "react";

export default function Popup() {
  const [isEmbedded, setIsEmbedded] = useState(false);
  const [isPopupShown, setIsPopupShown] = useState(false);

  const checkEmbeddedBrowser = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /instagram|fbav|fb_iab|fb4a/i.test(userAgent);
  };

  useEffect(() => {
    const popupShown = localStorage.getItem("popupShown");

    if (checkEmbeddedBrowser() && !popupShown) {
      setIsEmbedded(true);
      setIsPopupShown(true);
      localStorage.setItem("popupShown", "true");
    }
  }, []);

  if (!isEmbedded || !isPopupShown) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg text-center shadow-lg max-w-xs w-full">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Open in Browser</h2>
        <p className="text-gray-600 mb-6">
          To access the full experience, please open this page in your default browser.
        </p>
        <a
          href="https://superclasses.site"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 inline-block"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in Browser
        </a>
      </div>
    </div>
  );
}

