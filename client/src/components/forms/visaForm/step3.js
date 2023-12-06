import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Typography, IconButton, InputAdornment, Tooltip, Grid, Container, Button } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import axios from 'axios';

const Step3 = ({ values, setValues,handleFileChange, fileValues, handleChange, formData, errorMessage }) => {
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
          value={values?.passportBioData}
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
          onChange={(event) => handleFileChange(event, 'passportBioData')}
        />
      </Grid>

      <Grid item xs={12} mb={2}>
        <TextField
          label="Passport front cover"
          variant="filled"
          name="passportFrontCover"
          value={values?.passportFrontCover}
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
          onChange={(event) => handleFileChange(event, 'passportFrontCover')}
        />
      </Grid>

      <Grid item xs={12} mb={2}>
        <TextField
          label="Travel itinerary (optional)"
          variant="filled"
          name="travelItinerary"
          value={values?.travelItinerary}
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
          onChange={(event) => handleFileChange(event, 'travelItinerary')}
        />
      </Grid>

      <Grid item xs={12} mb={2}>
        <TextField
          label="Coloured Photo"
          variant="filled"
          name="colouredPhoto"
          value={values?.colouredPhoto}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Tooltip title="Choose File">
                  <label htmlFor="file-upload-colouredPhoto">
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
          id="file-upload-colouredPhoto"
          type="file"
          accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
          style={{ display: 'none' }}
          onChange={(event) => handleFileChange(event, 'colouredPhoto')}
        />
      </Grid>

      

      <Grid item xs={12} mb={2}>
        <TextField
          label="Return ticket"
          variant="filled"
          name="returnTicket"
          value={values?.returnTicket}
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
          onChange={(event) => handleFileChange(event, 'returnTicket')}
        />
      </Grid>

      {errorMessage &&       <Typography mb={3} sx={{ textAlign: 'center', color: 'red'}}>
{errorMessage}      </Typography>
}

    </Container>
  );
};

export default Step3;
