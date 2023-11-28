import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/constants';
import { TextField, Button, Typography, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  
    // Password validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    setPasswordError(!passwordRegex.test(newPassword) ? 'Invalid password' : '');
  };
  

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // Email validation
    setEmailError(!newEmail.includes('@') && newEmail.length > 0 ? 'Invalid email' : '');
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Check for password and email validation errors
    if (passwordError || emailError) {
      alert('Please meet the requirements.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', { email, password });
      console.log('User signed up successfully!', response.data.token);
      navigate(ROUTES.EMAIL_VERIFICATION_SENT);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: 'auto' }}>
      <form onSubmit={handleSignUp}>
        <TextField
          type="email"
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={handleEmailChange}
          onBlur={handleEmailChange}
          margin="normal"
          required
          error={Boolean(emailError)}
          helperText={emailError ? 'Invalid email' : ''}
        />
        <TextField
          type={showPassword ? 'text' : 'password'}
          label="Password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={handlePasswordChange}
          onBlur={handlePasswordChange}
          margin="normal"
          required
          error={Boolean(passwordError)}
          helperText={passwordError || 'Password must be at least 6 characters with a letter and a special character'}
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
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={Boolean(passwordError)}>
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
