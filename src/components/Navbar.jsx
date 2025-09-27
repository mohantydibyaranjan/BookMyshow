import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, InputBase, Badge, Avatar, Menu, MenuItem, IconButton, Box } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useAuth } from '../contexts/AuthContext';

// --- Styled Components for a Premium Look ---

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.05)',
  height: '4rem', // h-16
  position: 'sticky',
  top: 0,
  zIndex: theme.zIndex.drawer + 1,
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.1),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
      '&:focus': {
        width: '40ch',
      },
    },
  },
}));

// --- Navbar Component ---

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationCount, setNotificationCount] = useState(5); // Mock notifications

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  return (
    <StyledAppBar>
      <Toolbar className="flex justify-between items-center">
        {/* Search Bar */}
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search for movies, events, sports..." />
        </Search>

        <Box sx={{ flexGrow: 1 }} />

        {/* Icons and User Avatar */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Notification Bell */}
          <IconButton color="inherit">
            <Badge badgeContent={notificationCount} color="secondary">
              <NotificationsIcon className="text-gray-600" />
            </Badge>
          </IconButton>

          {/* User Avatar & Menu */}
          {isAuthenticated ? (
            <>
              <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                <Avatar alt={user?.username || 'User'} src={user?.avatarUrl || '/path/to/default-avatar.png'} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem component={Link} to="/user/profile" onClick={handleMenuClose}>Profile</MenuItem>
                <MenuItem component={Link} to="/user/bookings" onClick={handleMenuClose}>My Bookings</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Link to="/login" className="text-blue-700 font-semibold">Login</Link>
          )}
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;