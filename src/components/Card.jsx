import React from 'react';
import { Card as MuiCard, CardContent, CardMedia, Typography, Box, Chip } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

/**
 * A reusable card component for displaying movies, events, etc.
 *
 * @param {object} props - The component props.
 * @param {string} props.imageUrl - The URL of the image to display.
 * @param {string} props.title - The title of the item.
 * @param {string} props.subtitle - A subtitle or short description.
 * @param {number} props.rating - The rating of the item (e.g., out of 5 or 10).
 * @param {string} [props.tag] - A tag to display (e.g., 'Now Showing', 'Coming Soon').
 * @param {function} [props.onClick] - Function to call when the card is clicked.
 * @returns {JSX.Element} The rendered card component.
 */
const Card = ({ imageUrl, title, subtitle, rating, tag, onClick }) => {
  return (
    <MuiCard
      onClick={onClick}
      className="cursor-pointer group"
      sx={{
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
        },
      }}
    >
      <CardMedia
        component="img"
        height="280"
        image={imageUrl || 'https://via.placeholder.com/400x280?text=LuxeBook'}
        alt={title}
        sx={{
          transition: 'transform 0.4s ease',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        }}
      />
      {tag && (
        <Chip
          label={tag}
          color="secondary"
          size="small"
          sx={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        />
      )}
      <CardContent sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)',
        color: 'white',
        padding: '16px',
      }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 0.5 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          {subtitle}
        </Typography>
        {rating && (
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <StarIcon sx={{ color: 'secondary.main', fontSize: '1.2rem', mr: 0.5 }} />
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {rating}
            </Typography>
          </Box>
        )}
      </CardContent>
    </MuiCard>
  );
};

export default Card;