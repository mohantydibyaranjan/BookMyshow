import React from 'react';
import QRCode from 'qrcode.react';
import { Box, Paper, Typography } from '@mui/material';

/**
 * A component to display a QR code for ticket confirmation.
 *
 * @param {object} props - The component props.
 * @param {string} props.value - The value to encode in the QR code (e.g., booking ID, URL).
 * @param {number} [props.size=128] - The size of the QR code in pixels.
 * @param {string} [props.level='H'] - The error correction level ('L', 'M', 'Q', 'H').
 * @returns {JSX.Element} The rendered QR code display component.
 */
const QRCodeDisplay = ({ value, size = 128, level = 'H' }) => {
  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        borderRadius: '12px',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        background: 'linear-gradient(145deg, #ffffff, #e6e6e6)',
        boxShadow: '8px 8px 16px #d1d1d1, -8px -8px 16px #ffffff',
      }}
    >
      <QRCode
        value={value}
        size={size}
        level={level}
        bgColor="#ffffff"
        fgColor="#000000"
        imageSettings={{
          // Optional: embed a logo in the center
          // src: '/path/to/logo.png',
          // height: 40,
          // width: 40,
          // excavate: true,
        }}
      />
      <Typography variant="caption" color="textSecondary">
        Scan for entry
      </Typography>
    </Paper>
  );
};

export default QRCodeDisplay;