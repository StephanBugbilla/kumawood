import { Link } from 'react-router-dom';
import { Search, UserCircle, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <nav className="navbar glass-panel">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          SANKOFA<span className="text-gradient">+</span>
        </Link>
        <div className="navbar-links">
          <Link to="/" className="nav-link active">Home</Link>
          <Link to="/" className="nav-link">Movies</Link>
          <Link to="/" className="nav-link">TV Shows</Link>
          {currentUser && <Link to="/profile" className="nav-link">My List</Link>}
          {currentUser && <Link to="/admin/upload" className="nav-link admin-link">Creator Studio</Link>}
        </div>
        <div className="navbar-actions">
          <button className="icon-button"><Search size={20} /></button>
          {!currentUser ? (
            <Link to="/signin" className="nav-link">Sign In</Link>
          ) : (
            <>
              <button className="icon-button" onClick={handleLogout} title="Sign Out"><LogOut size={20} /></button>
              <Link to="/profile" className="icon-button" title="Profile"><UserCircle size={24} /></Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
