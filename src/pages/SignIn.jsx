import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './SignIn.css';
import Button from '../components/Button';
import TextInput from '../components/TextInput';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Failed to sign in: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="signin-page">
      <div className="signin-background"></div>
      
      <div className="signin-container glass-panel">
        <h2 className="signin-logo">SANKOFA<span className="text-gradient">+</span></h2>
        
        <div className="signin-form-box">
          <h1 className="signin-title">SIGN IN</h1>
          <p className="signin-subtitle">FOR CORPORATE ALCHEMIST</p>
          
          {error && <div className="error-message" style={{color: 'var(--color-primary)', marginBottom: '1rem', fontSize: '0.85rem'}}>{error}</div>}
          
          <form className="signin-form" onSubmit={handleSubmit}>
            <TextInput 
              label="EMAIL ADDRESS" 
              type="email" 
              id="email" 
              placeholder="name@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <TextInput 
              label="PASSWORD" 
              type="password" 
              id="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <Button variant="primary" className="signin-btn" type="submit" disabled={loading}>
              {loading ? 'SIGNING IN...' : 'CONTINUE WITH EMAIL'}
            </Button>
            
            <div className="form-links">
              <Link to="/signup">DON'T HAVE AN ACCOUNT? SIGN UP</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
