import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HouseIcon from '@mui/icons-material/House';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';

const ReportPage = () => {
  const { visaId } = useParams();
  const [visaData, setVisaData] = useState(null);
  const [firstVisaData, setFirstVisaData] = useState(null);

  useEffect(() => {
    // Fetch visa data based on the visaId
    const fetchVisaData = async () => {
      try {
        const response = await axios.get(`https://kenyaevisa.mytests.online/api/visas/visa/${visaId}`);
        setVisaData(response.data);
      } catch (error) {
        console.error('Error fetching visa data:', visaId);
      }
    };

    fetchVisaData();
  }, [visaId]);

  useEffect(() => {
    if (visaData) {
      setFirstVisaData(visaData[0]);
    }
  }, [visaData]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '90vh', padding: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <AccountCircleIcon style={{ fontSize: '36px', color: 'black', marginRight: '8px' }} />
        <Typography variant="h6">{firstVisaData?.personalInfo?.fullName}</Typography>
      </div>

      {firstVisaData ? (
        <Paper elevation={3} style={{ padding: '16px', marginTop: '16px' }}>
          <Typography variant="h5" gutterBottom>
          {firstVisaData.personalInfo?.surname}'s Visa Application
          </Typography>
          <Divider />

          {/* Personal Information Section */}
          <div style={{ marginTop: '16px' }}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Divider />
            <Typography>
              <CalendarTodayIcon style={{ marginRight: '8px' }} />
              Date of Birth: {firstVisaData.personalInfo?.dateOfBirth}
            </Typography>
            <Typography>
              <HouseIcon style={{ marginRight: '8px' }} />
              Address: {firstVisaData.personalInfo?.physicalAddress}
            </Typography>
          </div>

          {/* Document Information Section */}
          <div style={{ marginTop: '16px' }}>
            <Typography variant="h6" gutterBottom>
              Document Information
            </Typography>
            <Divider />
            <Typography>
              <CardTravelIcon style={{ marginRight: '8px' }} />
              Passport Number: {firstVisaData.documentDetails?.passportNumber}
            </Typography>
            <Typography>
              <WorkOutlineIcon style={{ marginRight: '8px' }} />
              Issued By: {firstVisaData.documentDetails?.issuedBy}
            </Typography>
          </div>
        </Paper>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ReportPage;
