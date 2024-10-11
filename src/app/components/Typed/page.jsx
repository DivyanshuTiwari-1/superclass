// components/TypedText.js
"use client"
import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const TypedText = () => {
  // Create a ref to store the DOM element containing the typing effect
  const typedElementRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: ["Learn from the people who already cracked IIT-JEE", "Be the top 1%", "Improve your study by 10x"],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
    };

    // Initialize the Typed instance
    const typed = new Typed(typedElementRef.current, options);

    // Destroy Typed instance during cleanup to stop animation when the component unmounts
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="typed-wrapper" style={{ marginTop: '20px', marginLeft:'30px', color:'violet', fontSize:'25px'}}>
      <span ref={typedElementRef} className="typed-text"></span>
    </div>
  );
};

export default TypedText;
