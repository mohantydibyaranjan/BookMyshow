import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Box, Grid, Chip, Rating, Avatar } from '@mui/material';
import Button from '../../components/common/Button';

// Mock movie data - in a real app, this would be fetched via API
const mockMovie = {
  id: '1',
  title: 'Echoes of Tomorrow',
  posterUrl: 'https://res.cloudinary.com/diqh5xoe1/image/upload/v1722330686/movie-poster-1_u8mfk1.jpg',
  trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder trailer
  description: 'In a future where time is a currency, a renegade scientist discovers a way to rewrite history. Pursued by a temporal corporation, he must protect his invention from falling into the wrong hands, all while navigating the paradoxes of his own past.',
  rating: 4.5,
  reviewsCount: 1250,
  genres: ['Sci-Fi', 'Action', 'Thriller'],
  releaseDate: '2025-10-24',
  duration: '148 min',
  cast: [
    { name: 'Leo Vance', avatar: 'https://i.pravatar.cc/150?u=leo' },
    { name: 'Aria Chen', avatar: 'https://i.pravatar.cc/150?u=aria' },
    { name: 'Kenji Tanaka', avatar: 'https://i.pravatar.cc/150?u=kenji' },
  ],
};

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = mockMovie; // Fetch movie by id in a real app: const movie = await api.get(`/movies/${id}`);

  const handleBookTickets = () => {
    navigate('/book/theatres');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={5} sx={{ p: { xs: 2, md: 4 }, borderRadius: '16px' }}>
        <Grid container spacing={4}>
          {/* Left Column: Poster */}
          <Grid item xs={12} md={4}>
            <Box
              component="img"
              src={movie.posterUrl}
              alt={movie.title}
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
              {movie.title}
            </Typography>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <Typography variant="subtitle1" color="text.secondary">
                {movie.releaseDate}
              </Typography>
              <Chip label={movie.duration} size="small" />
            </Box>
            <Box display="flex" gap={1} mb={3}>
              {movie.genres.map(genre => (
                <Chip key={genre} label={genre} variant="outlined" color="primary" />
              ))}
            </Box>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
              {movie.description}
            </Typography>

            <Box display="flex" alignItems="center" gap={1} mb={3}>
              <Rating value={movie.rating} precision={0.5} readOnly />
              <Typography variant="body2">({movie.reviewsCount} reviews)</Typography>
            </Box>

            {/* Cast Section */}
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>Cast</Typography>
            <Box display="flex" gap={3} mb={4}>
              {movie.cast.map(actor => (
                <Box key={actor.name} textAlign="center">
                  <Avatar src={actor.avatar} sx={{ width: 64, height: 64, mb: 1 }} />
                  <Typography variant="caption">{actor.name}</Typography>
                </Box>
              ))}
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

        {/* Trailer Section */}
        <Box mt={5}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, borderLeft: '5px solid', borderColor: 'secondary.main', pl: 2 }}>
            Watch Trailer
          </Typography>
          <Box
            sx={{
              position: 'relative',
              paddingBottom: '56.25%', // 16:9 aspect ratio
              height: 0,
              overflow: 'hidden',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            }}
          >
            <iframe
              src={movie.trailerUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Movie Trailer"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            />
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default MovieDetail;