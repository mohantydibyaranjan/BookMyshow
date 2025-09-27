import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { Container, Paper, Typography, Box, Grid, List, ListItem, ListItemText, Divider, TextField } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { orderContactSchema } from '../../utils/validators';
import FormInput from '../../components/common/FormInput';
import Button from '../../components/common/Button';

const OrderSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // Get booking details from the previous page
  const { selectedSeats, price } = location.state || { selectedSeats: [], price: 0 };

  if (selectedSeats.length === 0) {
    // Redirect back if no seats are selected
    navigate(-1);
    return null;
  }

  const initialValues = {
    email: user?.email || '',
    phone: user?.phone || '',
    promoCode: '',
  };

  const subtotal = selectedSeats.length * price;
  const convenienceFee = 2.50; // Example fee
  const total = subtotal + convenienceFee;

  const handleSubmit = (values) => {
    console.log('Proceeding to checkout with:', { ...values, selectedSeats, total });
    navigate('/book/checkout', { state: { total, email: values.email } });
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={4} sx={{ p: 4, mt: 4, borderRadius: '16px' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Order Summary
        </Typography>

        <Grid container spacing={5}>
          {/* Left Side: Booking Details */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Booking Details</Typography>
            <List disablePadding>
              <ListItem>
                <ListItemText primary="Movie" secondary="Echoes of Tomorrow" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Theatre" secondary="Luxe Cinema Palace" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Date & Time" secondary="2025-10-24 at 17:30" />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Seats"
                  secondary={selectedSeats.map(s => s.id).join(', ')}
                />
              </ListItem>
            </List>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Price Breakdown</Typography>
            <List disablePadding>
              <ListItem>
                <ListItemText primary={`Tickets (${selectedSeats.length} x $${price.toFixed(2)})`} />
                <Typography>${subtotal.toFixed(2)}</Typography>
              </ListItem>
              <ListItem>
                <ListItemText primary="Convenience Fee" />
                <Typography>${convenienceFee.toFixed(2)}</Typography>
              </ListItem>
              <ListItem sx={{ fontWeight: 'bold' }}>
                <ListItemText primary={<Typography sx={{fontWeight: 'bold'}}>Total</Typography>} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>${total.toFixed(2)}</Typography>
              </ListItem>
            </List>
          </Grid>

          {/* Right Side: Contact Info & Promo */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Contact Information</Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={orderContactSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormInput name="email" label="Email Address" type="email" />
                    </Grid>
                    <Grid item xs={12}>
                      <FormInput name="phone" label="Phone Number" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Promotional Code (optional)" name="promoCode" />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    size="large"
                    disabled={isSubmitting}
                    sx={{ mt: 3 }}
                  >
                    Proceed to Checkout
                  </Button>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default OrderSummary;