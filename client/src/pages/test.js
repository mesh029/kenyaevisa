import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Step1 from '../components/forms/visaForm/step1';
import Step2 from '../components/forms/visaForm/step2';
import Step3 from '../components/forms/visaForm/step3';
import '../components/forms/visaForm/styles.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

const API_URL = 'http://localhost:5000/api/visas';
const steps = ['Add personal Information', 'Upload some Images', 'Upload your documents'];

function VisaSignUpForm() {
  const userData = useSelector((state) => state.user.userData);

  const [step, setStep] = useState(1);
  const [values, setValues] = useState({
    fullName: userData?.name || '',
    dateOfBirth: '',
    passportNumber: '',
    passportCopy: null,
    otherImages: [],
    passportPhoto: '',
  });

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setStep((prevStep) => prevStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setStep((prevStep) => prevStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
    setStep(1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 nextStep={handleNext} handleChange={handleChange} values={values} />;
      case 2:
        return <Step2 nextStep={handleNext} prevStep={handleBack} handleChange={handleChange} values={values} />;
      case 3:
        return <Step3 prevStep={handleBack} handleChange={handleChange} values={values} />;
      default:
        return null;
    }
  };

  const calculateProgress = () => {
    return ((step - 1) / 3) * 100;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async () => {
    const flattenedData = flattenData(values);

    try {
      const response = await axios.post('http://localhost:5000/api/visas', flattenedData);
      console.log('Visa application submitted successfully:', response.data);
      console.log('data:', flattenedData);

      alert('Visa submitted successfully!');

      setValues({
        fullName: '',
        dateOfBirth: '',
        passportNumber: '',
        nationality: '',
        gender: '',
        passportPhoto: '',
        otherImages: [],
        passportCopy: '',
      });
      setStep(1);
      setActiveStep(0);
    } catch (error) {
      console.error('Error submitting visa application:', error);
      console.log('flattened data!!!!', flattenedData);
    }
  };

  const flattenData = (data) => {
    const flattenedData = {
      personalInfo: {
        fullName: data.fullName,
        dateOfBirth: data.dateOfBirth,
        passportNumber: data.passportNumber,
      },
      imageUpload: {
        passportPhoto: data.passportPhoto,
        otherImages: data.otherImages,
      },
      documentUpload: {
        passportCopy: data.passportCopy,
      },
    };

    return flattenedData;
  };

  return (
    <>
      <p>{JSON.stringify(userData)}</p>
      <div className="form-container">
        <Box sx={{ width: '100%', alignSelf: 'center' }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepOptional(index)) {
                labelProps.optional = <Typography variant="caption">Optional</Typography>;
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you're finished</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button variant="contained" onClick={handleSubmit}>
                  Submit
                </Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {renderStep()}
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )}
                <Button onClick={handleNext} type="submit">
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </div>
    </>
  );
}

export default VisaSignUpForm;
