import React from 'react';
import { Formik, Form } from 'formik';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Box, Link } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { loginSchema } from '../../utils/validators';
import FormInput from '../../components/common/FormInput';
import Button from '../../components/common/Button';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = (values, { setSubmitting, setStatus }) => {
    try {
      // In a real app, you would call an API here
      console.log('Logging in with:', values);
      // Mocking a successful login
      const mockUserData = {
        id: '123',
        username: 'John Doe',
        email: values.email,
        role: 'customer', // or 'admin' based on API response
      };
      login(mockUserData);
      setStatus({ success: 'Login successful! Redirecting...' });
      setTimeout(() => {
        navigate('/'); // Redirect to home page after successful login
      }, 1500);
    } catch (error) {
      setStatus({ error: 'Invalid credentials. Please try again.' });
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
          Welcome Back
        </Typography>
        <Typography component="p" color="textSecondary" sx={{ mt: 1 }}>
          Sign in to continue to LuxeBook
        </Typography>
        <Box sx={{ mt: 3, width: '100%' }}>
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, status }) => (
              <Form noValidate>
                <Box sx={{ mb: 2 }}>
                  <FormInput
                    name="email"
                    label="Email Address"
                    type="email"
                    placeholder="you@example.com"
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <FormInput
                    name="password"
                    label="Password"
                    type="password"
                  />
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
                  {isSubmitting ? 'Signing In...' : 'Sign In'}
                </Button>

                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Link component={RouterLink} to="/forgot-password" variant="body2">
                    Forgot password?
                  </Link>
                  <Link component={RouterLink} to="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
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

export default Login;