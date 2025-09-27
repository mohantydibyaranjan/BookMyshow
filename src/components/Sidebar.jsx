import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MovieIcon from '@mui/icons-material/Movie';
import EventIcon from '@mui/icons-material/Event';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import HelpIcon from '@mui/icons-material/Help';
import { useAuth } from '../contexts/AuthContext';

const SidebarWrapper = styled(Box)(({ theme, open }) => ({
  width: open ? 240 : 60,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  position: 'sticky',
  top: 0,
}));

const SidebarHeader = styled(Box)({
  height: '4rem', // h-16
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 8px',
});

const SidebarFooter = styled(Box)({
  height: '4rem', // h-16
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 'auto',
});

const NavItem = ({ to, icon, text, open }) => (
  <ListItem disablePadding component={NavLink} to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
    <ListItemButton sx={{
      '&.active': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderLeft: '4px solid #FFD700', // Gold accent for active link
      },
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
      }
    }}>
      <ListItemIcon sx={{ color: 'inherit' }}>{icon}</ListItemIcon>
      <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
    </ListItemButton>
  </ListItem>
);

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const { userRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Define navigation links based on role
  const getNavLinks = () => {
    const commonLinks = [
      { to: '/', icon: <HomeIcon />, text: 'Home' },
      { to: '/search', icon: <MovieIcon />, text: 'Movies & Events' },
      { to: '/user/bookings', icon: <ConfirmationNumberIcon />, text: 'My Bookings' },
    ];

    const adminLinks = [
      { to: '/admin/dashboard', icon: <AdminPanelSettingsIcon />, text: 'Dashboard' },
      { to: '/admin/movies', icon: <MovieIcon />, text: 'Manage Movies' },
      { to: '/admin/events', icon: <EventIcon />, text: 'Manage Events' },
    ];

    const organizerLinks = [
      { to: '/organizer/dashboard', icon: <AdminPanelSettingsIcon />, text: 'Dashboard' },
    ];

    if (userRole === 'admin') {
      return [...commonLinks, ...adminLinks];
    }
    if (userRole === 'organizer') {
      return [...commonLinks, ...organizerLinks];
    }
    return commonLinks;
  };

  return (
    <SidebarWrapper open={open}>
      <SidebarHeader>
        <h1 className={`text-2xl font-bold text-gold transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}>
          LuxeBook
        </h1>
        <IconButton onClick={handleToggle} sx={{ color: 'white', position: 'absolute', right: open ? 8 : 12, top: 12, backgroundColor: 'rgba(255,255,255,0.1)', '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' } }}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </SidebarHeader>
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />
      <List>
        {getNavLinks().map((link) => (
          <NavItem key={link.to} {...link} open={open} />
        ))}
      </List>
      <SidebarFooter>
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)', width: '80%', mb: 2 }} />
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon sx={{ color: 'inherit' }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </Box>
      </SidebarFooter>
    </SidebarWrapper>
  );
};

export default Sidebar;