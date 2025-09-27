import React from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { Container, Paper, Typography, Box, Grid, Divider, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import QRCodeDisplay from '../../components/QRCodeDisplay';
import Button from '../../components/common/Button';

const TicketConfirmation = () => {
  const location = useLocation();
  const { bookingDetails } = location.state || {};

  // Fallback for direct navigation
  if (!bookingDetails) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h5">No booking details found.</Typography>
        <Button component={RouterLink} to="/" sx={{ mt: 2 }}>
          Back to Home
        </Button>
      </Container>
    );
  }

  const { paymentId, total, email } = bookingDetails;
  // In a real app, more details like seat numbers would be passed or fetched
  const bookingId = paymentId.replace('mock_pay_', 'BK');

  return (
    <Container maxWidth="md">
      <Paper
        elevation={6}
        sx={{
          p: 4,
          mt: 4,
          borderRadius: '16px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        }}
      >
        <CheckCircleIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Booking Confirmed!
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Your ticket is ready. A confirmation has been sent to {email}.
        </Typography>

        <Grid container spacing={4} alignItems="center">
          {/* Left Side: QR Code */}
          <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center' }}>
            <QRCodeDisplay value={bookingId} size={180} />
          </Grid>

          {/* Right Side: Booking Details */}
          <Grid item xs={12} md={7} sx={{ textAlign: 'left' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Booking ID: {bookingId}</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography><strong>Movie:</strong> Echoes of Tomorrow</Typography>
            <Typography><strong>Theatre:</strong> Luxe Cinema Palace</Typography>
            <Typography><strong>Date:</strong> 2025-10-24, 17:30</Typography>
            <Typography><strong>Seats:</strong> F5, F6</Typography>
            <Typography><strong>Total Paid:</strong> ${total.toFixed(2)}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box display="flex" justifyContent="center" gap={2}>
          <Button startIcon={<DownloadIcon />} variant="outlined">
            Download Ticket
          </Button>
          <Button startIcon={<ShareIcon />} variant="contained">
            Share Ticket
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default TicketConfirmation;