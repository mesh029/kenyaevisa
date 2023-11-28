import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ROUTES } from '../../constants/constants';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios';
import './visaCard.css'




const VisaCard = ({visa }) => {


  const navigate = useNavigate();

  // Assuming 'visa' is an object containing visa details
  if (!visa) {
    return null;

  }
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
  } = visa;

  const {
    fullName,
    dateOfBirth,
    passportNumber,
  } = personalInfo || {};
 

  const displayNA = (value) => (value || 'N/A');



  const handleEditVisa = () => {
    // Redirect to the VisaSignUpForm for editing the visa
    navigate(`${ROUTES.VISA_SIGN_UP_EDIT}/edit/${visa._id}`);
  };

  const handleDeleteVisa = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this visa?');
  
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/visas/visa/${visa._id}`);
        alert('Visa deleted successfully!');
        window.location.reload(); // Refresh the page
      } catch (error) {
        console.error('Error deleting visa:', error);
        alert('Failed to delete visa.');
      }
    }
  };
  


  return (
    <Card>
    <CardContent>
      <Typography variant="h6">Visa Application for: {fullName || 'N/A'}</Typography>
      <Typography variant="body1">Passport Number: {passportNumber || 'N/A'}</Typography>
      <Typography variant="body1">Visa Type: {visaType || 'N/A'}</Typography>
      <Typography variant="body1">Status: {status || 'N/A'}</Typography>
    </CardContent>
    <div className="actions">
      <IconButton color="primary" onClick={handleEditVisa}>
        <EditIcon />
      </IconButton>
      <IconButton color="secondary" onClick={handleDeleteVisa}>
        <DeleteOutlineIcon />
      </IconButton>
    </div>
  </Card>
  );
};

export default VisaCard;
