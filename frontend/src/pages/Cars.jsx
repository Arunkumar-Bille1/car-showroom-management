import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter } from 'react-icons/fa';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [search, setSearch] = useState('');
  const [brandFilter, setBrandFilter] = useState('All');

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get('http://localhost:5001/cars');
      setCars(response.data);
      setFilteredCars(response.data);
    } catch (err) {
      console.error("Error fetching cars", err);
    }
  };

  useEffect(() => {
    let result = cars;
    if (brandFilter !== 'All') {
      result = result.filter(car => car.brand === brandFilter);
    }
    if (search) {
      result = result.filter(car => 
        car.brand.toLowerCase().includes(search.toLowerCase()) || 
        car.model.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredCars(result);
  }, [search, brandFilter, cars]);

  const brands = ['All', ...new Set(cars.map(c => c.brand))];

  return (
    <div style={{ padding: '40px 80px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800 }}>Our <span className="gradient-text">Fleet</span></h1>
        
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ position: 'relative' }}>
            <FaSearch style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search brand or model..."
              className="glass"
              style={{ padding: '12px 12px 12px 45px', width: '300px', color: '#fff', border: '1px solid var(--glass-border)' }}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaFilter color="var(--primary)" />
            <select 
              className="glass"
              style={{ padding: '12px', color: '#fff', border: '1px solid var(--glass-border)', outline: 'none' }}
              onChange={(e) => setBrandFilter(e.target.value)}
            >
              {brands.map(b => <option key={b} value={b} style={{ background: '#222' }}>{b}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
        {filteredCars.map((car, index) => (
          <motion.div 
            key={car.car_id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass"
            style={{ overflow: 'hidden', transition: 'var(--transition)' }}
            whileHover={{ y: -10 }}
          >
            <div style={{ height: '220px', overflow: 'hidden' }}>
              <img 
                src={car.image_url || 'https://via.placeholder.com/400x250'} 
                alt={car.model} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: '0.5s' }}
              />
            </div>
            <div style={{ padding: '25px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                <div>
                  <h4 style={{ color: 'var(--primary)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px' }}>{car.brand}</h4>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{car.model}</h3>
                </div>
                <span style={{ background: 'var(--primary)', color: '#000', padding: '5px 12px', borderRadius: '20px', fontWeight: 800, fontSize: '0.9rem' }}>
                  {car.year}
                </span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                <div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Daily Rate</p>
                  <h2 style={{ color: '#fff' }}>${car.price.toLocaleString()}</h2>
                </div>
                {car.availability ? (
                  <Link to={`/book/${car.car_id}`} className="btn-primary" style={{ textDecoration: 'none', padding: '10px 20px', fontSize: '0.8rem' }}>
                    Book Now
                  </Link>
                ) : (
                  <button className="btn-outline" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>Reserved</button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Cars;
