import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Box, Grid, Chip } from '@mui/material';
import SeatMap from '../../components/SeatMap';
import Button from '../../components/common/Button';
import Popup from '../../components/common/Popup';

// Mock data for the seat layout
const generateSeatLayout = () => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const cols = 12;
  let layout = [];
  for (let i = 0; i < rows.length; i++) {
    let row = [];
    for (let j = 1; j <= cols; j++) {
      // Mock some seats as already sold
      const isSold = Math.random() > 0.8;
      row.push({
        id: `${rows[i]}${j}`,
        number: j,
        row: rows[i],
        status: isSold ? 'sold' : 'available', // 'available', 'sold', 'selected'
      });
    }
    layout.push(row);
  }
  return layout;
};

const TICKET_PRICE = 15; // Price per ticket

const SeatSelection = () => {
  const [seatLayout] = React.useState(generateSeatLayout());
  const [selectedSeats, setSelectedSeats] = React.useState([]);
  const [seatCount, setSeatCount] = React.useState(2);
  const [isSeatCountPopupOpen, setIsSeatCountPopupOpen] = React.useState(true);
  const navigate = useNavigate();

  const handleSeatSelectionChange = (newSelectedSeats) => {
    if (newSelectedSeats.length > seatCount) {
        // This logic can be enhanced to show a notification
        alert(`You can only select up to ${seatCount} seats.`);
        return;
    }
    setSelectedSeats(newSelectedSeats);
  };

  const handleProceed = () => {
    if (selectedSeats.length === seatCount) {
      // Pass selected seats and other info to the next page
      navigate('/book/summary', { state: { selectedSeats, price: TICKET_PRICE } });
    } else {
        alert(`Please select exactly ${seatCount} seats to proceed.`);
    }
  };

  const handleConfirmSeatCount = (count) => {
    setSeatCount(count);
    setIsSeatCountPopupOpen(false);
  };

  const totalPrice = selectedSeats.length * TICKET_PRICE;

  return (
    <Container maxWidth="lg">
      <Paper elevation={4} sx={{ p: 4, mt: 4, borderRadius: '16px' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Select Your Seats
        </Typography>

        <Grid container spacing={4}>
          {/* Left Side: Seat Map */}
          <Grid item xs={12} md={8}>
            <SeatMap
              seatLayout={seatLayout}
              onSelectionChange={handleSeatSelectionChange}
            />
          </Grid>

          {/* Right Side: Order Summary */}
          <Grid item xs={12} md={4}>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: '12px', position: 'sticky', top: '100px' }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                Booking Summary
              </Typography>
              <Box mb={2}>
                <Typography variant="body1"><strong>Movie:</strong> Echoes of Tomorrow</Typography>
                <Typography variant="body1"><strong>Theatre:</strong> Luxe Cinema Palace</Typography>
                <Typography variant="body1"><strong>Date:</strong> 2025-10-24, 17:30</Typography>
              </Box>
              <hr style={{margin: '16px 0', border: 'none', borderTop: '1px solid #eee'}}/>
              <Box mb={2}>
                <Typography variant="h6" sx={{ mb: 1 }}>Selected Seats ({selectedSeats.length}/{seatCount})</Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {selectedSeats.length > 0 ? (
                    selectedSeats.map(seat => <Chip key={seat.id} label={seat.id} color="secondary" />)
                  ) : (
                    <Typography color="text.secondary">No seats selected</Typography>
                  )}
                </Box>
              </Box>
              <hr style={{margin: '16px 0', border: 'none', borderTop: '1px solid #eee'}}/>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Total Price:</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
                  ${totalPrice.toFixed(2)}
                </Typography>
              </Box>
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                onClick={handleProceed}
                disabled={selectedSeats.length !== seatCount || selectedSeats.length === 0}
              >
                Proceed to Summary
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Paper>

      {/* Seat Count Selection Popup */}
      <Popup
        open={isSeatCountPopupOpen}
        title="How many seats?"
        onClose={() => selectedSeats.length === 0 && navigate(-1)} // Go back if they close without choosing
      >
        <Typography sx={{ mb: 3 }}>Please select the number of seats you wish to book.</Typography>
        <Box display="flex" justifyContent="center" gap={2}>
          {[1, 2, 3, 4, 5, 6].map(count => (
            <Button
              key={count}
              variant={seatCount === count ? 'contained' : 'outlined'}
              onClick={() => handleConfirmSeatCount(count)}
            >
              {count}
            </Button>
          ))}
        </Box>
      </Popup>
    </Container>
  );
};

export default SeatSelection;