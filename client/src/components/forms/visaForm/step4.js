import React, { useState } from 'react';
import {
  Typography,
  Grid,
  Container,
  Card,
  CardContent,
  Box,
  FormControl,
  InputLabel,
  Input,
  Radio,
  RadioGroup,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Tooltip,
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const Step4 = ({ values, handleChange }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    // Do something with the selected file, like storing it in your state
  };

  const handleCaptureImage = () => {
    // Implement image capture functionality here, e.g., using a camera API
    // You can also open a camera modal or integrate a third-party library for image capture
    alert('Capture an image using the camera');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="body1" mb={3} fontWeight="bold" sx={{ color: 'black', textAlign: 'center', fontFamily: 'Quicksand, sans-serif' }}>
        Payment
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" mb={2}>
                Payment Details
              </Typography>
              {/* Add your payment protocol content here */}
              <Typography variant="body2">Payment through here</Typography>
              {/* Your file upload and capture functionality */}

            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Step4;
