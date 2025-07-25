import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ Import this

function Login() {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); // ✅ Initialize navigation

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3001/api/user/login', {
        emailOrUsername,
        password,
      });

      setMessage(res.data.message);

      // ✅ Navigate to home page on success
      if (res.status === 200) {
        navigate('/home');
      }

    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      {/* form UI */}
    </div>
  );
}

export default Login;
