import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCreditCard, FaMobileAlt, FaWallet, FaCheckCircle } from 'react-icons/fa';

const Payment = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);
  const [method, setMethod] = useState('Card');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('current_booking'));
    if (!data) {
      navigate('/cars');
      return;
    }
    setBookingData(data);
  }, []);

  const handlePayment = async () => {
    try {
      await axios.post('http://localhost:5001/payment', {
        booking_id: bookingData.booking_id,
        amount: bookingData.amount,
        method: method
      });
      setIsSuccess(true);
      localStorage.removeItem('current_booking');
      setTimeout(() => {
        navigate('/my-bookings');
      }, 3000);
    } catch (err) {
      alert("Payment failed.");
    }
  };

  if (!bookingData) return null;

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <AnimatePresence>
        {!isSuccess ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="glass" 
            style={{ width: '100%', maxWidth: '500px', padding: '40px' }}
          >
            <h2 style={{ fontSize: '2rem', marginBottom: '30px', textAlign: 'center' }}>Secure <span className="gradient-text">Checkout</span></h2>
            
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', marginBottom: '30px' }}>
              <p style={{ color: 'var(--text-muted)', marginBottom: '5px' }}>Total Amount</p>
              <h1 style={{ color: 'var(--primary)', fontSize: '2.5rem' }}>${bookingData.amount.toLocaleString()}</h1>
              <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>Booking for: <span style={{ fontWeight: 600 }}>{bookingData.car_name}</span></p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
              <label style={{ fontWeight: 600 }}>Select Payment Method</label>
              {[
                { id: 'Card', icon: <FaCreditCard />, label: 'Credit / Debit Card' },
                { id: 'UPI', icon: <FaMobileAlt />, label: 'UPI / Digital Wallet' },
                { id: 'Cash', icon: <FaWallet />, label: 'Pay at Showroom' }
              ].map((m) => (
                <div 
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '15px', 
                    padding: '15px', 
                    borderRadius: '10px', 
                    cursor: 'pointer',
                    border: `1px solid ${method === m.id ? 'var(--primary)' : 'var(--glass-border)'}`,
                    background: method === m.id ? 'rgba(201, 168, 106, 0.1)' : 'transparent',
                    transition: 'var(--transition)'
                  }}
                >
                  <span style={{ color: method === m.id ? 'var(--primary)' : 'var(--text-muted)' }}>{m.icon}</span>
                  <span style={{ fontWeight: 500 }}>{m.label}</span>
                </div>
              ))}
            </div>

            {/* Dynamic Payment Details Fields */}
            <div style={{ marginBottom: '30px', minHeight: '80px' }}>
              <AnimatePresence mode="wait">
                {method === 'Card' && (
                  <motion.div key="card" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Card Number</label>
                    <input type="text" placeholder="XXXX XXXX XXXX XXXX" style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: '#fff', marginBottom: '10px' }} />
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input type="text" placeholder="MM/YY" style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: '#fff' }} />
                      <input type="text" placeholder="CVV" style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: '#fff' }} />
                    </div>
                  </motion.div>
                )}
                {method === 'UPI' && (
                  <motion.div key="upi" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                    <div style={{ background: 'rgba(77, 255, 136, 0.1)', border: '1px dashed #4dff88', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
                      <p style={{ color: '#4dff88', fontWeight: 600, marginBottom: '5px' }}>Scan & Pay to:</p>
                      <h3 style={{ letterSpacing: '1px' }}>8074975446@axl</h3>
                    </div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Enter your UPI ID to verify</label>
                    <input type="text" placeholder="yourname@upi" style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: '#fff' }} />
                  </motion.div>
                )}
                {method === 'Cash' && (
                  <motion.div key="cash" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                    <p style={{ color: 'var(--primary)', fontWeight: 600, background: 'rgba(201, 168, 106, 0.1)', padding: '15px', borderRadius: '8px', border: '1px dashed var(--primary)' }}>
                      You will pay the amount physically at the showroom when picking up the vehicle.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button onClick={handlePayment} className="btn-primary" style={{ width: '100%', padding: '15px' }}>
              {method === 'Cash' ? 'Confirm Booking' : `Confirm & Pay with ${method}`}
            </button>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: 'center' }}
          >
            <FaCheckCircle size={100} color="var(--primary)" style={{ marginBottom: '20px' }} />
            <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>Payment <span className="gradient-text">Success!</span></h1>
            <p style={{ color: 'var(--text-muted)' }}>
              {method === 'UPI' ? 'Payment to 8074975446@axl confirmed. ' : ''}
              Your ride is ready. Redirecting to your Garage...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Payment;
