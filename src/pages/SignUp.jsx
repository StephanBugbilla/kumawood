import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './SignUp.css';
import Button from '../components/Button';
import TextInput from '../components/TextInput';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match.');
    }
    
    try {
      setError('');
      setLoading(true);
      await signup(email, password);
      navigate('/');
    } catch (err) {
      setError('Failed to create an account: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="signup-page">
      <div className="signup-background"></div>
      
      <div className="signup-container glass-panel">
        <h2 className="signup-logo">SANKOFA<span className="text-gradient">+</span></h2>
        
        <div className="signup-form-box">
          <h1 className="signup-title">CREATE ACCOUNT</h1>
          <p className="signup-subtitle">BECOME A CORPORATE ALCHEMIST</p>
          
          {error && <div className="error-message" style={{color: 'var(--color-primary)', marginBottom: '1rem', fontSize: '0.85rem'}}>{error}</div>}
          
          <form className="signup-form" onSubmit={handleSubmit}>
            <TextInput 
              label="EMAIL ADDRESS" 
              type="email" 
              id="signup-email" 
              placeholder="name@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <TextInput 
              label="PASSWORD" 
              type="password" 
              id="signup-password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <TextInput 
              label="CONFIRM PASSWORD" 
              type="password" 
              id="signup-confirm-password" 
              placeholder="••••••••" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            
            <Button variant="primary" className="signup-btn" type="submit" disabled={loading}>
              {loading ? 'CREATING ACCOUNT...' : 'CONTINUE WITH EMAIL'}
            </Button>
            
            <div className="form-links">
              <Link to="/signin">ALREADY HAVE AN ACCOUNT? SIGN IN</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
