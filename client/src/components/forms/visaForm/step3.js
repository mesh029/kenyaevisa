import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Typography, IconButton, InputAdornment, Tooltip, Grid, Container } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const Step3 = ({ values, setValues, handleChange }) => {
  const [selectedFilePassportBioData, setSelectedFilePassportBioData] = useState(null);
  const [selectedFilePassportFrontCover, setSelectedFilePassportFrontCover] = useState(null);
  const [selectedFileTravelItinerary, setSelectedFileTravelItinerary] = useState(null);
  const [selectedFileReturnTicket, setSelectedFileReturnTicket] = useState(null);

  const handleFileChange = (event, fieldName, setSelectedFile) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setValues({ ...values, [fieldName]: file?.name });
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
          value={values.passportBioData}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Tooltip title="Choose File">
                  <label htmlFor="file-upload-passportBioData">
                    <IconButton component="span" color="primary">
                      <AttachFileIcon />
                    </IconButton>
                  </label>
                </Tooltip>
              </InputAdornment>
            ),

          }}
        />
        <input
          id="file-upload-passportBioData"
          type="file"
          accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
          style={{ display: 'none' }}
          onChange={(event) => handleFileChange(event, 'passportBioData', setSelectedFilePassportBioData)}
        />
      </Grid>

      <Grid item xs={12} mb={2}>
        <TextField
          label="Passport front cover"
          variant="filled"
          name="passportFrontCover"
          value={values.passportFrontCover}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Tooltip title="Choose File">
                  <label htmlFor="file-upload-passportFrontCover">
                    <IconButton component="span" color="primary">
                      <AttachFileIcon />
                    </IconButton>
                  </label>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
        <input
          id="file-upload-passportFrontCover"
          type="file"
          accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
          style={{ display: 'none' }}
          onChange={(event) => handleFileChange(event, 'passportFrontCover', setSelectedFilePassportFrontCover)}
        />
      </Grid>

      <Grid item xs={12} mb={2}>
        <TextField
          label="Travel itinerary (optional)"
          variant="filled"
          name="travelItinerary"
          value={values.travelItinerary}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Tooltip title="Choose File">
                  <label htmlFor="file-upload-travelItinerary">
                    <IconButton component="span" color="primary">
                      <AttachFileIcon />
                    </IconButton>
                  </label>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
        <input
          id="file-upload-travelItinerary"
          type="file"
          accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
          style={{ display: 'none' }}
          onChange={(event) => handleFileChange(event, 'travelItinerary', setSelectedFileTravelItinerary)}
        />
      </Grid>

      <Grid item xs={12} mb={2}>
        <TextField
          label="Recent coloured photo of the applicatnt"
          variant="filled"
          name="travelItinerary"
          value={values.travelItinerary}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Tooltip title="Choose File">
                  <label htmlFor="file-upload-travelItinerary">
                    <IconButton component="span" color="primary">
                      <AttachFileIcon />
                    </IconButton>
                  </label>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
        <input
          id="file-upload-travelItinerary"
          type="file"
          accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
          style={{ display: 'none' }}
          onChange={(event) => handleFileChange(event, 'travelItinerary', setSelectedFileTravelItinerary)}
        />
      </Grid>
      

      <Grid item xs={12} mb={2}>
        <TextField
          label="Return ticket"
          variant="filled"
          name="returnTicket"
          value={values.returnTicket}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Tooltip title="Choose File">
                  <label htmlFor="file-upload-returnTicket">
                    <IconButton component="span" color="primary">
                      <AttachFileIcon />
                    </IconButton>
                  </label>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
        <input
          id="file-upload-returnTicket"
          type="file"
          accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
          style={{ display: 'none' }}
          onChange={(event) => handleFileChange(event, 'returnTicket', setSelectedFileReturnTicket)}
        />
      </Grid>

    </Container>
  );
};

export default Step3;
