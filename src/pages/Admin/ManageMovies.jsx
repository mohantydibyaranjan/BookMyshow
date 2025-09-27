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
import { eventSchema } from '../../utils/validators'; // Reusing event schema for simplicity
import { uploadToCloudinary } from '../../utils/cloudinary';

// Mock data
const mockMovies = [
  { id: 1, title: 'Echoes of Tomorrow', genre: 'Sci-Fi', releaseDate: '2025-10-24' },
  { id: 2, title: 'The Gilded Cage', genre: 'Drama', releaseDate: '2025-11-12' },
  { id: 3, title: 'Neptune\'s Wrath', genre: 'Action', releaseDate: '2025-12-01' },
];

const ManageMovies = () => {
  const [movies, setMovies] = useState(mockMovies);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);

  const initialValues = {
    title: editingMovie?.title || '',
    description: editingMovie?.description || '',
    genre: editingMovie?.genre || '',
    releaseDate: editingMovie?.releaseDate || '',
    posterFile: null,
  };

  const handleOpenPopup = (movie = null) => {
    setEditingMovie(movie);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setEditingMovie(null);
    setIsPopupOpen(false);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    let posterUrl = editingMovie?.posterUrl || '';

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

    const movieData = { ...values, posterUrl, id: editingMovie?.id || Date.now() };
    delete movieData.posterFile;

    if (editingMovie) {
      // Update existing movie
      setMovies(movies.map(m => (m.id === editingMovie.id ? movieData : m)));
    } else {
      // Add new movie
      setMovies([...movies, movieData]);
    }

    console.log('Submitted movie:', movieData);
    setSubmitting(false);
    resetForm();
    handleClosePopup();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      setMovies(movies.filter(m => m.id !== id));
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={4} sx={{ p: 4, mt: 4, borderRadius: '16px' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            Manage Movies
          </Typography>
          <Button onClick={() => handleOpenPopup()} startIcon={<AddIcon />}>
            Add New Movie
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Genre</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Release Date</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {movies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((movie) => (
                <TableRow key={movie.id} hover>
                  <TableCell>{movie.title}</TableCell>
                  <TableCell>{movie.genre}</TableCell>
                  <TableCell>{movie.releaseDate}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleOpenPopup(movie)}><EditIcon /></IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(movie.id)} color="error"><DeleteIcon /></IconButton>
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
          count={movies.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
        />
      </Paper>

      <Popup
        open={isPopupOpen}
        onClose={handleClosePopup}
        title={editingMovie ? 'Edit Movie' : 'Add New Movie'}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={eventSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <FormInput name="title" label="Title" />
                </Grid>
                <Grid item xs={12}>
                  <FormInput name="description" label="Description" multiline rows={4} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormInput name="genre" label="Genre" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormInput name="releaseDate" label="Release Date" type="date" InputLabelProps={{ shrink: true }} />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle2" gutterBottom>Movie Poster</Typography>
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
                    {isSubmitting ? 'Saving...' : 'Save Movie'}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Popup>
    </Container>
  );
};

export default ManageMovies;