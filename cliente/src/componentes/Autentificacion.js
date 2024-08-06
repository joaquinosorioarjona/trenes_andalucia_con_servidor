import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../estilos/Autentificacion.css';

const Autentificacion = ({ isAuthenticated, role, onLogin, onLogout }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5000/estaciones', {
        headers: {
          'Authorization': `Basic ${token}`
        }
      }).then((response) => {
        console.log('Usuario autenticado automáticamente:', response.data);
        onLogin('admin');
      }).catch((error) => {
        console.log('Error en la autenticación automática:', error.response);
        localStorage.removeItem('token');
      });
    }
  }, [onLogin]);

  const handleLogin = async () => {
    try {
      const token = btoa(`${username}:${password}`);
      const response = await axios.get('http://localhost:5000/estaciones', {
        headers: {
          'Authorization': `Basic ${token}`
        }
      });
      console.log('Respuesta de login:', response.data);
      if (username === 'admin' && password === 'adminpass') {
        localStorage.setItem('token', token);
        onLogin('admin');
        setErrorMessage('');
      } else {
        setErrorMessage('Invalid credentials');
      }
    } catch (error) {
      console.log('Error en login:', error.response);
      setErrorMessage('Invalid credentials');
    }
  };

  const handleLogout = () => {
    onLogout();
    localStorage.removeItem('token');
    setUsername('');
    setPassword('');
    setErrorMessage('');
  };

  return (
    <div className="auth-container">
      {isAuthenticated ? (
        <div className="auth-logged-in">
          <span>Role: {role}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="auth-login">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          {errorMessage && <span className="error-message">{errorMessage}</span>}
        </div>
      )}
    </div>
  );
};

export default Autentificacion;



