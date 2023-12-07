import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { createTheme , ThemeProvider} from '@mui/material/styles';


import {
  AppBar,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Drawer,
  Tab,
  Tabs,
  Box,
  CardActions,
  Hidden,
  Icon,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FlightIcon from '@mui/icons-material/Flight';

import './home.css';
import Footer from '../components/ui/footer';


const eVisaCards = [
  {
    title: 'Who needs a visa to come to Kenya?',
    description: 'Know if you meet the requirements to come to Kenya',
    imageUrl: "https://meshackariri.sirv.com/WhatsApp%20Image%202023-12-04%20at%2013.40.25.jpeg"
  },
  {
    title: 'Documents Required',
    description: 'Learn about the necessary documents and requirements for your eVisa application.',
    imageUrl: "https://meshackariri.sirv.com/visa2"
  },
  {
    title: 'Check Visa Status',
    description: 'Track the status of your eVisa application and stay informed.',
    imageUrl:"https://meshackariri.sirv.com/visa3.jpeg"
  },
];

const VisaCard = ({ title, description, imageUrl }) => {
  const cardStyle = {
    background: `url(${imageUrl}) center/cover no-repeat`,
    minHeight: 300, // Adjust the height as needed
    position: 'relative',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fffff'
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Adjust the alpha value for transparency
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={cardStyle}>
        <div style={overlayStyle}></div>
        <CardContent>
        <div style={{ position: 'relative', zIndex: 9999 , backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
          <Typography variant="h6" align="center"    color='white' fontWeight='bold'  sx={{ fontFamily: 'Quicksand, sans-serif', fontWeight: 'bold', zIndex: 9999, textDecoration: 'underline' }}>
            {title}
          </Typography>
  <Typography align="center"  sx={{ fontFamily: 'Roboto, sans-serif', color: 'white' }}>
    {description}
  </Typography>
</div>
        </CardContent>
        <CardActions>
          <Button size="small" variant='contained' color="primary" component={Link} to="/faq">
            Read More
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

const theme = createTheme({
  palette: {
    ochre: {
      main: '#ffff',
      light: '#ffff',
      dark: '#ffff',
      contrastText: '#ffff',
    },
  },
});



const Home = () => {
  const countries = {
    us: 'United States',
    ca: 'Canada',
    uk: 'United Kingdom',
    ug: 'Uganda',
    ke: 'Kenya',
    // Add more countries here
  };

  const [selectedCountry, setSelectedCountry] = React.useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const visaTypes = ['Tourist Visa', 'Transit Visa', 'Single Entry Visa', 'East Africa Tourist Visa', 'Referred Visa'];
  const navigate = useNavigate();
  const [selectedVisaType, setSelectedVisaType] = useState(null);





  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleVisaTypeSelect = (type) => {
    setSelectedVisaType(type);
    handleCloseDialog();
    // Redirect to the visa application form page with the selected visa type as a parameter
    navigate(`/create-visa?type=${type}`);
  };

    
  const uniqueTitle = "Unleash Your Global Adventures";

  return (
    <ThemeProvider theme={theme}>

    <div>

            {/* Add the following Grid for small screens only */}

<Hidden mdUp>

  <Grid
    container
    sx={{
      width:'100%',
      background: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(https://meshackariri.sirv.com/pexels-juan-riofrio-7262106.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      color: 'white', // Set the text color to white
      position: 'relative', // Make it a positioned container
    }}
  >
    <div
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(1, 2, 3, 1.0)', // Add a semi-transparent black overlay
      }}
    />
    <Grid item xs={12}>
  
    <Typography
  variant="h2"
  sx={{
    fontWeight: 'bold',
    backgroundImage:
      'linear-gradient(90deg, #000000, #000000 25%, #D40E0E 25%, #D40E0E 50%, #078930 50%, #078930 75%, #ffffff 75%, #ffffff 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  }}
>
  Kenya
</Typography>

      <Typography variant="h4" color="#E9DB5D" sx={{ fontWeight: 'bold', color: 'ochre', fontFamily:'Quicksand, sans-serif', fontSize:'50px' }}>
        Electronic Visa
      </Typography>

      <Typography variant="body2" p={2} sx={{fontFamily: 'Roboto, sans-serif'}}>
        Simplify your travel plans with our streamlined eVisa service. Your passport to hassle-free journeys. An eVisa (Electronic Visa) is a digital version of a traditional visa that allows travelers to apply for and obtain a visa online, eliminating the need for physical paperwork and long processing times.
      </Typography>

      <Typography variant="body2" p={2} sx={{fontFamily: 'Roboto, sans-serif'}}>
        Apply for your kenyan evisa here in quick simple steps. Safely, anywhere, and everytime.
      </Typography>

      <Grid>
        <Button
          variant="outlined"
          color='ochre'
          style={{ marginTop: '20px' }}
          onClick={handleOpenDialog}
        >
          Apply for E-Visa
        </Button>
      </Grid>
    </Grid>
  </Grid>
</Hidden>

      <Container maxWidth="100%" sx={{ height: 'auto',        background: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(https://meshackariri.sirv.com/pexels-juan-riofrio-7262106.jpg)',backgroundSize: 'cover',
 marginTop:"50px" ,marginBottom:"auto", display: { xs: 'none', md: 'block'} }}>
        <Grid container spacing={3} sx={{alignItems: 'center' }}>
          <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>

          <Typography

  variant="h2"
  sx={{
    fontWeight: 'bold',
    backgroundImage:
      'linear-gradient(90deg, #000000, #000000 5%, #D40E0E 15%, #D40E0E 70%, #078930 60%, #078930 75%, #ffffff 75%, #ffffff 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',}}
  
>
  Kenya
</Typography>
           
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white', fontFamily:'Quicksand, sans-serif', fontSize:'50px' }}>
        Electronic Visa
      </Typography>
      <Typography variant="body8" sx={{fontFamily: 'Roboto, sans-serif', color:'white'}}>
        Simplify your travel plans with our streamlined eVisa service. Your passport to hassle-free journeys.
      </Typography>

          </Grid>
          <Grid item xs={12} md={6 } >
            <div sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Card sx={{ maxWidth: '100%', backgroundColor: 'rgba(255, 255, 255, 0.8)' , display: { xs: 'none', md: 'block' } }}>
                <CardContent>
                  <Typography variant="h5"sx={{
  fontFamily: 'Quicksand, sans-serif',
  fontWeight: 'bold',
  color: 'black', // You can replace 'primary.main' with the color you prefer
  textAlign: 'center', // Center-align the text
  marginTop: '10px', // Add some top margin for spacing
}}>Apply for fast, reliable visas to Kenya</Typography>
                </CardContent>
                <CardContent>
                  <Typography  style={{ fontFamily: 'Roboto, sans-serif', color: 'rgba(0, 0, 0, 0.87)' }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fermentum erat sit amet justo efficitur,
                    eget egestas nisl sollicitudin.
                  </Typography>
                </CardContent>
                {/* Tab group section */}
      <Box sx={{ marginTop: 4 }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
        
          <Tab label="E-Visa" />
        </Tabs>
        {selectedTab === 0 && <TabPanel>
    <div style={{ textAlign: 'center' }}>

      <Typography >
        An eVisa (Electronic Visa) is a digital version of a traditional visa that allows travelers to apply for and
        obtain a visa online, eliminating the need for physical paperwork and long processing times.
      </Typography>
      <Button
          variant="contained"
          color='primary'
  style={{ marginTop: '20px' }}
  onClick={handleOpenDialog}
>
  Apply for E-Visa
</Button>

<Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Select a Visa Type</DialogTitle>
        <DialogContent>
          {visaTypes.map((type) => (
            <Button
              key={type}
              variant="outlined"
              fullWidth
              style={{ marginBottom: '10px' }}
              onClick={() => handleVisaTypeSelect(type)}
            >
              {type}
            </Button>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>


    </div>
  </TabPanel>}
          {selectedTab === 1 && (
  <TabPanel>
    <div style={{ textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        What is Visa on Arrival
      </Typography>
      <Typography>
        Visa on Arrival is a digital version of a traditional visa that allows travelers to apply for and
        obtain a visa online, eliminating the need for physical paperwork and long processing times.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: '20px' }}
        component={Link}
        to="/create-visa"
      >
        Apply for VOA
      </Button>
    </div>
  </TabPanel>
)}       
 {selectedTab === 2 && <TabPanel>
    <div style={{ textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        What is Guided VIsa
      </Typography>
      <Typography>
        A Guided Visa is a digital version of a traditional visa that allows travelers to apply for and
        obtain a visa online, eliminating the need for physical paperwork and long processing times.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: '20px' }}
        component={Link}
        to="/create-visa"
      >
        Apply for a guided visa
      </Button>
    </div>
  </TabPanel>}
        {selectedTab === 3 && <TabPanel>
    <div style={{ textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        What is an eVisa?
      </Typography>
      <Typography>
        An eVisa (Electronic Visa) is a digital version of a traditional visa that allows travelers to apply for and
        obtain a visa online, eliminating the need for physical paperwork and long processing times.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: '20px' }}
        component={Link}
        to="/create-visa"
      >
        Apply Now
      </Button>
    </div>
  </TabPanel>}
      </Box>
              </Card>
            </div>
          </Grid>
        </Grid>
      </Container>
      <Grid container spacing={3} mb={3}>

      {eVisaCards.map((card, index) => (
  <VisaCard key={index} title={card.title} description={card.description} imageUrl={card.imageUrl} />
))}
    </Grid>

    
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
      </Typography>
      <Grid container spacing={3}>
        <Hidden smDown>
          <Grid item md={4}>
            {/* Left Container (disappears on small screens) */}
            <Typography variant="h4" color='primary' sx={{ fontWeight: 'bold', fontFamily: 'Quicksand, sans-serif', fontStyle:'italic' }}>EVISA</Typography>



          </Grid>
        </Hidden>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" color='primary' sx={{ fontWeight: 'bold', fontFamily: 'Quicksand, sans-serif' }}>About Us</Typography>
          <Typography p={2} variant='body2' sx={{fontFamily: 'Roboto, sans-serif'}}>
          Kenya Evisa is your dedicated partner, providing a seamless and reliable solution for visa processing. Our global presence ensures accessibility and convenience for applicants worldwide. With a commitment to excellence, we strive to make the visa application process stress-free and efficient. Trust Kenya Evisa for your travel document needs and experience a journey of unparalleled ease.
          </Typography>
          <Button component={Link}to="/about" size="small" color="primary">
          Read More
        </Button>
        </Grid>
      </Grid>
    </Container>



  


      {/* Menu Drawer    */}

    </div>
    </ThemeProvider>

  );
};

function TabPanel(props) {
  const { children, value, index } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>{children}</Box>
      )}
    </div>
  );
}

export default Home;
