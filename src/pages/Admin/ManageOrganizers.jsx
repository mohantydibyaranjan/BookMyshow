import React, { useState } from 'react';
import {
  Container, Paper, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Box, IconButton, Tooltip, Chip,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import BlockIcon from '@mui/icons-material/Block';

// Mock data
const mockOrganizers = [
  { id: 1, name: 'Royal Philharmonic', contact: 'contact@rpo.com', status: 'approved' },
  { id: 2, name: 'Global Sports Inc.', contact: 'events@globalsports.com', status: 'approved' },
  { id: 3, name: 'Art & Exhibitions Co.', contact: 'info@artexhibit.co', status: 'pending' },
  { id: 4, name: 'City Music Festivals', contact: 'booking@cmf.com', status: 'suspended' },
];

const getStatusChip = (status) => {
  switch (status) {
    case 'approved':
      return <Chip label="Approved" color="success" size="small" />;
    case 'pending':
      return <Chip label="Pending" color="warning" size="small" />;
    case 'suspended':
      return <Chip label="Suspended" color="error" size="small" />;
    default:
      return <Chip label="Unknown" size="small" />;
  }
};

const ManageOrganizers = () => {
  const [organizers, setOrganizers] = useState(mockOrganizers);

  const handleUpdateStatus = (id, newStatus) => {
    setOrganizers(organizers.map(o => (o.id === id ? { ...o, status: newStatus } : o)));
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={4} sx={{ p: 4, mt: 4, borderRadius: '16px' }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
          Manage Organizers
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Organizer Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Contact Email</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {organizers.map((organizer) => (
                <TableRow key={organizer.id} hover>
                  <TableCell>{organizer.name}</TableCell>
                  <TableCell>{organizer.contact}</TableCell>
                  <TableCell align="center">{getStatusChip(organizer.status)}</TableCell>
                  <TableCell align="center">
                    {organizer.status === 'pending' && (
                      <>
                        <Tooltip title="Approve">
                          <IconButton onClick={() => handleUpdateStatus(organizer.id, 'approved')} color="success">
                            <CheckCircleIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Reject">
                          <IconButton onClick={() => handleUpdateStatus(organizer.id, 'rejected')} color="error">
                            <CancelIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                    {organizer.status === 'approved' && (
                      <Tooltip title="Suspend">
                        <IconButton onClick={() => handleUpdateStatus(organizer.id, 'suspended')} color="warning">
                          <BlockIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                     {organizer.status === 'suspended' && (
                      <Tooltip title="Unsuspend">
                        <IconButton onClick={() => handleUpdateStatus(organizer.id, 'approved')} color="success">
                          <CheckCircleIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default ManageOrganizers;