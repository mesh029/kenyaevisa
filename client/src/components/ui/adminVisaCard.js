import React from 'react';
import { CardActions, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VisaCard from './visaCard';
const AdminVisaCard = ({ visa }) => {
  const navigate = useNavigate();

  const handleViewReport = () => {
    // Navigate to the user report page
    // Pass the visa information to the report page
    navigate(`/report/${visa._id}`);
  };

  return (
    <>
        <VisaCard visa={visa}>

    </VisaCard>

    </>

  );
};

export default AdminVisaCard;
