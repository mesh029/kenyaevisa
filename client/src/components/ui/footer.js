import React from 'react';
import { Container, Grid, Typography, IconButton, Link } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <Container component="footer" style={{ marginTop: '50px', padding: '20px', backgroundColor: 'black', color: 'white' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{fontFamily: 'Roboto, sans-serif'}}>Connect with us:</Typography>
          <Link href="#" color="inherit">
            <IconButton color="inherit" aria-label="Twitter">
              <TwitterIcon />
            </IconButton>
          </Link>
          <Link href="#" color="inherit">
            <IconButton color="inherit" aria-label="Instagram">
              <InstagramIcon />
            </IconButton>
          </Link>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{fontFamily: 'Roboto, sans-serif'}}>Contact us:</Typography>
          <Typography variant='body1' sx={{fontFamily: 'Roboto, sans-serif'}}>Email: kenyaevisa.com</Typography>
          <Typography variant='body1' sx={{fontFamily: 'Roboto, sans-serif'}}>Phone: +254 7888 99977</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Footer;
