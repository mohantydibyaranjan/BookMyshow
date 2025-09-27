import React, { useState } from 'react';
import {
  Container, Paper, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Box, IconButton, Tooltip, Grid,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Button from '../../components/common/Button';
import Popup from '../../components/common/Popup';
import FormInput from '../../components/common/FormInput';

// Mock data
const mockTheatres = [
  { id: 1, name: 'Luxe Cinema Palace', location: 'Downtown', screens: 8, seats: 1200 },
  { id: 2, name: 'The Grand Screen', location: 'Uptown', screens: 12, seats: 1800 },
  { id: 3, name: 'Cineplex One', location: 'Midtown', screens: 6, seats: 900 },
];

// Validation schema for the theatre form
const theatreSchema = Yup.object({
  name: Yup.string().required('Theatre name is required'),
  location: Yup.string().required('Location is required'),
  screens: Yup.number().min(1, 'Must have at least one screen').required('Number of screens is required'),
});

const ManageTheatres = () => {
  const [theatres, setTheatres] = useState(mockTheatres);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editingTheatre, setEditingTheatre] = useState(null);

  const initialValues = {
    name: editingTheatre?.name || '',
    location: editingTheatre?.location || '',
    screens: editingTheatre?.screens || '',
  };

  const handleOpenPopup = (theatre = null) => {
    setEditingTheatre(theatre);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setEditingTheatre(null);
    setIsPopupOpen(false);
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const theatreData = {
      ...values,
      id: editingTheatre?.id || Date.now(),
      seats: values.screens * 150, // Mock calculation
    };

    if (editingTheatre) {
      setTheatres(theatres.map(t => (t.id === editingTheatre.id ? theatreData : t)));
    } else {
      setTheatres([...theatres, theatreData]);
    }

    console.log('Submitted theatre:', theatreData);
    setSubmitting(false);
    resetForm();
    handleClosePopup();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this theatre?')) {
      setTheatres(theatres.filter(t => t.id !== id));
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={4} sx={{ p: 4, mt: 4, borderRadius: '16px' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            Manage Theatres
          </Typography>
          <Button onClick={() => handleOpenPopup()} startIcon={<AddIcon />}>
            Add New Theatre
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Screens</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Total Seats</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {theatres.map((theatre) => (
                <TableRow key={theatre.id} hover>
                  <TableCell>{theatre.name}</TableCell>
                  <TableCell>{theatre.location}</TableCell>
                  <TableCell align="center">{theatre.screens}</TableCell>
                  <TableCell align="center">{theatre.seats.toLocaleString()}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleOpenPopup(theatre)}><EditIcon /></IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(theatre.id)} color="error"><DeleteIcon /></IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Popup
        open={isPopupOpen}
        onClose={handleClosePopup}
        title={editingTheatre ? 'Edit Theatre' : 'Add New Theatre'}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={theatreSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form>
              <Box sx={{p: 2}}>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <FormInput name="name" label="Theatre Name" />
                </Grid>
                <Grid item xs={12}>
                  <FormInput name="location" label="Location" />
                </Grid>
                <Grid item xs={12}>
                  <FormInput name="screens" label="Number of Screens" type="number" />
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                  <Button onClick={handleClosePopup} variant="outlined">Cancel</Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save Theatre'}
                  </Button>
                </Grid>
              </Grid>
              </Box>
            </Form>
          )}
        </Formik>
      </Popup>
    </Container>
  );
};

export default ManageTheatres;