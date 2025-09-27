import React, { useState } from 'react';
import {
  Container, Paper, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Box, IconButton, Tooltip, Chip, Grid,
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
const mockOffers = [
  { id: 1, code: 'LUXE50', description: '50% off on Tuesday bookings', status: 'active' },
  { id: 2, code: 'WEEKEND20', description: '20% off on weekend events', status: 'active' },
  { id: 3, code: 'FIRSTBOOK', description: 'Flat $10 off for first-time users', status: 'expired' },
];

// Validation schema for the offer form
const offerSchema = Yup.object({
  code: Yup.string().uppercase().required('Promo code is required'),
  description: Yup.string().required('Description is required'),
  discount: Yup.number().min(1, 'Discount must be positive').required('Discount value is required'),
});

const getStatusChip = (status) => {
  return status === 'active'
    ? <Chip label="Active" color="success" size="small" />
    : <Chip label="Expired" color="default" size="small" />;
};

const ManageOffers = () => {
  const [offers, setOffers] = useState(mockOffers);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);

  const initialValues = {
    code: editingOffer?.code || '',
    description: editingOffer?.description || '',
    discount: editingOffer?.discount || '',
  };

  const handleOpenPopup = (offer = null) => {
    setEditingOffer(offer);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setEditingOffer(null);
    setIsPopupOpen(false);
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const offerData = { ...values, id: editingOffer?.id || Date.now(), status: 'active' };

    if (editingOffer) {
      setOffers(offers.map(o => (o.id === editingOffer.id ? offerData : o)));
    } else {
      setOffers([...offers, offerData]);
    }

    console.log('Submitted offer:', offerData);
    setSubmitting(false);
    resetForm();
    handleClosePopup();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this offer?')) {
      setOffers(offers.filter(o => o.id !== id));
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={4} sx={{ p: 4, mt: 4, borderRadius: '16px' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            Manage Offers
          </Typography>
          <Button onClick={() => handleOpenPopup()} startIcon={<AddIcon />}>
            Add New Offer
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Promo Code</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {offers.map((offer) => (
                <TableRow key={offer.id} hover>
                  <TableCell>{offer.code}</TableCell>
                  <TableCell>{offer.description}</TableCell>
                  <TableCell align="center">{getStatusChip(offer.status)}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleOpenPopup(offer)}><EditIcon /></IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(offer.id)} color="error"><DeleteIcon /></IconButton>
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
        title={editingOffer ? 'Edit Offer' : 'Add New Offer'}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={offerSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form>
              <Box sx={{p: 2}}>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6}>
                  <FormInput name="code" label="Promo Code" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormInput name="discount" label="Discount Value (%)" type="number" />
                </Grid>
                <Grid item xs={12}>
                  <FormInput name="description" label="Description" multiline rows={3} />
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                  <Button onClick={handleClosePopup} variant="outlined">Cancel</Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save Offer'}
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

export default ManageOffers;