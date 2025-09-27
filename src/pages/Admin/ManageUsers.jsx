import React, { useState } from 'react';
import {
  Container, Paper, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TablePagination, Box, IconButton, Tooltip, Avatar, Chip, TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';

// Mock data
const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'customer', status: 'active', avatar: 'https://i.pravatar.cc/150?u=john' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'organizer', status: 'active', avatar: 'https://i.pravatar.cc/150?u=jane' },
  { id: 3, name: 'Admin User', email: 'admin@luxebook.com', role: 'admin', status: 'active', avatar: 'https://i.pravatar.cc/150?u=admin' },
  { id: 4, name: 'Suspended User', email: 'suspended@example.com', role: 'customer', status: 'suspended', avatar: 'https://i.pravatar.cc/150?u=suspended' },
];

const getStatusChip = (status) => {
  if (status === 'active') {
    return <Chip label="Active" color="success" size="small" />;
  }
  return <Chip label="Suspended" color="error" size="small" />;
};

const ManageUsers = () => {
  const [users, setUsers] = useState(mockUsers);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState('');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(filter.toLowerCase()) ||
    user.email.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user? This action is irreversible.')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleSuspend = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u));
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={4} sx={{ p: 4, mt: 4, borderRadius: '16px' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            Manage Users
          </Typography>
          <TextField
            label="Search Users"
            variant="outlined"
            size="small"
            value={filter}
            onChange={handleFilterChange}
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>User</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Role</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Avatar src={user.avatar} sx={{ mr: 2 }} />
                      <Typography>{user.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell sx={{textTransform: 'capitalize'}}>{user.role}</TableCell>
                  <TableCell align="center">{getStatusChip(user.status)}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit Role (Coming Soon)">
                      <IconButton disabled><EditIcon /></IconButton>
                    </Tooltip>
                    <Tooltip title={user.status === 'active' ? 'Suspend User' : 'Unsuspend User'}>
                      <IconButton onClick={() => handleSuspend(user.id)} color={user.status === 'active' ? 'warning' : 'success'}>
                        <BlockIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete User">
                      <IconButton onClick={() => handleDelete(user.id)} color="error"><DeleteIcon /></IconButton>
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
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
        />
      </Paper>
    </Container>
  );
};

export default ManageUsers;