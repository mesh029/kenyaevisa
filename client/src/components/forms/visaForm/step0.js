import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import FileUpload from './FileUpload'; // Custom component for file upload
import { Typography,IconButton, InputAdornment, Tooltip , Radio, RadioGroup, FormControlLabel, Grid, Container, Box, FormControl, InputLabel, Input, Card, CardContent } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import FastTrackIcon from '@mui/icons-material/FlashOn'; // Import an icon for the fast track option
import StandardIcon from '@mui/icons-material/AccessTime'; // Import an icon for the standard option


const Step0 = ({ visaType, values, handleChange, handleCardClick }) => {

  const getCostForVisaType = (visaType) => {
    switch (visaType) {
      case 'Tourist Visa':
        return '$80';
      case 'Transit Visa':
        return '$40';
      case 'Single Entry Visa':
        return '$80';
      case 'East Africa Tourist Visa':
        return '$150';
      case 'Referred Visa':
        return '$200';
      default:
        return 'Default Cost';
    }
  };

  const getCostForVisaTypeB = (visaType) => {
    switch (visaType) {
      case 'Tourist Visa':
        return '$110';
      case 'Transit Visa':
        return '$50';
      case 'Single Entry Visa':
        return '$110';
      case 'East Africa Tourist Visa':
        return '$180';
      case 'Referred Visa':
        return '$300';
      default:
        return 'Default Cost';
    }
  };

  return (
    <Container maxWidth="sm">
    <Typography variant="body1" mb={3} fontWeight="bold" sx={{ color: 'black', textAlign: 'center', fontFamily: 'Quicksand, sans-serif' }}>
      Select Visa Processing Option
    </Typography>

    <Grid container spacing={2}>
      {/* Fast Track Visa Processing Card */}
      <Grid item xs={12} sm={6}>
        <Card
          onClick={() => handleCardClick('Fast Track Processing')}
          sx={{
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            '&:hover': {
              backgroundColor: '#f5f5f5', // Change to your preferred hover background color
            },
            '&:active': {
              transform: 'scale(0.98)', // Add a subtle scale effect on click
            },
          }}
        >
          <CardContent>
            <Typography variant="h6" component="div">
              Fast Track Processing
            </Typography>
            <FastTrackIcon style={{ fontSize: 40, color: '#FF5722' }} />
            <Typography variant="body1" color="text.secondary" sx={{ marginTop: 2 }}>
              Your visa will be processed within 48 hours of payment.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ marginTop: 2 }}>
              Cost: {getCostForVisaTypeB(visaType)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Standard Visa Processing Card */}
      <Grid item xs={12} sm={6}>
        <Card
          onClick={() => handleCardClick('Standard Processing')}
          sx={{
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            '&:hover': {
              backgroundColor: '#f5f5f5', // Change to your preferred hover background color
            },
            '&:active': {
              transform: 'scale(0.98)', // Add a subtle scale effect on click
            },
          }}
        >
          <CardContent>
            <Typography variant="h6" component="div">
              Standard Processing
            </Typography>
            <StandardIcon style={{ fontSize: 40, color: '#2196F3' }} />
            <Typography variant="body1" color="text.secondary" sx={{ marginTop: 2 }}>
              Your visa will be processed in 4 days.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ marginTop: 2 }}>
              Cost: {getCostForVisaType(visaType)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Container>

  );
};


export default Step0;


