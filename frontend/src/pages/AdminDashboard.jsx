import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaPlus, FaTrash, FaEdit, FaCar, FaClipboardList, FaMoneyBillWave, FaCommentAlt } from 'react-icons/fa';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('cars');
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [newCar, setNewCar] = useState({ brand: '', model: '', year: 2024, price: '', image_url: '' });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      if (activeTab === 'cars') {
        const res = await axios.get('http://localhost:5001/cars');
        setCars(res.data);
      } else if (activeTab === 'bookings') {
        const res = await axios.get('http://localhost:5001/bookings');
        setBookings(res.data);
      } else if (activeTab === 'payments') {
        const res = await axios.get('http://localhost:5001/payments');
        setPayments(res.data);
      } else if (activeTab === 'feedback') {
        const res = await axios.get('http://localhost:5001/feedback');
        setFeedbacks(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddCar = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/cars', newCar);
      setNewCar({ brand: '', model: '', year: 2024, price: '', image_url: '' });
      fetchData();
    } catch (err) {
      alert("Failed to add car");
    }
  };

  const handleDeleteCar = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await axios.delete(`http://localhost:5001/cars/${id}`);
        fetchData();
      } catch (err) {
        alert("Failed to delete car");
      }
    }
  };

  return (
    <div style={{ padding: '40px 80px' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '40px' }}>Admin <span className="gradient-text">Portal</span></h1>

      <div style={{ display: 'flex', gap: '30px' }}>
        {/* Sidebar */}
        <div style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { id: 'cars', icon: <FaCar />, label: 'Manage Cars' },
            { id: 'bookings', icon: <FaClipboardList />, label: 'Bookings' },
            { id: 'payments', icon: <FaMoneyBillWave />, label: 'Payments' },
            { id: 'feedback', icon: <FaCommentAlt />, label: 'Feedback' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="glass"
              style={{ 
                padding: '15px 20px', 
                textAlign: 'left', 
                border: activeTab === tab.id ? '1px solid var(--primary)' : '1px solid var(--glass-border)',
                background: activeTab === tab.id ? 'rgba(201, 168, 106, 0.15)' : 'transparent',
                color: activeTab === tab.id ? 'var(--primary)' : '#fff',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          {activeTab === 'cars' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="glass" style={{ padding: '30px', marginBottom: '30px' }}>
                <h3 style={{ marginBottom: '20px' }}>Add New Vehicle</h3>
                <form onSubmit={handleAddCar} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                  <input placeholder="Brand" style={inputStyle} value={newCar.brand} onChange={e => setNewCar({...newCar, brand: e.target.value})} required />
                  <input placeholder="Model" style={inputStyle} value={newCar.model} onChange={e => setNewCar({...newCar, model: e.target.value})} required />
                  <input placeholder="Price" type="number" style={inputStyle} value={newCar.price} onChange={e => setNewCar({...newCar, price: e.target.value})} required />
                  <input placeholder="Year" type="number" style={inputStyle} value={newCar.year} onChange={e => setNewCar({...newCar, year: e.target.value})} required />
                  <input placeholder="Image URL" style={{ ...inputStyle, gridColumn: 'span 2' }} value={newCar.image_url} onChange={e => setNewCar({...newCar, image_url: e.target.value})} />
                  <button type="submit" className="btn-primary" style={{ gridColumn: 'span 3' }}><FaPlus /> Add Car</button>
                </form>
              </div>

              <div className="glass" style={{ padding: '30px', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                      <th style={thStyle}>Image</th>
                      <th style={thStyle}>Brand</th>
                      <th style={thStyle}>Model</th>
                      <th style={thStyle}>Price</th>
                      <th style={thStyle}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cars.map(car => (
                      <tr key={car.car_id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={tdStyle}><img src={car.image_url} width="60" height="40" style={{ borderRadius: '4px', objectFit: 'cover' }} /></td>
                        <td style={tdStyle}>{car.brand}</td>
                        <td style={tdStyle}>{car.model}</td>
                        <td style={tdStyle}>${car.price.toLocaleString()}</td>
                        <td style={tdStyle}>
                          <button onClick={() => handleDeleteCar(car.car_id)} style={{ background: 'transparent', border: 'none', color: '#ff4d4d', cursor: 'pointer' }}><FaTrash /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'bookings' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass" style={{ padding: '30px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                    <th style={thStyle}>User</th>
                    <th style={thStyle}>Car</th>
                    <th style={thStyle}>Date</th>
                    <th style={thStyle}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(b => (
                    <tr key={b.booking_id}>
                      <td style={tdStyle}>{b.username}</td>
                      <td style={tdStyle}>{b.car}</td>
                      <td style={tdStyle}>{b.date}</td>
                      <td style={tdStyle}><span style={{ color: b.status === 'confirmed' ? '#4dff88' : 'var(--primary)' }}>{b.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}

          {activeTab === 'payments' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass" style={{ padding: '30px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                    <th style={thStyle}>ID</th>
                    <th style={thStyle}>Amount</th>
                    <th style={thStyle}>Method</th>
                    <th style={thStyle}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map(p => (
                    <tr key={p.payment_id}>
                      <td style={tdStyle}>#{p.payment_id}</td>
                      <td style={tdStyle}>${p.amount.toLocaleString()}</td>
                      <td style={tdStyle}>{p.method}</td>
                      <td style={tdStyle}>{p.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}

          {activeTab === 'feedback' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {feedbacks.map((f, i) => (
                <div key={i} className="glass" style={{ padding: '20px' }}>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '5px' }}>{f.username}</h4>
                  <p>{f.text}</p>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  padding: '12px',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid var(--glass-border)',
  borderRadius: '8px',
  color: '#fff'
};

const thStyle = { padding: '15px', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 };
const tdStyle = { padding: '15px', color: '#fff' };

export default AdminDashboard;
