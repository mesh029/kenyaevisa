import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Typography, Radio, RadioGroup, FormControlLabel, Grid, Container, Box, FormControl, InputLabel, Input } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { Label } from '@mui/icons-material';
import { MuiPhone } from '../../ui/telephoneInput';
import ReactPhoneInput from 'react-phone-input-material-ui';
import phoneField from '../../ui/phoneField';
import PhoneField from '../../ui/phoneField';
import MuiPhoneNumber from "material-ui-phone-number";
import "react-phone-input-2/lib/style.css";



const genders = ['Male', 'Female'];

const countryList = [
  // List of all countries in the world
  // You can use a package like 'countries-list' to get this 
  'Kenya', 'Egypt'
];

const handleChange2 = (value) => {
  // Create a synthetic event object
  const event = { target: { name: 'yourFieldName', value } };

  // Call the handleChange function with the event object
};


const Step1 = ({ values, handleChange }) => {
  const [phone, setPhone] = useState('');


  return (
    <Container maxWidth="sm">
              <Typography variant="body1" mb={3} fontWeight="bold" sx={{ color: 'black', textAlign: 'center', fontFamily: 'Quicksand, sans-serif' }}>
          Personal Details
        </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            className="input-field"
            label="Surname/Family Name"
            variant="outlined"
            name="surname"
            value={values?.surname}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        
      <Grid item xs={12} sm={6}>
      <TextField
            className="input-field"
            label="Other names in full"
            variant="outlined"
            name="fullName"
            value={values?.fullName}
            onChange={handleChange}
            fullWidth
          />
        </Grid>  

        <Grid item xs={12} sm={6}>


        <TextField
        label="Date of Birth"
        type="date"
        name='dateOfBirth'
        onChange={handleChange}
        value={values?.dateOfBirth}
        fullWidth


        InputLabelProps={{
          shrink: true,
        }}
      />

</Grid>
<Grid item xs={12} sm={6}>
      <Typography variant="h7" sx={{ color: 'black', textAlign: 'left', fontFamily: 'Quicksand, sans-serif' }}>
          Gender
        </Typography>
          <RadioGroup
            row
            name="sex"
            value={values?.sex}
            onChange={handleChange}
          >
            <FormControlLabel
              value="Male"
              control={<Radio color="primary" />}
              label="Male"
            />
            <FormControlLabel
              value="Female"
              control={<Radio color="primary" />}
              label="Female"
            />
          </RadioGroup>
        </Grid>

   
        {/* Other input fields */}
        <Grid item xs={12}>
                 <Autocomplete
                   disablePortal
                   id="combo-box-demo"
          options={countryList}
          fullWidth
          renderInput={(params) => (
            <TextField
              {...params}
              label="Country of Residence"
              variant="outlined"
              name="countryOfResidence"
              value={values?.countryOfResidence}
              onChange={handleChange}
            />
          )}
        />
        </Grid>

        <Grid item xs={12} sm={6}>
        <Autocomplete
          options={countryList}
          fullWidth
          renderInput={(params) => (
            <TextField
              {...params}
              label="Present Nationality"
              variant="outlined"
              name="presentNationality"
              value={values?.presentNationality}
              onChange={handleChange}
              InputProps={{ style: { borderRadius: '15px' } }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
<Autocomplete
            options={countryList}
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                label="Nationality at birth"
                name="nationalityAtBirth"
                value={values?.nationalityAtBirth}
                onChange={handleChange}
                InputProps={{ style: { borderRadius: '15px' } }}
              />
            )}
          />
      </Grid>

        {/* ... Other fields ... */}
      </Grid>

      <Grid item xs={12} mt={2}>
        <TextField
          className="input-field"
          label="Physical Address"
          variant="outlined"
          name="physicalAddress"
          value={values?.physicalAddress}
          onChange={handleChange}
          fullWidth
          InputProps={{ style: { borderRadius: '15px' } }}
          placeholder="e.g., 123 Main Street, City, Country"
        />
      </Grid>
      <Grid item xs={12} sm={3} mt={3}>

  
<Grid container spacing={2}>
      <Grid item xs={12} sm={6} mt={3} mb={3}>
      <MuiPhone onChange={handleChange2}/>

      </Grid>

    </Grid>

  


    
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          className="input-field"
          label="Email"
          variant="outlined"
          name="email"
          value={values?.email}
          onChange={handleChange}
          fullWidth
          InputProps={{ style: { borderRadius: '15px' } }}

        />
    </Grid>

    </Container>
  );
  


};

const countryCodes = [
  { name: 'United States', code: '1' },
  { name: 'Kenya', code: '254' },
  // Add more countries and their country codes here
];

export default Step1;
