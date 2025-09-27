import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Box, Grid, List, ListItem, ListItemButton, ListItemIcon, CircularProgress } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Button from '../../components/common/Button';

// Function to load an external script (like Razorpay's checkout.js)
const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { total, email } = location.state || { total: 0, email: '' };

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Load the payment gateway script when the component mounts
    loadScript('https://checkout.razorpay.com/v1/checkout.js');
  }, []);

  const handlePayment = async () => {
    setIsProcessing(true);

    // --- Real Razorpay Integration would start here ---
    // 1. API call to your backend to create a Razorpay order
    // const orderData = await api.post('/payment/create-order', { amount: total * 100 });
    // const { orderId, amount, currency } = orderData.data;

    const options = {
      key: 'YOUR_RAZORPAY_KEY_ID', // Get this from your Razorpay dashboard
      amount: total * 100, // Amount in the smallest currency unit (e.g., paise for INR)
      currency: 'USD', // or 'INR'
      name: 'LuxeBook',
      description: 'Ticket Booking Transaction',
      image: '/logo.png', // URL to your logo
      // order_id: orderId,
      handler: function (response) {
        // This function is called on successful payment
        console.log('Payment successful:', response);
        // 2. API call to your backend to verify the payment signature
        // await api.post('/payment/verify', response);
        navigate('/book/confirmation', { state: { bookingDetails: { total, email, ...response } } });
      },
      prefill: {
        email: email,
      },
      theme: {
        color: '#1d4ed8', // Match our brand color
      },
    };

    // This is a mock process since we don't have a real key
    console.log('Simulating payment with options:', options);
    setTimeout(() => {
      console.log('Mock payment successful!');
      setIsProcessing(false);
      navigate('/book/confirmation', { state: { bookingDetails: { total, email, paymentId: `mock_pay_${Date.now()}` } } });
    }, 3000);

    // --- In a real app, you would uncomment the following lines ---
    // const paymentObject = new window.Razorpay(options);
    // paymentObject.on('payment.failed', function (response) {
    //   console.error('Payment failed:', response.error);
    //   alert(`Payment failed: ${response.error.description}`);
    //   setIsProcessing(false);
    // });
    // paymentObject.open();
  };

  if (total === 0) {
    navigate('/');
    return null;
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ p: 4, mt: 4, borderRadius: '16px' }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          Secure Checkout
        </Typography>
        <Box
          sx={{
            my: 3,
            p: 3,
            borderRadius: '12px',
            backgroundColor: 'primary.main',
            color: 'white',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6">Total Amount to Pay</Typography>
          <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
            ${total.toFixed(2)}
          </Typography>
        </Box>

        <Typography variant="h6" sx={{ mb: 2 }}>Select Payment Method</Typography>
        <List>
          <ListItemButton
            selected={selectedPaymentMethod === 'card'}
            onClick={() => setSelectedPaymentMethod('card')}
            sx={{ borderRadius: '8px', mb: 1 }}
          >
            <ListItemIcon><CreditCardIcon /></ListItemIcon>
            <ListItem>Credit/Debit Card</ListItem>
          </ListItemButton>
          <ListItemButton
            selected={selectedPaymentMethod === 'upi'}
            onClick={() => setSelectedPaymentMethod('upi')}
            sx={{ borderRadius: '8px' }}
          >
            <ListItemIcon><AccountBalanceWalletIcon /></ListItemIcon>
            <ListItem>UPI / Net Banking</ListItem>
          </ListItemButton>
        </List>

        <Button
          fullWidth
          size="large"
          onClick={handlePayment}
          disabled={isProcessing}
          sx={{ mt: 3 }}
        >
          {isProcessing ? <CircularProgress size={24} color="inherit" /> : `Pay $${total.toFixed(2)} Now`}
        </Button>
      </Paper>
    </Container>
  );
};

export default Checkout;