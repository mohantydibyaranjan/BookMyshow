import React, { useState, useEffect } from 'react';
import { Box, Typography, Chip, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRealTime } from '../contexts/RealTimeContext';

// --- Styled Component for a single seat ---

const Seat = styled('div')(({ theme, status }) => ({
  width: '32px',
  height: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '8px',
  margin: '4px',
  cursor: status === 'sold' ? 'not-allowed' : 'pointer',
  fontWeight: 'bold',
  fontSize: '0.75rem',
  transition: 'background-color 0.3s, transform 0.2s',
  border: `1px solid ${
    status === 'available' ? theme.palette.grey[400] :
    status === 'selected' ? theme.palette.secondary.main :
    theme.palette.grey[600]
  }`,
  backgroundColor:
    status === 'available' ? theme.palette.background.paper :
    status === 'selected' ? theme.palette.secondary.main :
    theme.palette.grey[300],
  color:
    status === 'selected' ? theme.palette.common.white :
    theme.palette.text.primary,
  '&:hover': {
    transform: status === 'available' ? 'scale(1.1)' : 'none',
    backgroundColor: status === 'available' ? theme.palette.grey[200] : '',
  },
}));

// --- Legend Component ---

const Legend = () => (
  <Box display="flex" justifyContent="center" my={2} gap={3}>
    <Box display="flex" alignItems="center">
      <Seat status="available" style={{ cursor: 'default' }} />
      <Typography variant="body2" ml={1}>Available</Typography>
    </Box>
    <Box display="flex" alignItems="center">
      <Seat status="selected" style={{ cursor: 'default' }} />
      <Typography variant="body2" ml={1}>Selected</Typography>
    </Box>
    <Box display="flex" alignItems="center">
      <Seat status="sold" style={{ cursor: 'default' }} />
      <Typography variant="body2" ml={1}>Sold</Typography>
    </Box>
  </Box>
);

// --- Main SeatMap Component ---

/**
 * An interactive seat map component.
 *
 * @param {object} props - The component props.
 * @param {Array<Array<object>>} props.seatLayout - A 2D array representing the seat layout.
 * @param {function} props.onSelectionChange - Callback function when seat selection changes.
 * @returns {JSX.Element} The rendered seat map.
 */
const SeatMap = ({ seatLayout, onSelectionChange }) => {
  const [seats, setSeats] = useState(seatLayout);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { socket } = useRealTime();

  // Handle real-time updates from Socket.io
  useEffect(() => {
    if (socket) {
      // Listen for another user booking a seat
      socket.on('seat-booked', (bookedSeatId) => {
        setSeats(prevSeats =>
          prevSeats.map(row =>
            row.map(seat =>
              seat.id === bookedSeatId ? { ...seat, status: 'sold' } : seat
            )
          )
        );
      });

      // Listen for another user releasing a seat (if applicable)
      socket.on('seat-released', (releasedSeatId) => {
        setSeats(prevSeats =>
          prevSeats.map(row =>
            row.map(seat =>
              seat.id === releasedSeatId ? { ...seat, status: 'available' } : seat
            )
          )
        );
      });
    }

    // Cleanup listeners on component unmount
    return () => {
      if (socket) {
        socket.off('seat-booked');
        socket.off('seat-released');
      }
    };
  }, [socket]);

  const handleSeatClick = (seat) => {
    if (seat.status === 'sold') return;

    const isSelected = selectedSeats.some(s => s.id === seat.id);
    let newSelectedSeats;

    if (isSelected) {
      // Deselect the seat
      newSelectedSeats = selectedSeats.filter(s => s.id !== seat.id);
      // Optional: Notify backend that the seat is released
      if (socket) socket.emit('release-seat', seat.id);
    } else {
      // Select the seat
      newSelectedSeats = [...selectedSeats, seat];
      // Optional: Notify backend to temporarily lock the seat
      if (socket) socket.emit('lock-seat', seat.id);
    }

    setSelectedSeats(newSelectedSeats);
    onSelectionChange(newSelectedSeats);

    // Update the visual status of the seat
    setSeats(prevSeats =>
      prevSeats.map(row =>
        row.map(s =>
          s.id === seat.id ? { ...s, status: isSelected ? 'available' : 'selected' } : s
        )
      )
    );
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box sx={{ width: '100%', bgcolor: 'grey.100', p: 1, mb: 3, borderRadius: '4px' }}>
        <Typography align="center" variant="h6" color="textSecondary">
          SCREEN
        </Typography>
      </Box>

      {seats.map((row, rowIndex) => (
        <Box key={rowIndex} display="flex" justifyContent="center">
          {row.map(seat => (
            <Seat
              key={seat.id}
              status={seat.status}
              onClick={() => handleSeatClick(seat)}
              tabIndex={seat.status !== 'sold' ? 0 : -1}
              aria-label={`Seat ${seat.id}, Status: ${seat.status}`}
            >
              {seat.number}
            </Seat>
          ))}
        </Box>
      ))}
      <Legend />
    </Box>
  );
};

export default SeatMap;