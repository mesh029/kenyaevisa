
import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Grid, Container, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import VisaCard from '../components/ui/visaCard';
import { useSelector } from 'react-redux';





const VisaSignUpEditForm = () => {

    const { id } = useParams();

  const [values, setValues] = useState({
    user: '',
    fullName: 'wepetu wepetu',
    dateOfBirth: '',
    passportNumber: '',
    visaType: '',
    status: '',
    intendedTravelDates: '',
    purposeOfVisit: '',
    travelItinerary: '',
    annualIncome: 0,
    bankStatements: '',
    medicalHistory: '',
    currentMedications: '',
    allergies: '',
    fingerprintData: '',
    facialRecognitionData: '',
    passportCopy: '',
    passportPhoto: '',
    otherImages: [],
    visaId:''
  });

  const [visa, setVisaData] = useState({})
  const API_URL = 'http://localhost:5000/api/visas'; // Adjust the URL
  const [vis, setVis] = useState('')
  useEffect(() => {
    const fetchVisaData = async () => {
        const visaId = id
        setVis(visaId)
      try {
        const response = await axios.get(`http://localhost:5000/api/visas/visa/${visaId}`);
        if (response.data.length > 0) {
            const {
              user,
              personalInfo,
              visaType,
              status,
              travelDetails,
              financialInfo,
              healthInfo,
              biometricInfo,
              documentUpload,
              imageUpload,
            } = response.data[0];
  
            const {
              fullName,
              dateOfBirth,
              passportNumber,
            } = personalInfo || {};
  
            const {
              intendedTravelDates,
              purposeOfVisit,
              travelItinerary,
            } = travelDetails || {};
  
            const {
              annualIncome,
              bankStatements,
            } = financialInfo || {};
  
            const {
              medicalHistory,
              currentMedications,
              allergies,
            } = healthInfo || {};
  
            const {
              fingerprintData,
              facialRecognitionData,
            } = biometricInfo || {};
  
            const {
              passportCopy,
            } = documentUpload || {};
  
            const {
              passportPhoto,
              otherImages,
            } = imageUpload || {};
  
            const destructuredValues = {
              user,
              fullName,
              dateOfBirth,
              passportNumber,
              visaType,
              status,
              intendedTravelDates,
              purposeOfVisit,
              travelItinerary,
              annualIncome,
              bankStatements,
              medicalHistory,
              currentMedications,
              allergies,
              fingerprintData,
              facialRecognitionData,
              passportCopy,
              passportPhoto,
              otherImages,
            };
  
            setValues(destructuredValues);
            setVisaData(response.data[0]);
          }
        } catch (error) {
          console.error('Error fetching visa data:', error);
        }
      };
  
      // Call the fetchVisaData function when the component mounts
      fetchVisaData();
    }, [id]);  

  const displayNA = (value) => (value || 'N/A');

  
  const userData = useSelector((state) => state.user.userData);

  const visaTypes = [
    'Tourist Visa',
    'Business Visa',
    'Student Visa',
    'Work Visa',
    'Visitor Visa',
    'Transit Visa',
    'Diplomatic/Official Visa',
    'Residence Visa',
    'Family Reunification Visa',
    'Investor Visa',
    'Retirement Visa',
    'Refugee/Asylum Visa',
  ];


  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };


  const flattenData = (data) => {
    const flattenedData = {
      visaId: "meshack ariri",
      user: userData._id,
      personalInfo:{
        fullName: data.fullName,  // Add other personal information fields as needed
        dateOfBirth: data.dateOfBirth,
        passportNumber: data.passportNumber
      },
      visaType: data.visaType,
      status: data.status,
      travelDetails: {
        intendedTravelDates: data.intendedTravelDates,
        purposeOfVisit: data.purposeOfVisit,
        travelItinerary: data.travelItinerary,
      },
      financialInfo: {
        annualIncome: data.annualIncome,
        bankStatements: data.bankStatements,
      },
      healthInfo: {
        medicalHistory: data.medicalHistory,
        currentMedications: data.currentMedications,
        allergies: data.currentMedications,
      },
      biometricInfo: {
        fingerprintData: data.fingerprintData,
        facialRecognitionData: data.facialRecognitionData,
      },
      documentUpload: {
        passportCopy: data.passportCopy,  // Adjust the data type as needed
      },
      imageUpload: {
        passportPhoto: data.passportPhoto,  // Adjust the data type as needed
        otherImages: data.personalnfo,  // Adjust the data type as needed
      },
    };

    return flattenedData;
  };

  

  const handleSubmit = async () => {
    const flattenedData = flattenData(values);

    try {
      const response = await axios.post(`${API_URL}/visa/${id}`, flattenedData);
      console.log('Visa application submitted successfully:', response.data);
      alert('Visa submitted successfully!');
      console.log("flattenedData here!",flattenedData)
    } catch (error) {
      console.error('Error submitting visa application:', error);
      alert('Failed to submit visa.');
    }
  };



  return (
    <Container component={Paper} elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Visa Application Form {values.fullName}
      </Typography>
      <Button>
        Click me
      </Button>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Full Name"
            variant="outlined"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          {/* Add other inputs */}
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Date of Birth"
            variant="outlined"
            name="dateOfBirth"
            value={values.dateOfBirth}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          {/* Add other inputs */}
        </Grid>
        
        {/* Add more Grid items for other inputs */}

        <Grid item xs={6}>
  <TextField
    label="Passport Number"
    variant="outlined"
    name="passportNumber"
    value={values.passportNumber}
    onChange={handleChange}
    fullWidth
    margin="normal"
  />
  {/* Add other inputs */}
</Grid>

<Grid item xs={6}>
<TextField
        className="input-field"
        select
        label="Visa Type"
        variant="outlined"
        name="visaType"
        value={values?.visaType}
        onChange={handleChange}
        style={{ width: '300px', marginBottom: '16px' }}
        InputProps={{ style: { borderRadius: '15px' } }}
      >
        {visaTypes.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
  {/* Add other inputs */}
</Grid>

<Grid item xs={6}>
  <TextField
    label="Status"
    variant="outlined"
    name="status"
    value={values.status}
    onChange={handleChange}
    fullWidth
    margin="normal"
  />
  {/* Add other inputs */}
</Grid>

        
      </Grid>

      
      <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '20px' }}>
        Submit
      </Button>
    </Container>
  );
};

export default VisaSignUpEditForm;

