import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import FileUpload from './FileUpload'; // Custom component for file upload
import { Typography,IconButton, InputAdornment, Tooltip , Radio, RadioGroup, FormControlLabel, Grid, Container, Box, FormControl, InputLabel, Input } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';


const Step3 = ({ values, handleChange }) => {
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
          File Uploads
        </Typography>


<Grid item xs={12} mb={2}>
      <TextField
        label="Passport bio data page"
        variant="filled"
        name="passportBioData"
        value={selectedFile?.name}
        onChange={handleChange}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Tooltip title="Choose File">
                <label htmlFor="file-upload">
                  <IconButton component="span" color="primary">
                    <AttachFileIcon />
                  </IconButton>
                </label>
              </Tooltip>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title="Capture Image">
                <IconButton onClick={handleCaptureImage} color="primary">
                  <PhotoCameraIcon />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
      <input
        id="file-upload"
        type="file"
        accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </Grid>

    <Grid item xs={12} mb={2}>
      <TextField
        label="Passport front cover"
        variant="filled"
        name="passporFrontCover"
        value={selectedFile?.name}
        onChange={handleChange}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Tooltip title="Choose File">
                <label htmlFor="file-upload">
                  <IconButton component="span" color="primary">
                    <AttachFileIcon />
                  </IconButton>
                </label>
              </Tooltip>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title="Capture Image">
                <IconButton onClick={handleCaptureImage} color="primary">
                  <PhotoCameraIcon />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
      <input
        id="file-upload"
        type="file"
        accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </Grid>

    <Grid item xs={12} mb={2}>
      <TextField
        label="Travel itinerary(optional)"
        variant="filled"
        name="passportNumber"
        value={selectedFile?.name}
        onChange={handleChange}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Tooltip title="Choose File">
                <label htmlFor="file-upload">
                  <IconButton component="span" color="primary">
                    <AttachFileIcon />
                  </IconButton>
                </label>
              </Tooltip>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title="Capture Image">
                <IconButton onClick={handleCaptureImage} color="primary">
                  <PhotoCameraIcon />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
      <input
        id="file-upload"
        type="file"
        accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </Grid>

    <Grid item xs={12} mb={2}>
      <TextField
        label="Return ticket"
        variant="filled"
        name="passportNumber"
        value={selectedFile?.name}
        onChange={handleChange}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Tooltip title="Choose File">
                <label htmlFor="file-upload">
                  <IconButton component="span" color="primary">
                    <AttachFileIcon />
                  </IconButton>
                </label>
              </Tooltip>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title="Capture Image">
                <IconButton onClick={handleCaptureImage} color="primary">
                  <PhotoCameraIcon />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
      <input
        id="file-upload"
        type="file"
        accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </Grid>


</Container>
  );
};


export default Step3;
