import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div style={{ padding: '40px 80px' }}>
      {/* Hero Section */}
      <section style={{ display: 'flex', alignItems: 'center', minHeight: '80vh', gap: '50px' }}>
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{ flex: 1 }}
        >
          <h4 style={{ color: 'var(--primary)', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '20px' }}>Premium Experience</h4>
          <h1 style={{ fontSize: '4.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '30px' }}>
            Drive The <br /> 
            <span className="gradient-text">Future Of Luxury</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '40px', maxWidth: '500px' }}>
            Experience unparalleled performance and sophistication with our curated collection of world-class vehicles.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link to="/cars" className="btn-primary" style={{ textDecoration: 'none' }}>Browse Collection</Link>
            <Link to="/register" className="btn-outline" style={{ textDecoration: 'none' }}>Join Now</Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          style={{ flex: 1.2, position: 'relative' }}
        >
          <div className="glass" style={{ width: '100%', height: '500px', overflow: 'hidden', transform: 'rotate(-5deg)', border: '2px solid var(--primary)' }}>
            <img 
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200" 
              alt="Luxury Car" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div style={{ position: 'absolute', bottom: '-30px', right: '-30px', width: '300px', height: '200px', zIndex: -1, background: 'var(--primary)', borderRadius: '20px', filter: 'blur(80px)', opacity: 0.3 }}></div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section style={{ display: 'flex', justifyContent: 'space-between', padding: '100px 0' }}>
        {[
          { num: '500+', label: 'Luxury Cars' },
          { num: '12k+', label: 'Happy Clients' },
          { num: '24/7', label: 'Support' },
          { num: '50+', label: 'Global Awards' }
        ].map((stat, index) => (
          <motion.div 
            key={index}
            whileHover={{ y: -10 }}
            className="glass" 
            style={{ padding: '30px', textAlign: 'center', width: '200px' }}
          >
            <h2 style={{ color: 'var(--primary)', fontSize: '2.5rem', marginBottom: '10px' }}>{stat.num}</h2>
            <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{stat.label}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default Home;
