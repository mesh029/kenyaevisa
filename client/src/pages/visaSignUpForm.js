import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {setUserData } from '../actions/userActions';

import Step1 from '../components/forms/visaForm/step1';
import Step2 from '../components/forms/visaForm/step2';
import Step3 from '../components/forms/visaForm/step3';
import Step4 from '../components/forms/visaForm/step4';
import Step0 from '../components/forms/visaForm/step0';
import { useNavigate } from 'react-router-dom';

import Footer from '../components/ui/footer';
import { AppBar, Checkbox, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

import { useLocation } from 'react-router-dom'; // Import useLocation


const API_URL = 'http://localhost:2000/api/visas'; // Adjust the URL
const steps = ['Step 1', 'Step 2', 'Step 3', 'step 4', 'step5']; // Adjust step labels accordingly

const VisaSignUpForm = () => {

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search);
  const selectedVisaType = queryParams.get('type');

  const [agreeChecked, setAgreeChecked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const userData = useSelector((state) => state.user.userData);
  const navigate = useNavigate();


  //cards

  const [processingOption, setProcessingOption] = useState('');

  // ... existing code ...

  const handleCardClick = (option) => {
    setProcessingOption(option);
  };
  
  useEffect(() => {
    // This will run whenever processingOption changes
    if (processingOption !== '') {
      console.log('Processing option', processingOption);
      handleNext();
    }
  }, [processingOption]);

  const [activeStep, setActiveStep] = useState(0);


  const [values, setValues] = useState(() => {
    return JSON.parse(localStorage.getItem('visaFormValues')) || {
      fullName: '',  // Add other personal information fields as needed
      dateOfBirth: '',
      surname: '',
      gender: '',
      countryOfResidence: '',
      presentNationality: '',
      nationalityAtBirth: '',
      physicalAddress: '',
      email: '',
      phoneNumber: '',
      passportNumber: '',      
    visaType: '',
    status: 'pending',
    processingOption: '',
    placeOfIssue: '',
    dateOfIssue: '',
    expiryDate: '',
    issuedBy: '',
    reasonForEntry: '',
      passportBiodata: '',
      passportFrontCover: '',
      travelItinerary: '',
      returnTicket: '',
    };
  });


    // Update local storage whenever values change
    useEffect(() => {
      localStorage.setItem('visaFormValues', JSON.stringify(values));
    }, [values]);
  


  /*
  
  const [values, setValues] = useState({
    personalnfo:{
      fullName: unflattenedData.fullName,  // Add other personal information fields as needed
      dateOfBirth: unflattenedData.dateOfBirth,
    },
    visaType: unflattenedData.visaType,
    status: unflattenedData.status,
    travelDetails: {
      intendedTravelDates: unflattenedData.intendedTravelDates,
      purposeOfVisit: unflattenedData.purposeOfVisit,
      travelItinerary: unflattenedData.travelItinerary,
    },
    financialInfo: {
      annualIncome: unflattenedData.annualIncome,
      bankStatements: unflattenedData.bankStatements,
    },
    healthInfo: {
      medicalHistory: unflattenedData.medicalHistory,
      currentMedications: unflattenedData.currentMedications,
      allergies: unflattenedData.currentMedications,
    },
    biometricInfo: {
      fingerprintData: unflattenedData.fingerprintData,
      facialRecognitionData: unflattenedData.facialRecognitionData,
    },
    documentUpload: {
      passportCopy: unflattenedData.passportCopy,  // Adjust the data type as needed
    },
    imageUpload: {
      passportPhoto: unflattenedData.passportPhoto,  // Adjust the data type as needed
      otherImages: unflattenedData.personalnfo,  // Adjust the data type as needed
    },
  });
   

*/ 

useEffect(() => {
  // Validate fields whenever 'values' changes
  validateFields();
}, [values]);



const [validationErrorMessage, setValidationErrorMessage] = useState(''); // Add this line
const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true); // Add this line


const validateStep0 = () => {
  const errors = {};
  return errors;
};

const validateStep1 = () => {
  const errors = {};

  if (!values.fullName) {
    errors.fullName = 'Full name is required';
  }

  if (!values.dateOfBirth) {
    errors.dateOfBirth = 'Date of birth is required';
  }

  if (!values.surname) {
    errors.surname = 'Surname/Family Name is required';
  }

  if (!values.gender) {
    errors.gender = 'Gender is required';
  }

  if (!values.countryOfResidence) {
    errors.countryOfResidence = 'Country of residence is required';
  }

  if (!values.presentNationality) {
    errors.presentNationality = 'Present Nationality is required';
  }

  if (!values.nationalityAtBirth) {
    errors.nationalityAtBirth = 'Nationality at birth is required';
  }

  if (!values.physicalAddress) {
    errors.physicalAddress = 'Physical address is required';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = 'Phone number is required';
  }

  // Add more validation logic as needed for Step 1

  return errors;
};

const validateStep2 = () => {
  const errors = {};

  
  if (!values.passportNumber) {
    errors.passportNumber = 'Passport Number name is required';
  }

  if (!values.placeOfIssue) {
    errors.placeOfIssue= 'Place Of Birthof birth is required';
  }

  if (!values.dateOfIssue) {
    errors.dateOfIssue = 'Date Of Issue Name is required';
  }

  if (!values.expiryDate) {
    errors.expiryDate = 'ExpiryDate is required';
  }

  if (!values.issuedBy) {
    errors.issuedBy = 'issuedByis required';
  }

  if (!values.reasonForEntry) {
    errors.reasonForEntry = 'Reason For Entry  is required';
  }

  return errors;
};

const validateStep3 = () => {
  const errors = {};
  if (!values.passportBioData) {
    errors.passpotBioData = 'Passport Bio Data name is required';
  }

  if (!values.passportFrontCover) {
    errors.passportFrontCover= 'Passport Front Cover is required';
  }

  if (!values.travelItinerary) {
    errors.travelItinerary = 'Travel Itinerary is required';
  }

  if (!values.returnTicket) {
    errors.returnTicket = 'Return Ticket is required';
  }

  return errors;
};

const validateStep4 = () => {
  const errors = {};


  return errors;
};



const validationFunctions = [
  validateStep0,
  validateStep1,
  validateStep2,
  validateStep3,
  validateStep4,
  // Add more validation functions for each step
];

const validateFields = () => {
  const errors = validationFunctions[activeStep]();

  // Check if there are any errors
  const hasErrors = Object.keys(errors).length > 0;

  // Update the disabled state of the "Next" button
  setIsNextButtonDisabled(hasErrors);

  if (hasErrors) {
    setValidationErrorMessage('Please fill out all fields before proceeding.');
  } else {
    setValidationErrorMessage('');
  }

  return errors;
};
  const handleNext = () => {
    const errors = validateFields();

    if (Object.keys(errors).length === 0) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      console.log(values);
    } else {
      console.log('Validation failed. Please fill in all required fields.');
      // Optionally, you can display the errors or handle them in your UI
    }
    console.log(values)
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };


  const getStepContent = (step, handleCardClick) => {
    switch (step) {
      case 0:
        return <Step0 values={values} setValues={setValues} handleChange={handleChange} handleCardClick={handleCardClick} />;

      case 1:
        return <Step1 values={values} setValues={setValues} handleChange={handleChange}/>;
      case 2:
        return <Step2 values={values} setValues={setValues} handleChange={handleChange} />;
      case 3:
        return <Step3 values={values} setValues={setValues} handleChange={handleChange} />;
        case 4:
          return <Step4 values={values} setValues={setValues} handleChange={handleChange} />;

      default:
        return 'Unknown step';
    }
  };


  const flattenData = (data) => {
    const flattenedData = {
      user: userData?._id,
      personalInfo:{
        fullName: data.fullName,  // Add other personal information fields as needed
        dateOfBirth: data.dateOfBirth,
        surname: data.surname,
        gender: data.gender,
        countryOfResidence: data.countryOfResidence,
        presentNationality: data.presentNationality,
        nationalityAtBirth: data.nationalityAtBirth,
        physicalAddress: data.physicalAddress,
        email: data.email,
        phoneNumber: data.phoneNumber,
        processingOption: processingOption,

      },
      visaType: selectedVisaType,
      status: "pending",
      processingOption: processingOption,
      documentDetails: {
        passportNumber: data.passportNumber,
        placeOfIssue: data.placeOfIssue,
        dateOfIssue: data.dateOfIssue,
        expiryDate: data.expiryDate,
        issuedBy: data.issuedBy,
        reasonForEntry: data.reasonForEntry,

      },
      uploads: {
        passportBioData: data.passportBioData,
        passportFrontCover: data.passportFrontCover,
        travelItinerary: data.travelItinerary,
        returnTicket: data.returnTicket,

      },
  
    };

    return flattenedData;
  };

  
  const handleSubmit = async () => {
    const flattenedData = flattenData(values);

    try {
      const response = await axios.post(API_URL, flattenedData);
      console.log('Visa application submitted successfully:', response.data);
      alert('Visa application submitted successfully!');
      console.log("flattenedData here!",flattenedData)
    } catch (error) {
      console.error('Error submitting visa application:', error);
      alert('Failed to submit visa.');
    }
  };


  const handleAgreeCheckboxChange = () => {
    setAgreeChecked(!agreeChecked);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleFinalSubmit = async () => {
    if (agreeChecked) {
      const flattenedData = flattenData(values);

      try {
        const res = await axios.post(API_URL, flattenedData);
        console.log('Visa application submitted successfully:', res.data);
        localStorage.removeItem('visaFormValues');

        alert('Visa submitted successfully!');



        console.log(values)
        navigate('/admin');

      } catch (error) {
        console.error('Error submitting visa application:', error);
        alert('Failed to submit visa.');
        console.log('something went wrong')
      }
      
    } else {
      alert('Please agree to the terms and conditions before submitting.');
      console.log('something went right')

    }
  };
  return (
    < div style={{minHeight: '100vh', marginTop:'80px', justifyContent:'center', alignItems:"center" }}>

<Typography variant='h6' fontWeight="bold" color="primary.main" sx={{ textAlign:'center', padding: '16px', fontFamily: 'Quicksand, sans-serif', color:'primary' }}>
{selectedVisaType} Application Form </Typography>

<Typography variant="body1" mb={3} fontWeight="bold" sx={{ color: 'black', textAlign: 'center', fontFamily: 'Quicksand, sans-serif' }}>
            {processingOption}
            </Typography>
  
      <Box sx={{ width: '100%', marginTop: '20px'}}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
    
      </Box>
      <Box sx={{ marginTop: 4 }}>
        {activeStep === steps.length ? (
          <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you're finished</Typography>
        ) : (
          <Box>
            {getStepContent(activeStep, handleCardClick)}
            {isNextButtonDisabled && (
          <Typography mb={3} sx={{ color: 'black', textAlign: 'center', color: 'red'}}>
            Please fill out all the required (*) fields correctly to continue
          </Typography>
        )}

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>


            {activeStep > 0 && ( 
    <Button
      variant="contained"
      color="primary"
      disabled={activeStep === 0}
      onClick={handleBack}
      sx={{ mr: 1 }}
    >
      Back
    </Button>
  )}
  {activeStep < steps.length - 1 && activeStep > 0 && ( 
    <Button variant="contained" onClick={handleNext} disabled={isNextButtonDisabled} >
      Next
    </Button>
  )}
  {activeStep === steps.length - 1 && (
    <Button variant="contained" onClick={handleDialogOpen}>
      Submit
    </Button>
  )}
        </Box>
         {/* Agreement Dialog */}
         <Dialog open={dialogOpen} onClose={handleDialogClose}>
      <DialogTitle>Visa Agreement</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant="body1" paragraph>
            Please read and agree to the terms and conditions before submitting your visa application.
          </Typography>

          <Typography variant="body1">
            <strong>Visa Processing Site Agreement</strong>
          </Typography>

          <ol>
            <li>
              <Typography variant="body1">
                <strong>Acceptance of Terms:</strong> By accessing or using the Company's visa processing services, the User agrees to comply with and be bound by the terms and conditions outlined in this Agreement.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Data Privacy:</strong> The Company collects and processes personal information provided by the User for the purpose of visa processing. This information may include, but is not limited to, name, contact details, travel history, and other relevant data.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Consent to Data Processing:</strong> The User consents to the Company's collection, processing, and storage of personal information for the sole purpose of visa processing.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Information Usage:</strong> The Company may use the User's contact information to communicate important updates, notifications, and other relevant information regarding the visa application process.
              </Typography>
            </li>
            {/* Add more agreement points as needed */}
          </ol>
        </DialogContentText>
        <FormControlLabel
          control={<Checkbox checked={agreeChecked} onChange={handleAgreeCheckboxChange} />}
          label={<Typography variant="body1">I agree to the visa terms and conditions</Typography>}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleFinalSubmit} color="primary" disabled={!agreeChecked} variant="contained">
          Agree and Submit
        </Button>
      </DialogActions>
    </Dialog>

          </Box>
        )}
      </Box>
    </div>
  );
};

export default VisaSignUpForm;
