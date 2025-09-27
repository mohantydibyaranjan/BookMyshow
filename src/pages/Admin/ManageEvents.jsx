import React, { useState } from 'react';
import {
  Container, Paper, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TablePagination, Box, IconButton, Tooltip, Grid,
} from '@mui/material';
import { Formik, Form } from 'formik';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Button from '../../components/common/Button';
import Popup from '../../components/common/Popup';
import FormInput from '../../components/common/FormInput';
import { eventSchema } from '../../utils/validators';
import { uploadToCloudinary } from '../../utils/cloudinary';

// Mock data
const mockEvents = [
  { id: 1, title: 'Starlight Symphony', genre: 'Music', releaseDate: '2025-11-15' },
  { id: 2, title: 'Art & Soul Festival', genre: 'Exhibition', releaseDate: '2025-10-20' },
  { id: 3, title: 'Grand Prix Finals', genre: 'Sports', releaseDate: '2025-09-30' },
];

const ManageEvents = () => {
  const [events, setEvents] = useState(mockEvents);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const initialValues = {
    title: editingEvent?.title || '',
    description: editingEvent?.description || '',
    genre: editingEvent?.genre || '',
    releaseDate: editingEvent?.releaseDate || '',
    posterFile: null,
  };

  const handleOpenPopup = (event = null) => {
    setEditingEvent(event);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setEditingEvent(null);
    setIsPopupOpen(false);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    let posterUrl = editingEvent?.posterUrl || '';

    if (values.posterFile) {
      try {
        const uploadResponse = await uploadToCloudinary(values.posterFile);
        posterUrl = uploadResponse.secure_url;
      } catch (error) {
        console.error('Poster upload failed:', error);
        setSubmitting(false);
        return;
      }
    }

    const eventData = { ...values, posterUrl, id: editingEvent?.id || Date.now() };
    delete eventData.posterFile;

    if (editingEvent) {
      setEvents(events.map(e => (e.id === editingEvent.id ? eventData : e)));
    } else {
      setEvents([...events, eventData]);
    }

    console.log('Submitted event:', eventData);
    setSubmitting(false);
    resetForm();
    handleClosePopup();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(e => e.id !== id));
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={4} sx={{ p: 4, mt: 4, borderRadius: '16px' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            Manage Events
          </Typography>
          <Button onClick={() => handleOpenPopup()} startIcon={<AddIcon />}>
            Add New Event
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((event) => (
                <TableRow key={event.id} hover>
                  <TableCell>{event.title}</TableCell>
                  <TableCell>{event.genre}</TableCell>
                  <TableCell>{event.releaseDate}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleOpenPopup(event)}><EditIcon /></IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(event.id)} color="error"><DeleteIcon /></IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={events.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
        />
      </Paper>

      <Popup
        open={isPopupOpen}
        onClose={handleClosePopup}
        title={editingEvent ? 'Edit Event' : 'Add New Event'}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={eventSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <Box sx={{p: 2}}>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <FormInput name="title" label="Title" />
                </Grid>
                <Grid item xs={12}>
                  <FormInput name="description" label="Description" multiline rows={4} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormInput name="genre" label="Category" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormInput name="releaseDate" label="Event Date" type="date" InputLabelProps={{ shrink: true }} />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle2" gutterBottom>Event Poster</Typography>
                    <input
                        type="file"
                        name="posterFile"
                        accept="image/*"
                        onChange={(event) => setFieldValue('posterFile', event.currentTarget.files[0])}
                    />
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                  <Button onClick={handleClosePopup} variant="outlined">Cancel</Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save Event'}
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

export default ManageEvents;