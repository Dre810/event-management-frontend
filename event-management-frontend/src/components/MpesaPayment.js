import React, { useState } from 'react';

const MpesaPayment = () => {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');

  const handlePay = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/mpesa/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, amount })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('Payment prompt sent to your phone. Please check your Mpesa.');
      } else {
        setStatus('Failed to initiate payment.');
        console.error(data);
      }
    } catch (error) {
      setStatus('Error connecting to server.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Pay via Mpesa</h2>
      <input type="text" placeholder="Phone (e.g. 2547XXXXXXXX)" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button onClick={handlePay}>Pay Now</button>
      <p>{status}</p>
    </div>
  );
};

export default MpesaPayment;
