// pages/api/paytm.js
import PaytmChecksum from 'paytmchecksum'; // Paytm's checksum utility
import https from 'https';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, amount } = req.body;

        // Paytm credentials (use environment variables for security)
        const paytmParams = {};
        const MID = 'aucfQt86129234828214'; // Your Paytm Merchant ID
        const MERCHANT_KEY = 'YOUR_MERCHANT_KEY_HERE'; // Your Paytm Merchant Key
        const WEBSITE = 'YOUR_WEBSITE_HERE'; // Your Paytm website name
        const CHANNEL_ID = 'WEB'; // Channel ID for web
        const INDUSTRY_TYPE_ID = 'Retail'; // Industry Type
        const CALLBACK_URL = 'http://localhost:3000/api/paymentcallback'; // Your callback URL for transaction response
        const ORDER_ID = `ORDER_${new Date().getTime()}`;

        paytmParams.body = {
            requestType: 'Payment',
            mid: MID,
            websiteName: WEBSITE,
            orderId: ORDER_ID,
            callbackUrl: CALLBACK_URL,
            txnAmount: {
                value: amount,
                currency: 'INR',
            },
            userInfo: {
                custId: email,
            },
        };

        // Generate checksum
        const checksum = await PaytmChecksum.generateSignature(
            JSON.stringify(paytmParams.body),
            MERCHANT_KEY
        );

        paytmParams.head = {
            signature: checksum,
        };

        const post_data = JSON.stringify(paytmParams);

        const options = {
            hostname: 'securegw-stage.paytm.in', // For production, use 'securegw.paytm.in'
            path: `/theia/api/v1/initiateTransaction?mid=${MID}&orderId=${ORDER_ID}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': post_data.length,
            },
        };

        let response = '';
        const post_req = https.request(options, (post_res) => {
            post_res.on('data', (chunk) => {
                response += chunk;
            });

            post_res.on('end', () => {
                const jsonResponse = JSON.parse(response);
                if (jsonResponse.body && jsonResponse.body.txnToken) {
                    // Return Paytm payment page URL to the frontend
                    const paymentUrl = `https://securegw-stage.paytm.in/theia/api/v1/showPaymentPage?mid=${MID}&orderId=${ORDER_ID}&txnToken=${jsonResponse.body.txnToken}`;
                    res.status(200).json({ success: true, paymentUrl });
                } else {
                    res.status(500).json({ success: false, message: 'Payment initialization failed' });
                }
            });
        });

        post_req.write(post_data);
        post_req.end();
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}