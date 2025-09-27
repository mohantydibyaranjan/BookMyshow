import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  Box,
  IconButton,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CancelIcon from '@mui/icons-material/Cancel';
import { useRealTime } from '../../contexts/RealTimeContext';
import Button from '../../components/common/Button';
import Popup from '../../components/common/Popup';

// Mock bookings data
const mockBookings = [
  { id: 'BK12345', title: 'Dune: Part Two', date: '2025-10-15', time: '19:00', status: 'Confirmed' },
  { id: 'BK12346', title: 'Starlight Symphony', date: '2025-11-01', time: '20:30', status: 'Confirmed' },
  { id: 'BK12347', title: 'The Gilded Cage', date: '2025-09-20', time: '18:00', status: 'Completed' },
  { id: 'BK12348', title: 'Grand Prix Finals', date: '2025-08-10', time: '14:00', status: 'Completed' },
  { id: 'BK12349', title: 'Neptune\'s Wrath', date: '2025-10-25', time: '21:00', status: 'Cancelled' },
];

const getStatusChipColor = (status) => {
  switch (status) {
    case 'Confirmed':
      return { backgroundColor: '#4caf50', color: 'white' }; // Green
    case 'Completed':
      return { backgroundColor: '#1d4ed8', color: 'white' }; // Blue
    case 'Cancelled':
      return { backgroundColor: '#f44336', color: 'white' }; // Red
    default:
      return { backgroundColor: '#9e9e9e', color: 'white' }; // Grey
  }
};

const MyBookings = () => {
  const [bookings, setBookings] = useState(mockBookings);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [cancelPopupOpen, setCancelPopupOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const { socket } = useRealTime();

  // Listen for real-time booking status updates
  useEffect(() => {
    if (socket) {
      socket.on('booking-status-update', ({ bookingId, newStatus }) => {
        setBookings(prev =>
          prev.map(b => (b.id === bookingId ? { ...b, status: newStatus } : b))
        );
      });
    }
    return () => socket?.off('booking-status-update');
  }, [socket]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenCancelPopup = (booking) => {
    setSelectedBooking(booking);
    setCancelPopupOpen(true);
  };

  const handleCloseCancelPopup = () => {
    setCancelPopupOpen(false);
    setSelectedBooking(null);
  };

  const handleConfirmCancel = () => {
    // API call to cancel booking would go here
    console.log('Cancelling booking:', selectedBooking.id);
    setBookings(prev =>
      prev.map(b => (b.id === selectedBooking.id ? { ...b, status: 'Cancelled' } : b))
    );
    handleCloseCancelPopup();
  };

  const paginatedBookings = bookings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container maxWidth="lg">
      <Paper elevation={4} sx={{ p: 4, mt: 4, borderRadius: '16px' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          My Bookings
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Booking ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Event/Movie</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Date & Time</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedBookings.map((booking) => (
                <TableRow key={booking.id} hover>
                  <TableCell>{booking.id}</TableCell>
                  <TableCell>{booking.title}</TableCell>
                  <TableCell>{`${booking.date} at ${booking.time}`}</TableCell>
                  <TableCell align="center">
                    <Chip label={booking.status} sx={getStatusChipColor(booking.status)} />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton aria-label="view-details">
                      <VisibilityIcon />
                    </IconButton>
                    {booking.status === 'Confirmed' && (
                      <IconButton
                        aria-label="cancel-booking"
                        color="error"
                        onClick={() => handleOpenCancelPopup(booking)}
                      >
                        <CancelIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={bookings.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Popup
        open={cancelPopupOpen}
        onClose={handleCloseCancelPopup}
        title="Confirm Cancellation"
        actions={{
          onCancel: handleCloseCancelPopup,
          cancelText: 'Go Back',
          onConfirm: handleConfirmCancel,
          confirmText: 'Yes, Cancel',
        }}
      >
        <Typography>
          Are you sure you want to cancel your booking for "{selectedBooking?.title}"?
          This action cannot be undone.
        </Typography>
      </Popup>
    </Container>
  );
};

export default MyBookings;