import React, { useState } from 'react';
import { FormControl, Select, MenuItem, Box, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Mock list of international cities
const cities = [
  'New York', 'London', 'Paris', 'Tokyo', 'Dubai', 'Singapore', 'Sydney', 'Los Angeles'
];

/**
 * A dropdown component for selecting a city.
 *
 * @param {object} props - The component props.
 * @param {function} props.onCityChange - Callback function when the city selection changes.
 * @returns {JSX.Element} The rendered city selector component.
 */
const CitySelector = ({ onCityChange }) => {
  const [selectedCity, setSelectedCity] = useState(cities[0]);

  const handleChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);
    if (onCityChange) {
      onCityChange(city);
    }
  };

  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <Select
        value={selectedCity}
        onChange={handleChange}
        disableUnderline
        IconComponent={() => <LocationOnIcon sx={{ color: 'text.secondary', mr: 1 }} />}
        renderValue={(value) => (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
              {value}
            </Typography>
          </Box>
        )}
        MenuProps={{
          PaperProps: {
            sx: {
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            },
          },
        }}
      >
        {cities.map((city) => (
          <MenuItem key={city} value={city}>
            {city}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CitySelector;