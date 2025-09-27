import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Container, Paper, Typography, Box, Grid, Avatar, IconButton } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { profileSchema } from '../../utils/validators';
import { uploadToCloudinary } from '../../utils/cloudinary';
import FormInput from '../../components/common/FormInput';
import Button from '../../components/common/Button';

const Profile = () => {
  const { user, login: updateUser } = useAuth(); // Assuming login also updates user state
  const [isEditing, setIsEditing] = useState(false);

  // In a real app, user data would come from the AuthContext
  const initialValues = {
    username: user?.username || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone: user?.phone || '+1 (555) 123-4567',
    avatarUrl: user?.avatarUrl || 'https://via.placeholder.com/150',
  };

  const handleAvatarUpload = async (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const response = await uploadToCloudinary(file);
        setFieldValue('avatarUrl', response.secure_url);
      } catch (error) {
        console.error('Failed to upload avatar:', error);
        // Optionally, show an error message to the user
      }
    }
  };

  const handleSubmit = (values, { setSubmitting, setStatus }) => {
    try {
      // API call to update user profile would go here
      console.log('Updating profile with:', values);
      // Mock update
      updateUser({ ...user, ...values });
      setStatus({ success: 'Profile updated successfully!' });
      setIsEditing(false);
    } catch (error) {
      setStatus({ error: 'Failed to update profile.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper
        elevation={4}
        sx={{
          p: 4,
          mt: 4,
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          My Profile
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={profileSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, status, setFieldValue }) => (
            <Form>
              <Grid container spacing={4} alignItems="center">
                {/* Avatar Section */}
                <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                  <Box position="relative" display="inline-block">
                    <Avatar
                      src={initialValues.avatarUrl}
                      sx={{ width: 150, height: 150, mb: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
                    />
                    {isEditing && (
                      <IconButton
                        component="label"
                        sx={{
                          position: 'absolute',
                          bottom: 10,
                          right: 10,
                          backgroundColor: 'primary.main',
                          color: 'white',
                          '&:hover': { backgroundColor: 'primary.dark' },
                        }}
                      >
                        <EditIcon />
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={(e) => handleAvatarUpload(e, setFieldValue)}
                        />
                      </IconButton>
                    )}
                  </Box>
                </Grid>

                {/* Form Fields Section */}
                <Grid item xs={12} md={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormInput name="username" label="Username" disabled={!isEditing} />
                    </Grid>
                    <Grid item xs={12}>
                      <FormInput name="email" label="Email Address" type="email" disabled={!isEditing} />
                    </Grid>
                    <Grid item xs={12}>
                      <FormInput name="phone" label="Phone Number" disabled={!isEditing} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              {status?.error && <Typography color="error" sx={{ mt: 2 }}>{status.error}</Typography>}
              {status?.success && <Typography color="primary.main" sx={{ mt: 2 }}>{status.success}</Typography>}

              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                {isEditing ? (
                  <>
                    <Button onClick={() => setIsEditing(false)} variant="outlined" sx={{ mr: 2 }}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)} startIcon={<EditIcon />}>
                    Edit Profile
                  </Button>
                )}
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default Profile;