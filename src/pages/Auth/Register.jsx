import React from 'react';
import { Formik, Form } from 'formik';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Box, Link } from '@mui/material';
import { registrationSchema } from '../../utils/validators';
import FormInput from '../../components/common/FormInput';
import Button from '../../components/common/Button';
import api from '../../utils/api';

const Register = () => {
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = async (values, { setSubmitting, setStatus, setFieldError }) => {
    try {
      // In a real app, this would be an API call to the backend
      // const response = await api.post('/auth/register', values);
      console.log('Registering with:', values);

      // Mocking API call for uniqueness check
      if (values.email === 'existing@example.com') {
        setFieldError('email', 'This email is already registered.');
        throw new Error('Email exists');
      }

      setStatus({ success: 'Registration successful! Please log in.' });
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      if (error.message !== 'Email exists') {
        setStatus({ error: 'Registration failed. Please try again later.' });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={6}
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 4,
          borderRadius: '12px',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Create Account
        </Typography>
        <Typography component="p" color="textSecondary" sx={{ mt: 1 }}>
          Join the LuxeBook experience
        </Typography>
        <Box sx={{ mt: 3, width: '100%' }}>
          <Formik
            initialValues={initialValues}
            validationSchema={registrationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, status }) => (
              <Form noValidate>
                <Box sx={{ mb: 2 }}>
                  <FormInput name="username" label="Username" placeholder="JohnDoe" />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <FormInput name="email" label="Email Address" type="email" placeholder="you@example.com" />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <FormInput name="phone" label="Phone Number" placeholder="+1 (555) 555-5555" />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <FormInput name="password" label="Password" type="password" />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <FormInput name="confirmPassword" label="Confirm Password" type="password" />
                </Box>

                {status?.error && (
                  <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                    {status.error}
                  </Typography>
                )}
                {status?.success && (
                  <Typography color="primary" variant="body2" sx={{ mb: 2 }}>
                    {status.success}
                  </Typography>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  className="mt-4"
                >
                  {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                </Button>

                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <Link component={RouterLink} to="/login" variant="body2">
                    Already have an account? Sign In
                  </Link>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;