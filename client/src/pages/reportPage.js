// Import necessary components
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HouseIcon from '@mui/icons-material/House';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { useParams } from 'react-router-dom';
const ReportPage = () => {
  const { visaId } = useParams();
  const [visaData, setVisaData] = useState(null);
  const [firstVisaData, setFirstVisaData] = useState(null);
  const [userDocuments, setUserDocuments] = useState([]);

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

      // Fetch user's documents based on email
      const fetchUserDocuments = async () => {
        try {
          const response = await axios.get(`https://kenyaevisa.mytests.online/api/files`);
          // Filter documents based on user's email
          const userFiles = response.data.filter(file => file.user === visaData[0].personalInfo.email);
          setUserDocuments(userFiles);
        } catch (error) {
          console.error('Error fetching user documents:', error);
        }
      };

      fetchUserDocuments();
    }
  }, [visaData]);

  const handleCardClick = (filename) => {
    // Implement logic to show the document in a modal or a separate page
    window.open(`https://kenyaevisa.mytests.online/api/files/${encodeURIComponent(filename)}`, '_blank');
  };

    // Function to format document names
    const formatDocumentName = (fieldName) => {
      // Replace camelCase with space-separated words and capitalize first letter
      return fieldName.replace(/([a-z])([A-Z])/g, '$1 $2').charAt(0).toUpperCase() + fieldName.slice(1).replace(/[A-Z]/g, ' $&');
    };

    const formatCreatedAtDate = (createdAt) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
      return new Intl.DateTimeFormat('en-US', options).format(new Date(createdAt));
    };
    
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '90vh', padding: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <AccountCircleIcon style={{ fontSize: '36px', color: 'black', marginRight: '8px' }} />
        <Typography variant="h6">{firstVisaData?.personalInfo?.fullName}</Typography>
      </div>

      {firstVisaData ? (
        <Paper elevation={3} style={{ padding: '16px', marginTop: '16px' }}>
          {/* Visa Status and Processing Type Section */}
          <div style={{ marginBottom: '16px' }}>
          <Typography variant="h7" style={{ fontWeight: 'bold', fontSize: '32px', color: '#3f51b5' }}>
            {firstVisaData.visaType}
            </Typography>
            <Divider/>
            <Typography>
  <strong>Created:</strong> {formatCreatedAtDate(firstVisaData.createdAt)}
</Typography>
<Divider/>
            <Typography variant="h7" gutterBottom style={{ fontWeight: 'bold', fontSize: '12', fontFamily:'Quicksand' }}>
              Status: {firstVisaData.status}
            </Typography>
            <br />
            <Typography variant="h7" gutterBottom style={{ fontWeight: 'bold', fontSize: '12', fontFamily:'Quicksand' }}>
              Processing Type: {firstVisaData.processingOption}
            </Typography>
            <br />
            <Typography variant="h7" gutterBottom style={{ fontWeight: 'bold', fontSize: '12', fontFamily:'Quicksand' }}>
              Reason for Entry: {firstVisaData.documentDetails?.reasonForEntry}
            </Typography>

          </div>

          <Divider />

          {/* Personal Information Section */}
          <div style={{ marginTop: '16px' }}>
            <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
              Personal Information
            </Typography>
            <Divider />

            <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                  Full Name:
                </Typography>
                <Typography>{firstVisaData.personalInfo.fullName}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                  Surname:
                </Typography>
                <Typography>{firstVisaData.personalInfo.surname}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                  Gender:
                </Typography>
                <Typography>{firstVisaData.personalInfo.gender}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                  Date of Birth:
                </Typography>
                <Typography>{firstVisaData.personalInfo.dateOfBirth}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                  Address:
                </Typography>
                <Typography>{firstVisaData.personalInfo.physicalAddress}</Typography>
              </Grid>
              {/* Add more rows as needed */}
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                  Country of residence:
                </Typography>
                <Typography>{firstVisaData.personalInfo.countryOfResidence}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                  Present nationality:
                </Typography>
                <Typography>{firstVisaData.personalInfo.presentNationality}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                  Nationality at birth:
                </Typography>
                <Typography>{firstVisaData.personalInfo.nationalityAtBirth}</Typography>
              </Grid>
              {/* Add more rows as needed */}
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                  Phone number:
                </Typography>
                <Typography>{firstVisaData.personalInfo.phoneNumber}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                  Email:
                </Typography>
                <Typography>{firstVisaData.personalInfo.email}</Typography>
              </Grid>
              {/* Add more rows as needed */}
            </Grid>
          </div>

          <Divider/>


          {/* Document Information Section */}
          <div style={{ marginTop: '16px' }}>
            <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
              Document Information
            </Typography>
            <Divider />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                  Passport Number:
                </Typography>
                <Typography>{firstVisaData.documentDetails?.passportNumber}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                  Issued By:
                </Typography>
                <Typography>{firstVisaData.documentDetails?.issuedBy}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                  Date of Issue:
                </Typography>
                <Typography>{firstVisaData.documentDetails?.dateOfIssue}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                  Expiry Date:
                </Typography>
                <Typography>{firstVisaData.documentDetails?.expiryDate}</Typography>
              </Grid>
              {/* Add more rows as needed */}
            </Grid>
          </div>

          {/* Documents Section */}
          <Typography variant="h6" gutterBottom style={{ marginTop: '16px', fontWeight:'bold' }}>
            Documents
          </Typography>
          <Divider />
          <Grid container spacing={2}>
            {userDocuments.map((document, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper elevation={2} style={{ padding: '8px', textAlign: 'center', cursor: 'pointer', width: 'auto' }} onClick={() => handleCardClick(document.filename)}>
                  {document.filetype.startsWith('image/') ? (
                    <img
                      src={`https://kenyaevisa.mytests.online/api/files/${encodeURIComponent(document.filename)}`}
                      alt={document.originalname}
                      style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '4px' }}
                    />
                  ) : (
                    <DescriptionIcon style={{ fontSize: '48px', color: '#3f51b5' }} />
                  )}
                  <Typography variant="caption" style={{ marginTop: '8px' }}>
                    {formatDocumentName(document.fieldName)}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ReportPage;
