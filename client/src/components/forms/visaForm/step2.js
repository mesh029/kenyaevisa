import React from 'react';
import TextField from '@mui/material/TextField';
import FileUpload from './FileUpload'; // Custom component for file upload

import { Typography, Radio, RadioGroup, FormControlLabel, Grid, Container, Box, FormControl, InputLabel, Input } from '@mui/material';



const Step2 = ({ values, handleChange }) => {
  return (
    <Container maxWidth="sm">
<Typography variant="body1" mb={3} fontWeight="bold" sx={{ color: 'black', textAlign: 'center', fontFamily: 'Quicksand, sans-serif' }}>
          Passport/Travel Document details
        </Typography>


<Grid item xs={12} >
<TextField
  className="input-field"
  label="Passport Number"
  variant="outlined"
  name="passportNumber"
  value={values?.passportNumber}
  onChange={handleChange}
  fullWidth
/>
</Grid>
<Grid item xs={12} mt={2}>
<TextField
  className="input-field"
  label="Place of Issue"
  variant="outlined"
  name="placeOfIssue"
  value={values?.placeOfIssue}
  onChange={handleChange}
  fullWidth
/>
</Grid>  



<Grid container spacing={2} mt={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Date of Issue"
          type="date"
          name="dateOfIssue"
          fullWidth
          onChange={handleChange}
          value={values?.dateOfIssue}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Expiry Date"
          type="date"
          name="expiryDate"
          fullWidth
          onChange={handleChange}
          value={values?.expiryDate}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
    </Grid>

<Grid item xs={12} mt={2}>
<TextField
className="input-field"
label="Issued By"
variant="outlined"
name="physicalAddress"
value={values?.issuedBy}
onChange={handleChange}
fullWidth
InputProps={{ style: { borderRadius: '15px' } }}
/>
</Grid>
<Grid item xs={12} sm={3} mt={3}>






</Grid>
<Grid item xs={12} sm={3}>
<TextField
className="input-field"
label="Reason for entry"
variant="outlined"
name="email"
value={values?.reasonForEntry}
onChange={handleChange}
fullWidth
InputProps={{ style: { borderRadius: '15px' } }}

/>
</Grid>

</Container>
);
};

export default Step2;
