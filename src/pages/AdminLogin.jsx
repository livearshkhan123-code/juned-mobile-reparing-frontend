import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/repairs', {
        headers: {
          Authorization: 'Basic ' + btoa(`${username}:${password}`)
        }
      });

      if (!response.ok) {
        setError('Username ya password galat hai.');
        return;
      }

      sessionStorage.setItem(
        'adminAuth',
        btoa(`${username}:${password}`)
      );

      navigate('/admin');
    } catch {
      setError('Backend se connection nahi ho raha.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'grid',
      placeItems: 'center',
      background: '#f3f4f6',
      fontFamily: 'Arial, sans-serif'
    }}>
      <form onSubmit={handleLogin} style={{
        width: '320px',
        maxWidth: '85vw',
        padding: '30px',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 5px 25px #0001'
      }}>
        <h2 style={{ textAlign: 'center' }}>JUNED Admin</h2>
        <p style={{ textAlign: 'center', color: '#666' }}>
          Login to your dashboard
        </p>

        <label>Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoComplete="username"
          style={inputStyle}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          style={inputStyle}
        />

        {error && (
          <p style={{ color: 'red', fontSize: '13px' }}>{error}</p>
        )}

        <button type="submit" style={buttonStyle}>
          Login
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  display: 'block',
  width: '100%',
  boxSizing: 'border-box',
  padding: '11px',
  margin: '8px 0 18px',
  border: '1px solid #ddd',
  borderRadius: '6px'
};

const buttonStyle = {
  width: '100%',
  padding: '12px',
  border: 'none',
  borderRadius: '6px',
  background: '#111827',
  color: 'white',
  cursor: 'pointer'
};

export default AdminLogin;