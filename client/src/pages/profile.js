import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { clearUserData, setUserData } from '../actions/userActions';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { ROUTES } from '../constants/constants';
import { useNavigate } from 'react-router-dom';
import VisaCard from '../components/ui/visaCard';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography'; // Import Typography component
import './profile.css'; // Import the CSS file for styling

const ProfilePage = ({ userData }) => {
  const [visas, setVisas] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchVisas = async () => {
    setLoading(true);
    try {
      const userId = userData?._id;
      const response = await axios.get(`http://localhost:5000/api/visas/${userId}`);
      setVisas(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching visas:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisas();

    const handleOnline = () => {
      fetchVisas();
    };

    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, [userData]);

  const handleClearData = () => {
    try {
      clearUserData();
      navigate(ROUTES.SIGN_UP);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateVisa = () => {
    try {
      navigate(ROUTES.CREATE_VISA);
    } catch (error) {
      console.log(error);
    }
  };

  if (!userData) {
    return  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </div>
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <AccountCircleIcon className="profile-icon" style={{ fontSize: 50 }} />
          <div style={{ marginLeft: 8 }}>
            <Typography variant="h6" style={{ fontSize: 16 }}>{userData.email}</Typography>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
          <Button variant="outlined" onClick={handleClearData} style={{ fontSize: 12 }}>
            Sign Out
          </Button>
        </div>
        </div>

      </div>
      <div style={{ marginLeft: 0 }}>
        <Typography variant="h5">Hello, welcome!</Typography>
      </div>

      <div className="profile-info">
        <div>
        <Typography variant="h7">You can use this profile page to view your previous visa applications and create a new application.</Typography>
{/**
 * 
 *           <h3>Your Profile Information:</h3>
          <p>Email: {userData?.email || 'N/A'}</p>
          <p>id: {userData?._id || 'N/A'}</p>
 * 
 */}

        </div>
      </div>
      <div className="visas-section">
        <Typography variant="h6" style={{ marginBottom: 16, borderBottom: '2px solid #ccc', paddingBottom: 8 }}>
          Your Visa Applications:
        </Typography>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
          </div>
        ) : (
          <div>
            {visas.slice().reverse().map((visa) => (
              <VisaCard key={visa._id} visa={visa} className="visa-card" />
            ))}
          </div>
        )}
      </div>

      <div className="profile-options">
        <Button onClick={handleCreateVisa} variant="contained" className="btn-create-visa">
          Create New Visa
        </Button>
      </div>
    </div>  );
};


const mapStateToProps = (state) => ({
  userData: state.user.userData,
});

const mapDispatchToProps = (dispatch) => ({
  setUserData: () => dispatch(setUserData()),
  clearUserData,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
