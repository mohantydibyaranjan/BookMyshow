import React, { useState, useEffect } from 'react';
import { Badge, IconButton, Menu, MenuItem, Typography, Divider, Box } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useRealTime } from '../contexts/RealTimeContext';

// Mock notifications data
const initialNotifications = [
  { id: 1, text: 'Your booking for "Dune: Part Two" is confirmed.', read: false },
  { id: 2, text: 'A new offer "50% off on Tuesdays" is available!', read: false },
  { id: 3, text: 'Reminder: Your show starts in 1 hour.', read: true },
  { id: 4, text: '"The Symphony of Stars" event has been rescheduled.', read: true },
];

const NotificationBell = () => {
  const { socket } = useRealTime();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;
  const isOpen = Boolean(anchorEl);

  // Listen for real-time notifications
  useEffect(() => {
    if (socket) {
      socket.on('new-notification', (notification) => {
        setNotifications(prev => [notification, ...prev]);
      });
    }
    return () => {
      if (socket) {
        socket.off('new-notification');
      }
    };
  }, [socket]);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <Badge badgeContent={unreadCount} color="secondary">
          <NotificationsIcon className="text-gray-600" />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            width: 360,
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" component="div">Notifications</Typography>
        </Box>
        <Divider />
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <MenuItem
              key={notification.id}
              onClick={() => handleMarkAsRead(notification.id)}
              sx={{
                whiteSpace: 'normal',
                backgroundColor: notification.read ? 'transparent' : 'rgba(29, 78, 216, 0.05)',
                borderLeft: notification.read ? 'none' : '4px solid #1d4ed8',
                my: 0.5
              }}
            >
              <Typography variant="body2">{notification.text}</Typography>
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>
            <Typography variant="body2" color="textSecondary">No new notifications</Typography>
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default NotificationBell;