import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'FAQs', path: '/faq' },
];

const ReusableAppBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const location = useLocation(); // Get the current route location

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenuItems = menuItems.map((item, index) => (
    <MenuItem
      key={index}
      component={Link}
      to={item.path}
      onClick={handleMenuClose}
      style={{
        background:
          location.pathname === item.path ? (isSmallScreen ? 'grey' : 'grey') : 'transparent',
        color: location.pathname === item.path ? 'black' : 'black',
      }}
    >
      {item.label}
    </MenuItem>
  ));

  return (
    <AppBar position="fixed" style={{ background: 'black', zIndex: 9999 }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white', ffontFamily: 'Quicksand, sans-serif' }}>
            KenyaEvisa
          </Link>
        </Typography>
        {isSmallScreen ? (
          <div>
            <IconButton
              edge="end"
              color="inherit"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenuClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {renderMenuItems}
            </Menu>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '20px' }}>
            {menuItems.map((item, index) => (
              <Typography
                key={index}
                component={Link}
                to={item.path}
                style={{
                  textDecoration: 'none',
                  color: location.pathname === item.path ? (isSmallScreen? 'black': 'yellow') :'white',
                  background:
                    location.pathname === item.path ? (isSmallScreen ? 'black' : '') : 'transparent',
                }}
              >
                {item.label}
              </Typography>
            ))}
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default ReusableAppBar;
