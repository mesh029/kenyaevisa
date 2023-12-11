import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import ScrollToTopOnMount from '../components/hoc/scrollToTop';


const AboutUs = () => {
  return (
    <Container maxWidth="lg" style={{ marginTop: '80px' }}>
      <Typography variant="h5" gutterBottom style={{ textAlign: 'center', fontFamily: 'Quicksand, sans-serif', color: '#1976D2', fontWeight: 'bold' }}>
        Welcome to Kenya Evisa
      </Typography>

      <Typography variant="body1" paragraph style={{ fontFamily: 'Roboto, sans-serif', color: 'rgba(0, 0, 0, 0.87)' }}>
        We are your trusted partner for seamless visa processing. With a global presence, Kenya Evisa offers a stress-free and reliable solution for visa applications.
      </Typography>

      <Typography variant="h6" gutterBottom id="mission" style={{ fontFamily: 'Roboto, sans-serif' }}>
        Our Mission
      </Typography>
      <Typography variant="body1" paragraph style={{ fontFamily: 'Roboto, sans-serif', color: 'rgba(0, 0, 0, 0.87)' }}>
        At Kenya Evisa, we are committed to ensuring data integrity and providing exceptional service to our clients. We understand that your journey starts with obtaining a visa, and we are here to make that journey smooth and enjoyable.
      </Typography>

      <Typography variant="h6" gutterBottom id="mission" style={{ fontFamily: 'Roboto, sans-serif' }}>
        Why Choose Kenya Evisa?
      </Typography>
      <Typography variant="body1" paragraph style={{ fontFamily: 'Roboto, sans-serif', color: 'rgba(0, 0, 0, 0.87)' }}>
        Choosing Kenya Evisa means choosing excellence. We stand out in the crowd for:
      </Typography>
      <ul style={{ fontFamily: 'Roboto, sans-serif', color: 'rgba(0, 0, 0, 0.87)' }}>
        <li>
          Data Integrity: Ensuring your personal information is protected and secure. Our cutting-edge security protocols and strict data privacy measures keep your sensitive data safe.
        </li>
        <li>
          Customer-Centric Approach: Your satisfaction is our priority. We are dedicated to delivering the highest standard of customer service, listening to your needs, and providing personalized solutions.
        </li>
        <li>
          Global Reach: Serving clients from all around the world. Kenya Evisa is your global partner for visa services. We assist travelers from various countries with their visa needs.
        </li>
        <li>
          Competitive Visa Processing Times: Swift and efficient visa processing services. We understand that time is of the essence for travelers. We offer some of the most competitive visa processing times in the industry.
        </li>
        <li>
          Customized Visa Solutions: Tailored visa solutions to suit your travel needs. We recognize that every traveler is unique, and we offer customized visa solutions that cater to your specific requirements.
        </li>
      </ul>

      <Typography variant="h6" gutterBottom id="mission" style={{ fontFamily: 'Roboto, sans-serif' }}>
        Our Team
      </Typography>
      <Typography variant="body1" paragraph style={{ fontFamily: 'Roboto, sans-serif', color: 'rgba(0, 0, 0, 0.87)' }}>
        Our dedicated team is the backbone of Kenya Evisa. Meet some of our key team members:
      </Typography>
      <div style={{ display: 'flex', fontFamily: 'Roboto, sans-serif', color: 'rgba(0, 0, 0, 0.87)' }}>
        <div style={{ margin: '20px' }}>
          <img src="john-doe.jpg" alt="John Doe" style={{ width: '120px', height: '120px' }} />
          <Typography variant="body2">Visa Processing Expert</Typography>
        </div>
        <div style={{ margin: '20px' }}>
          <img src="jane-smith.jpg" alt="Jane Smith" style={{ width: '120px', height: '120px' }} />
          <Typography variant="body2">Customer Relations Specialist</Typography>
        </div>
      </div>

      <Typography variant="h6" gutterBottom id="mission" style={{ fontFamily: 'Roboto, sans-serif' }}>
        Contact Kenya Evisa
      </Typography>
      <Typography variant="body1" paragraph style={{ fontFamily: 'Roboto, sans-serif', color: 'rgba(0, 0, 0, 0.87)' }}>
        We value your opinion and are here to assist you. Feel free to reach out:
      </Typography>
      <Typography variant="body2" paragraph style={{ fontFamily: 'Roboto, sans-serif', color: 'rgba(0, 0, 0, 0.87)' }}>
        Email: info@kenyaevisa.com
      </Typography>
      <Typography variant="body2" style={{ fontFamily: 'Roboto, sans-serif', color: 'rgba(0, 0, 0, 0.87)' }}>
        Phone: +254 79753 3453 
      </Typography>
    </Container>
  );
};

export default ScrollToTopOnMount(AboutUs);
