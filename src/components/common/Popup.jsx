import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Grow } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Button from './Button'; // Using the custom Button

// Grow transition for a smooth popup effect
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

/**
 * A reusable popup (dialog) component.
 *
 * @param {object} props - The component props.
 * @param {boolean} props.open - Controls whether the popup is open.
 * @param {function} props.onClose - Function to call when the popup should close.
 * @param {string} props.title - The title of the popup.
 * @param {React.ReactNode} props.children - The content to display inside the popup.
 * @param {object} [props.actions] - An object defining the action buttons, e.g., { onConfirm: () => {}, confirmText: 'Agree' }.
 * @returns {JSX.Element | null} The rendered popup component.
 */
const Popup = ({ open, onClose, title, children, actions }) => {
  if (!open) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      PaperProps={{
        style: {
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        },
      }}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ m: 0, p: 2, fontWeight: 'bold' }}>
        {title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {children}
      </DialogContent>
      {actions && (
        <DialogActions sx={{ p: '16px' }}>
          {actions.onCancel && (
            <Button onClick={actions.onCancel} variant="outlined">
              {actions.cancelText || 'Cancel'}
            </Button>
          )}
          {actions.onConfirm && (
            <Button onClick={actions.onConfirm} color="primary">
              {actions.confirmText || 'Confirm'}
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default Popup;