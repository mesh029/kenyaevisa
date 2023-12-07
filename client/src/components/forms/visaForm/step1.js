import React, { useEffect, useState } from 'react';
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

const countries = require('countries-list');


const genders = ['Male', 'Female'];

const countryList = [
  // List of all countries in the world
  // You can use a package like 'countries-list' to get this 
  
    "Andorra",
    "United Arab Emirates",
    "Afghanistan",
    "Antigua and Barbuda",
    "Anguilla",
    "Albania",
    "Armenia",
    "Angola",
    "Antarctica",
    "Argentina",
    "American Samoa",
    "Austria",
    "Australia",
    "Aruba",
    "Aland",
    "Azerbaijan",
    "Bosnia and Herzegovina",
    "Barbados",
    "Bangladesh",
    "Belgium",
    "Burkina Faso",
    "Bulgaria",
    "Bahrain",
    "Burundi",
    "Benin",
    "Saint Barthelemy",
    "Bermuda",
    "Brunei",
    "Bolivia",
    "Bonaire",
    "Brazil",
    "Bahamas",
    "Bhutan",
    "Bouvet Island",
    "Botswana",
    "Belarus",
    "Belize",
    "Canada",
    "Cocos (Keeling) Islands",
    "Democratic Republic of the Congo",
    "Central African Republic",
    "Republic of the Congo",
    "Switzerland",
    "Ivory Coast",
    "Cook Islands",
    "Chile",
    "Cameroon",
    "China",
    "Colombia",
    "Costa Rica",
    "Cuba",
    "Cape Verde",
    "Curacao",
    "Christmas Island",
    "Cyprus",
    "Czech Republic",
    "Germany",
    "Djibouti",
    "Denmark",
    "Dominica",
    "Dominican Republic",
    "Algeria",
    "Ecuador",
    "Estonia",
    "Egypt",
    "Western Sahara",
    "Eritrea",
    "Spain",
    "Ethiopia",
    "Finland",
    "Fiji",
    "Falkland Islands",
    "Micronesia",
    "Faroe Islands",
    "France",
    "Gabon",
    "United Kingdom",
    "Grenada",
    "Georgia",
    "French Guiana",
    "Guernsey",
    "Ghana",
    "Gibraltar",
    "Greenland",
    "Gambia",
    "Guinea",
    "Guadeloupe",
    "Equatorial Guinea",
    "Greece",
    "South Georgia and the South Sandwich Islands",
    "Guatemala",
    "Guam",
    "Guinea-Bissau",
    "Guyana",
    "Hong Kong",
    "Heard Island and McDonald Islands",
    "Honduras",
    "Croatia",
    "Haiti",
    "Hungary",
    "Indonesia",
    "Ireland",
    "Israel",
    "Isle of Man",
    "India",
    "British Indian Ocean Territory",
    "Iraq",
    "Iran",
    "Iceland",
    "Italy",
    "Jersey",
    "Jamaica",
    "Jordan",
    "Japan",
    "Kenya",
    "Kyrgyzstan",
    "Cambodia",
    "Kiribati",
    "Comoros",
    "Saint Kitts and Nevis",
    "North Korea",
    "South Korea",
    "Kuwait",
    "Cayman Islands",
    "Kazakhstan",
    "Laos",
    "Lebanon",
    "Saint Lucia",
    "Liechtenstein",
    "Sri Lanka",
    "Liberia",
    "Lesotho",
    "Lithuania",
    "Luxembourg",
    "Latvia",
    "Libya",
    "Morocco",
    "Monaco",
    "Moldova",
    "Montenegro",
    "Saint Martin",
    "Madagascar",
    "Marshall Islands",
    "North Macedonia",
    "Mali",
    "Myanmar (Burma)",
    "Mongolia",
    "Macao",
    "Northern Mariana Islands",
    "Martinique",
    "Mauritania",
    "Montserrat",
    "Malta",
    "Mauritius",
    "Maldives",
    "Malawi",
    "Mexico",
    "Malaysia",
    "Mozambique",
    "Namibia",
    "New Caledonia",
    "Niger",
    "Norfolk Island",
    "Nigeria",
    "Nicaragua",
    "Netherlands",
    "Norway",
    "Nepal",
    "Nauru",
    "Niue",
    "New Zealand",
    "Oman",
    "Panama",
    "Peru",
    "French Polynesia",
    "Papua New Guinea",
    "Philippines",
    "Pakistan",
    "Poland",
    "Saint Pierre and Miquelon",
    "Pitcairn Islands",
    "Puerto Rico",
    "Palestine",
    "Portugal",
    "Palau",
    "Paraguay",
    "Qatar",
    "Reunion",
    "Romania",
    "Serbia",
    "Russia",
    "Rwanda",
    "Saudi Arabia",
    "Solomon Islands",
    "Seychelles",
    "Sudan",
    "Sweden",
    "Singapore",
    "Saint Helena",
    "Slovenia",
    "Svalbard and Jan Mayen",
    "Slovakia",
    "Sierra Leone",
    "San Marino",
    "Senegal",
    "Somalia",
    "Suriname",
    "South Sudan",
    "Sao Tome and Principe",
    "El Salvador",
    "Sint Maarten",
    "Syria",
    "Eswatini",
    "Turks and Caicos Islands",
    "Chad",
    "French Southern Territories",
    "Togo",
    "Thailand",
    "Tajikistan",
    "Tokelau",
    "East Timor",
    "Turkmenistan",
    "Tunisia",
    "Tonga",
    "Turkey",
    "Trinidad and Tobago",
    "Tuvalu",
    "Taiwan",
    "Tanzania",
    "Ukraine",
    "Uganda",
    "U.S. Minor Outlying Islands",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vatican City",
    "Saint Vincent and the Grenadines",
    "Venezuela",
    "British Virgin Islands",
    "U.S. Virgin Islands",
    "Vietnam",
    "Vanuatu",
    "Wallis and Futuna",
    "Samoa",
    "Kosovo",
    "Yemen",
    "Mayotte",
    "South Africa",
    "Zambia",
    "Zimbabwe"
  
  ];

