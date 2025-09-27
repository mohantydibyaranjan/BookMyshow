import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Box, Grid, FormControl, InputLabel, Select, MenuItem, Paper } from '@mui/material';
import Card from '../components/Card';

// Mock data for search results
const mockResults = [
  { id: 1, type: 'movie', imageUrl: 'https://res.cloudinary.com/diqh5xoe1/image/upload/v1722330686/movie-poster-1_u8mfk1.jpg', title: 'Echoes of Tomorrow', subtitle: 'Sci-Fi', rating: 8.9, date: '2025-10-24' },
  { id: 2, type: 'movie', imageUrl: 'https://res.cloudinary.com/diqh5xoe1/image/upload/v1722330686/movie-poster-2_f8t3f9.jpg', title: 'The Gilded Cage', subtitle: 'Drama', rating: 9.2, date: '2025-11-12' },
  { id: 3, type: 'event', imageUrl: 'https://res.cloudinary.com/diqh5xoe1/image/upload/v1722330687/event-poster-1_uqvzmg.jpg', title: 'Starlight Symphony', subtitle: 'Classical Music', rating: 9.5, date: '2025-11-15' },
  { id: 4, type: 'movie', imageUrl: 'https://res.cloudinary.com/diqh5xoe1/image/upload/v1722330686/movie-poster-3_n9x9xq.jpg', title: 'Neptune\'s Wrath', subtitle: 'Action', rating: 8.5, date: '2025-12-01' },
  { id: 5, type: 'event', imageUrl: 'https://res.cloudinary.com/diqh5xoe1/image/upload/v1722330687/event-poster-2_b7m9ea.jpg', title: 'Art & Soul Festival', subtitle: 'Art Exhibition', rating: 9.3, date: '2025-10-20' },
];

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';

  const [results, setResults] = useState(mockResults);
  const [filters, setFilters] = useState({
    type: 'all',
    genre: 'all',
    sortBy: 'rating_desc',
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredAndSortedResults = useMemo(() => {
    let processedResults = [...results];

    // Filtering
    if (filters.type !== 'all') {
      processedResults = processedResults.filter(r => r.type === filters.type);
    }
    if (filters.genre !== 'all') {
      processedResults = processedResults.filter(r => r.subtitle.toLowerCase() === filters.genre.toLowerCase());
    }

    // Sorting
    switch (filters.sortBy) {
      case 'rating_desc':
        processedResults.sort((a, b) => b.rating - a.rating);
        break;
      case 'rating_asc':
        processedResults.sort((a, b) => a.rating - b.rating);
        break;
      case 'date_asc':
        processedResults.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      default:
        break;
    }

    return processedResults;
  }, [results, filters]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', my: 4 }}>
        {query ? `Search results for "${query}"` : 'Browse All'}
      </Typography>

      {/* Filter and Sort Controls */}
      <Paper elevation={2} sx={{ p: 2, mb: 4, borderRadius: '12px' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Type</InputLabel>
              <Select name="type" value={filters.type} label="Type" onChange={handleFilterChange}>
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="movie">Movies</MenuItem>
                <MenuItem value="event">Events</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Genre</InputLabel>
              <Select name="genre" value={filters.genre} label="Genre" onChange={handleFilterChange}>
                <MenuItem value="all">All Genres</MenuItem>
                <MenuItem value="Sci-Fi">Sci-Fi</MenuItem>
                <MenuItem value="Drama">Drama</MenuItem>
                <MenuItem value="Action">Action</MenuItem>
                <MenuItem value="Classical Music">Classical Music</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Sort By</InputLabel>
              <Select name="sortBy" value={filters.sortBy} label="Sort By" onChange={handleFilterChange}>
                <MenuItem value="rating_desc">Highest Rating</MenuItem>
                <MenuItem value="rating_asc">Lowest Rating</MenuItem>
                <MenuItem value="date_asc">Release Date</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Results Grid */}
      <Grid container spacing={3}>
        {filteredAndSortedResults.length > 0 ? (
          filteredAndSortedResults.map(item => (
            <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
              <Card {...item} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography sx={{ textAlign: 'center', mt: 5 }}>No results found.</Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default SearchResults;