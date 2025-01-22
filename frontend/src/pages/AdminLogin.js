import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import url from '../utils/appUrls';
import { errorPopUp, succesPopUp } from '../utils/Toaster';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post(url.admin.login, { email, password }); 
        
      localStorage.setItem('adminToken', res.data.token);
      navigate('/admin/dashboard'); 
      succesPopUp('Login successful!');
    } catch (error) {
      errorPopUp('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
