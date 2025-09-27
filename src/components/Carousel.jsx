import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// --- Custom Arrow Components for a Premium Feel ---

const SlickArrow = ({ className, style, onClick, icon, position }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      [position]: '-40px', // Position arrows outside the carousel
      zIndex: 2,
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      '&:hover': {
        backgroundColor: 'white',
      },
      // Hide on smaller screens where they might overlap content
      display: { xs: 'none', md: 'inline-flex' },
    }}
  >
    {icon}
  </IconButton>
);

// --- Carousel Component ---

/**
 * A reusable carousel component for displaying banners, recommendations, etc.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The items to display in the carousel (e.g., Card components).
 * @param {object} [props.settings] - Custom settings for the react-slick slider.
 * @returns {JSX.Element} The rendered carousel component.
 */
const Carousel = ({ children, settings }) => {
  const defaultSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <SlickArrow icon={<ArrowForwardIosIcon fontSize="small" />} position="right" />,
    prevArrow: <SlickArrow icon={<ArrowBackIosNewIcon fontSize="small" />} position="left" />,
    responsive: [
      {
        breakpoint: 1280, // lg
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 900, // md
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600, // sm
        settings: {
          slidesToShow: 1,
          arrows: false, // Hide arrows on mobile
        },
      },
    ],
  };

  const finalSettings = { ...defaultSettings, ...settings };

  return (
    <Box sx={{ padding: '0 40px', position: 'relative' }}>
      <Slider {...finalSettings}>
        {children}
      </Slider>
    </Box>
  );
};

export default Carousel;