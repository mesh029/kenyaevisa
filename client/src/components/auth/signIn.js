import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/constants';
import { TextField, Button, Typography, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

//setting up redux

import { useDispatch } from 'react-redux';
import { setUserData } from '../../actions/userActions';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleSignIn = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('https://kenyaevisa.mytests.online/api/auth/adminLogin', { email, password });
      console.log('Admin signed in successfully!');
  
      const adminData = response?.data;
      localStorage.setItem('adminData', JSON.stringify(adminData));
  
      const token = response?.data?.token;
      console.log("admin", token);
  
      // Include the token directly in the headers for this request
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      dispatch(setUserData(adminData));
      navigate(ROUTES.ADMIN);
    } catch (error) {
      console.error('Error signing in:', error.response.data);
      console.log(email);
      console.log(password);
    }
  };
  
  return (
    <div style={{ maxWidth: '300px', margin: 'auto', minHeight: "100vh", marginTop:"80px" }}>

<div></div>
<Typography variant="h6" fontWeight="bold" sx={{ color: 'primary.main', textAlign: 'center', fontFamily: 'Quicksand, sans-serif' }}>
          Admin Sign In
        </Typography>
      <form onSubmit={handleSignIn}>
        <TextField
          type="email"
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          type={showPassword ? 'text' : 'password'}
          label="Password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
