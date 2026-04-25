import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchMyBookings();
  }, []);

  const fetchMyBookings = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/my-bookings/${user.user_id}`);
      setBookings(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleCancel = async (booking_id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await axios.put(`http://localhost:5001/bookings/${booking_id}/cancel`);
        fetchMyBookings();
      } catch (err) {
        alert("Failed to cancel booking.");
      }
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '100px' }}>Loading...</div>;

  return (
    <div style={{ padding: '40px 80px', minHeight: '80vh' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '40px' }}>My <span className="gradient-text">Garage</span></h1>
      
      {bookings.length === 0 ? (
        <div className="glass" style={{ padding: '40px', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--text-muted)' }}>You haven't booked any cars yet.</h3>
          <button onClick={() => navigate('/cars')} className="btn-primary" style={{ marginTop: '20px' }}>Browse Cars</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
          {bookings.map((booking, index) => (
            <motion.div 
              key={booking.booking_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass"
              style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ height: '200px', overflow: 'hidden' }}>
                <img 
                  src={booking.image_url} 
                  alt={booking.car_name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '25px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>{booking.car_name}</h3>
                  <span style={{ 
                    background: booking.status === 'confirmed' ? 'rgba(77, 255, 136, 0.2)' : (booking.status === 'cancelled' ? 'rgba(255, 77, 77, 0.2)' : 'rgba(255, 204, 0, 0.2)'), 
                    color: booking.status === 'confirmed' ? '#4dff88' : (booking.status === 'cancelled' ? '#ff4d4d' : '#ffcc00'), 
                    padding: '5px 12px', 
                    borderRadius: '20px', 
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    textTransform: 'uppercase'
                  }}>
                    {booking.status}
                  </span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '5px' }}>Booking ID: #{booking.booking_id}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '15px' }}>Date: {booking.date}</p>
                <h2 style={{ color: 'var(--primary)', marginBottom: '20px' }}>${booking.price.toLocaleString()}</h2>
                
                <div style={{ marginTop: 'auto' }}>
                  {booking.status !== 'cancelled' && (
                    <button 
                      onClick={() => handleCancel(booking.booking_id)} 
                      className="btn-outline" 
                      style={{ width: '100%', borderColor: '#ff4d4d', color: '#ff4d4d' }}
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
