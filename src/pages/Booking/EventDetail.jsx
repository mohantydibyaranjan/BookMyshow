import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Box, Grid, Chip, Rating, Avatar } from '@mui/material';
import Button from '../../components/common/Button';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

// Mock event data - in a real app, this would be fetched via API
const mockEvent = {
  id: '1',
  title: 'Starlight Symphony',
  posterUrl: 'https://res.cloudinary.com/diqh5xoe1/image/upload/v1722330687/event-poster-1_uqvzmg.jpg',
  videoUrl: 'https://www.youtube.com/embed/your-event-video-id', // Placeholder video
  description: 'Experience a magical evening under the stars as the world-renowned Royal Philharmonic Orchestra performs timeless classics. A night of elegance, passion, and breathtaking music awaits at the Grand Opera House.',
  rating: 4.8,
  reviewsCount: 850,
  tags: ['Classical', 'Orchestra', 'Live Music'],
  date: '2025-11-15',
  time: '20:00',
  location: 'Grand Opera House, London',
  organizer: {
    name: 'Royal Philharmonic',
    avatar: 'https://i.pravatar.cc/150?u=royal-philharmonic'
  },
};

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = mockEvent; // Fetch event by id in a real app: const event = await api.get(`/events/${id}`);

  const handleBookTickets = () => {
    // For events, maybe it goes directly to seat selection if there's only one venue/time
    navigate('/book/seats');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={5} sx={{ p: { xs: 2, md: 4 }, borderRadius: '16px' }}>
        <Grid container spacing={4}>
          {/* Left Column: Poster */}
          <Grid item xs={12} md={4}>
            <Box
              component="img"
              src={event.posterUrl}
              alt={event.title}
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              }}
            />
          </Grid>

          {/* Right Column: Details */}
          <Grid item xs={12} md={8}>
            <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
              {event.title}
            </Typography>

            <Box display="flex" alignItems="center" gap={3} mb={2} color="text.secondary">
                <Box display="flex" alignItems="center" gap={1}>
                    <CalendarTodayIcon fontSize="small" />
                    <Typography variant="subtitle1">{`${event.date} at ${event.time}`}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                    <LocationOnIcon fontSize="small" />
                    <Typography variant="subtitle1">{event.location}</Typography>
                </Box>
            </Box>

            <Box display="flex" gap={1} mb={3}>
              {event.tags.map(tag => (
                <Chip key={tag} label={tag} variant="outlined" color="primary" />
              ))}
            </Box>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
              {event.description}
            </Typography>

            <Box display="flex" alignItems="center" gap={1} mb={3}>
              <Rating value={event.rating} precision={0.5} readOnly />
              <Typography variant="body2">({event.reviewsCount} reviews)</Typography>
            </Box>

            {/* Organizer Section */}
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>Organizer</Typography>
            <Box display="flex" alignItems="center" gap={2} mb={4}>
                <Avatar src={event.organizer.avatar} sx={{ width: 48, height: 48 }} />
                <Typography variant="h6">{event.organizer.name}</Typography>
            </Box>

            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={handleBookTickets}
            >
              Book Tickets
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default EventDetail;