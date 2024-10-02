// pages/api/paytm-callback.js
import PaytmChecksum from 'paytmchecksum';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const paytmResponse = req.body;
        const MERCHANT_KEY = 'YOUR_MERCHANT_KEY_HERE';

        // Verify Paytm's response checksum
        const isValidChecksum = PaytmChecksum.verifySignature(paytmResponse, MERCHANT_KEY, paytmResponse.CHECKSUMHASH);

        if (isValidChecksum) {
            // Check if the payment is successful
            if (paytmResponse.STATUS === 'TXN_SUCCESS') {
                // Payment was successful, you can process the order here
                res.status(200).json({ success: true, message: 'Payment successful', data: paytmResponse });
            } else {
                // Payment failed
                res.status(200).json({ success: false, message: 'Payment failed', data: paytmResponse });
            }
        } else {
            // Invalid checksum, possible tampering
            res.status(400).json({ success: false, message: 'Invalid checksum' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}