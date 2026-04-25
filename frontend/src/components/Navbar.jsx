import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCar, FaUserAlt, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav className="glass" style={{ margin: '20px', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: '20px', zIndex: 1000 }}>
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <FaCar size={30} color="var(--primary)" />
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>LUXE<span style={{ color: 'var(--primary)' }}>DRIVE</span></h2>
      </Link>

      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/cars" className="nav-link">Cars</Link>
        <Link to="/feedback" className="nav-link">Feedback</Link>
        {user?.role === 'admin' && <Link to="/admin" className="nav-link">Admin</Link>}
        
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Link to="/my-bookings" className="nav-link">My Bookings</Link>
            <span style={{ color: 'var(--text-muted)' }}><FaUserAlt style={{ marginRight: '8px' }} />{user.username}</span>
            <button onClick={handleLogout} className="btn-outline" style={{ padding: '8px 15px', fontSize: '0.9rem' }}>
              <FaSignOutAlt style={{ marginRight: '8px' }} />Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="btn-primary" style={{ textDecoration: 'none' }}>Login</Link>
        )}
      </div>

      <style>{`
        .nav-link {
          text-decoration: none;
          color: var(--text-light);
          font-weight: 600;
          transition: var(--transition);
          position: relative;
        }
        .nav-link:hover {
          color: var(--primary);
        }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -5px;
          left: 0;
          background-color: var(--primary);
          transition: var(--transition);
        }
        .nav-link:hover::after {
          width: 100%;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
