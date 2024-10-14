// components/RazorpayButton.js
"use client";
import { useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const RazorpayButton = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    try {
      // Get the order ID from the server
      const orderResponse = await axios.post('/api/createorder', {
        amount: 1 * 100, // 100 INR in paisa
        currency: "INR",
      });
      
      const { orderId } = orderResponse.data;

      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: 1 * 100,
        currency: "INR",
        name: "Superclass",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: orderId, // Use server-generated order_id here
        prefill: {
          name:  "Superclass",
          email:  "helpsuperclasses@gmail.com",
          contact: "9407183302",
        },
        theme: {
          color: "#3399cc",
        },
        handler: async (response) => {
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);

          // Send the order ID and payment status to the backend
          try {
            await axios.post('/api/updatePaymentStatus', {
              email: session.user.email,
              orderId: orderId,
              paymentId: response.razorpay_payment_id,
            });
            console.log('Payment status updated in the database');
            
            // Redirect to the homepage after successful payment and data save
            router.push('/');
          } catch (error) {
            console.error('Error updating payment status:', error);
          }
        },
        modal: {
          ondismiss: () => {
            console.log("Checkout form closed");
          },
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Error creating order or initiating payment:', error);
    }
  };

  return ( <div className="h-80 w-80 justify-center  align-middle ">
    <p> Just click on pay button to proceed</p>
    <button id="rzp-button1" className='bg-green-600 text-white px-4 py-2 rounded mt-4  font-bold hover:bg-green-500' onClick={handlePayment}>
      Pay Now
    </button>
    </div>
  );
};

export default RazorpayButton;