const Step1 = ({ values, handleChange, handleNext, errors={} }) => {

  
  const handleChange2 = (value) => {
    // Create a synthetic event object
    const event = { target: { name: 'phoneNumber', value } };
  
    // Call the handleChange function with the event object
    handleChange(event);
  
  };
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
            required
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
            required
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
        required


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
            name="gender"
            value={values?.gender}
            onChange={handleChange}
          
          >
            <FormControlLabel
              value="Female"
              control={<Radio color="primary" />}
              label="Male"
            />
            <FormControlLabel
              value="Male"
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
          value={values?.countryOfResidence}
          onChange={(event, newValue) => {
            // Create a synthetic event object
            const syntheticEvent = { target: { name: 'countryOfResidence', value: newValue } };
        
            // Call the handleChange function with the synthetic event object
            handleChange(syntheticEvent);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Country of Residence"
              variant="outlined"
              name="countryOfResidence"
              value={values?.countryOfResidence}
              onChange={handleChange}
              required
            />
          )}
        />
        </Grid>

        <Grid item xs={12} sm={6}>
        <TextField
          className="input-field"
          label="Present Nationality"
          variant="outlined"
          name="presentNationality"
          value={values?.presentNationality}
          onChange={handleChange}
          fullWidth
          InputProps={{ style: { borderRadius: '15px' } }}
          required
        />

      </Grid>
      <Grid item xs={12} sm={6}>
      <TextField
          className="input-field"
          label="nationality at Birth"
          variant="outlined"
          name="nationalityAtBirth"
          value={values?.nationalityAtBirth}
          onChange={handleChange}
          fullWidth
          InputProps={{ style: { borderRadius: '15px' } }}
          required
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
          required
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
    type="email"  // Set the input type to 'email'
    value={values?.email}
    onChange={handleChange}
    fullWidth
    InputProps={{
      style: { borderRadius: '15px' },
      placeholder: "example@example.com", // Add a placeholder
    }}
    required
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
