import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchCarDetails();
  }, [id]);

  const fetchCarDetails = async () => {
    try {
      const response = await axios.get('http://localhost:5001/cars');
      const selectedCar = response.data.find(c => c.car_id === parseInt(id));
      setCar(selectedCar);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBooking = async () => {
    try {
      const response = await axios.post('http://localhost:5001/book', {
        user_id: user.user_id,
        car_id: id
      });
      localStorage.setItem('current_booking', JSON.stringify({
        booking_id: response.data.booking_id,
        amount: car.price,
        car_name: `${car.brand} ${car.model}`
      }));
      navigate('/payment');
    } catch (err) {
      alert("Booking failed. Please try again.");
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '100px' }}>Loading...</div>;

  return (
    <div style={{ padding: '60px 80px', display: 'flex', justifyContent: 'center' }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass"
        style={{ width: '100%', maxWidth: '900px', display: 'flex', overflow: 'hidden' }}
      >
        <div style={{ flex: 1 }}>
          <img src={car.image_url} alt={car.model} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        
        <div style={{ flex: 1, padding: '50px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div>
            <h4 style={{ color: 'var(--primary)', letterSpacing: '2px', marginBottom: '10px' }}>CONFIRM YOUR BOOKING</h4>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>{car.brand} {car.model}</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '15px', borderBottom: '1px solid var(--glass-border)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Year</span>
              <span style={{ fontWeight: 600 }}>{car.year}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '15px', borderBottom: '1px solid var(--glass-border)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Daily Price</span>
              <span style={{ fontWeight: 600, color: 'var(--primary)' }}>${car.price.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '15px', borderBottom: '1px solid var(--glass-border)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Status</span>
              <span style={{ fontWeight: 600, color: '#4dff88' }}>Available</span>
            </div>
          </div>

          <div className="glass" style={{ padding: '20px', background: 'rgba(201, 168, 106, 0.1)', border: '1px dashed var(--primary)' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaCheckCircle /> Free cancellation within 24 hours
            </p>
          </div>

          <button onClick={handleBooking} className="btn-primary" style={{ width: '100%', padding: '15px' }}>
            Proceed to Payment
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Booking;
