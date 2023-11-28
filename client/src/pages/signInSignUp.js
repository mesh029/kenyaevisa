import React, { useState } from 'react';
import SignUp from '../components/auth/signUp';
import SignIn from '../components/auth/signIn';
import { Button, Typography } from '@mui/material';

const SignInSignUp = () => {
  const [isSignIn, setIsSignIn] = useState(false);

  const toggleSignIn = () => {
    setIsSignIn((prev) => !prev);
  };

  return (
    <div style={{ maxWidth: '300px', margin: 'auto' }}>
      <Typography variant="h5" align="center" gutterBottom style={{ color: '#555', fontWeight: 'bold' }}>
        {isSignIn ? 'Sign In' : 'Sign Up'}
      </Typography>
      {isSignIn ? <SignIn /> : <SignUp />}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Typography variant="body1">
          {isSignIn ? "Don't have an account? " : 'Already have an account? '}
          <span style={{ cursor: 'pointer', color: '#2196f3', fontWeight: 'bold' }} onClick={toggleSignIn}>
            {isSignIn ? 'Sign Up' : 'Sign In'}
          </span>
        </Typography>
      </div>
    </div>
  );
};

export default SignInSignUp;
