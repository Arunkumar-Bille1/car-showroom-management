import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaUserCircle } from 'react-icons/fa';

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [text, setText] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:5001/feedback');
      setFeedbacks(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to submit feedback");
      return;
    }
    try {
      await axios.post('http://localhost:5001/feedback', {
        user_id: user.user_id,
        text: text
      });
      setText('');
      fetchFeedbacks();
    } catch (err) {
      alert("Submission failed");
    }
  };

  return (
    <div style={{ padding: '40px 80px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '40px', textAlign: 'center' }}>
        Customer <span className="gradient-text">Feedback</span>
      </h1>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass"
        style={{ padding: '40px', marginBottom: '60px' }}
      >
        <h3 style={{ marginBottom: '20px' }}>Share Your Experience</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '20px' }}>
          <textarea 
            placeholder="Tell us what you think about our services..."
            style={{ flex: 1, padding: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: '#fff', minHeight: '100px', resize: 'none' }}
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-end', padding: '15px 30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaPaperPlane /> Submit
          </button>
        </form>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h2 style={{ marginBottom: '20px' }}>Recent Reviews</h2>
        {feedbacks.map((f, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass"
            style={{ padding: '25px', display: 'flex', gap: '20px' }}
          >
            <FaUserCircle size={40} color="var(--primary)" />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '8px' }}>
                <h4 style={{ fontWeight: 700 }}>{f.username}</h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{f.date}</span>
              </div>
              <p style={{ lineHeight: '1.6', color: 'var(--text-light)' }}>{f.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;
