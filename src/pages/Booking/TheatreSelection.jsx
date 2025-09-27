import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Box, Chip, Grid } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '../../components/common/Button';

// Mock data for theatres and showtimes
const mockTheatres = [
  {
    id: 'T1',
    name: 'Luxe Cinema Palace',
    location: 'Downtown',
    showtimes: [
      { time: '14:00', format: '4DX', status: 'available' },
      { time: '17:30', format: 'IMAX', status: 'filling-fast' },
      { time: '21:00', format: 'IMAX', status: 'available' },
    ],
  },
  {
    id: 'T2',
    name: 'The Grand Screen',
    location: 'Uptown',
    showtimes: [
      { time: '15:00', format: 'Standard', status: 'available' },
      { time: '18:30', format: 'Standard', status: 'almost-full' },
      { time: '22:00', format: 'Standard', status: 'sold-out' },
    ],
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'filling-fast': return 'warning';
    case 'almost-full': return 'error';
    case 'sold-out': return 'default';
    default: return 'success';
  }
};

const ShowtimeChip = ({ showtime, onClick }) => (
  <Chip
    label={`${showtime.time} - ${showtime.format}`}
    clickable={showtime.status !== 'sold-out'}
    onClick={() => showtime.status !== 'sold-out' && onClick(showtime)}
    color={getStatusColor(showtime.status)}
    variant={showtime.status === 'sold-out' ? 'outlined' : 'filled'}
    sx={{
      m: 0.5,
      fontWeight: 'bold',
      '&:hover': {
        transform: showtime.status !== 'sold-out' ? 'scale(1.05)' : 'none',
        boxShadow: showtime.status !== 'sold-out' ? '0 2px 8px rgba(0,0,0,0.2)' : 'none',
      },
      transition: 'transform 0.2s, box-shadow 0.2s',
    }}
  />
);

const TheatreSelection = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  const handleShowtimeSelect = (theatre, showtime) => {
    console.log('Selected:', { theatre: theatre.name, date: selectedDate, ...showtime });
    navigate('/book/seats');
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={4} sx={{ p: 4, mt: 4, borderRadius: '16px' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Select Date & Theatre
        </Typography>

        {/* Date Picker */}
        <Box mb={4}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Select a Date"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              disablePast
              sx={{ width: '100%' }}
            />
          </LocalizationProvider>
        </Box>

        {/* Theatres List */}
        <Box>
          {mockTheatres.map(theatre => (
            <Paper key={theatre.id} variant="outlined" sx={{ p: 3, mb: 3, borderRadius: '12px' }}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{theatre.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{theatre.location}</Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Box display="flex" flexWrap="wrap">
                    {theatre.showtimes.map(showtime => (
                      <ShowtimeChip
                        key={showtime.time}
                        showtime={showtime}
                        onClick={() => handleShowtimeSelect(theatre, showtime)}
                      />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Box>
      </Paper>
    </Container>
  );
};

export default TheatreSelection;