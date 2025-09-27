import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        height: '4rem', // h-16
        backgroundColor: 'background.paper',
        boxShadow: '0 -2px 8px 0 rgba(0,0,0,0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        color: 'text.secondary',
        flexShrink: 0,
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} LuxeBook. All Rights Reserved.
        <span className="hidden sm:inline"> | Powered by <strong>BluePal</strong>.</span>
      </Typography>

      <Box>
        <IconButton href="https://facebook.com" target="_blank" aria-label="Facebook" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
          <FacebookIcon />
        </IconButton>
        <IconButton href="https://twitter.com" target="_blank" aria-label="Twitter" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
          <TwitterIcon />
        </IconButton>
        <IconButton href="https://instagram.com" target="_blank" aria-label="Instagram" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
          <InstagramIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;