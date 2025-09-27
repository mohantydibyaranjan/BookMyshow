import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Carousel from '../components/Carousel';
import Card from '../components/Card';
import CitySelector from '../components/CitySelector';

// Mock data for demonstration
const bannerData = [
  { id: 1, url: 'https://res.cloudinary.com/diqh5xoe1/image/upload/v1722330685/luxe-banner-1_ls9qke.jpg', title: 'Cinematic Universe Unveiled' },
  { id: 2, url: 'https://res.cloudinary.com/diqh5xoe1/image/upload/v1722330685/luxe-banner-2_szrxxq.jpg', title: 'Live Concerts Redefined' },
  { id: 3, url: 'https://res.cloudinary.com/diqh5xoe1/image/upload/v1722330685/luxe-banner-3_g2f5o9.jpg', title: 'Exclusive Sporting Events' },
];

const movieData = [
  { id: 1, imageUrl: 'https://res.cloudinary.com/diqh5xoe1/image/upload/v1722330686/movie-poster-1_u8mfk1.jpg', title: 'Echoes of Tomorrow', subtitle: 'Sci-Fi', rating: 8.9, tag: 'Now Showing' },
  { id: 2, imageUrl: 'https://res.cloudinary.com/diqh5xoe1/image/upload/v1722330686/movie-poster-2_f8t3f9.jpg', title: 'The Gilded Cage', subtitle: 'Drama', rating: 9.2, tag: 'Now Showing' },
  { id: 3, imageUrl: 'https://res.cloudinary.com/diqh5xoe1/image/upload/v1722330686/movie-poster-3_n9x9xq.jpg', title: 'Neptune\'s Wrath', subtitle: 'Action', rating: 8.5, tag: 'Coming Soon' },
  { id: 4, imageUrl: 'https://res.cloudinary.com/diqh5xoe1/image/upload/v1722330686/movie-poster-4_t3fsdi.jpg', title: 'Whispers in the Dark', subtitle: 'Horror', rating: 9.1, tag: 'Now Showing' },
  { id: 5, imageUrl: 'https://res.cloudinary.com/diqh5xoe1/image/upload/v1722330687/movie-poster-5_k5i2nf.jpg', title: 'A Parisian Romance', subtitle: 'Romance', rating: 8.7, tag: 'Now Showing' },
];

const eventData = [
    { id: 1, imageUrl: 'https://res.cloudinary.com/diqh5xoe1/image/upload/v1722330687/event-poster-1_uqvzmg.jpg', title: 'Starlight Symphony', subtitle: 'Classical Music', rating: 9.5, tag: 'Live' },
    { id: 2, imageUrl: 'https://res.cloudinary.com/diqh5xoe1/image/upload/v1722330687/event-poster-2_b7m9ea.jpg', title: 'Art & Soul Festival', subtitle: 'Art Exhibition', rating: 9.3, tag: 'This Weekend' },
    { id: 3, imageUrl: 'https://res.cloudinary.com/diqh5xoe1/image/upload/v1722330688/event-poster-3_b8tq7r.jpg', title: 'Grand Prix Finals', subtitle: 'Sports', rating: 9.8, tag: 'Live' },
    { id: 4, imageUrl: 'https://res.cloudinary.com/diqh5xoe1/image/upload/v1722330688/event-poster-4_b6c4v5.jpg', title: 'Culinary Kings', subtitle: 'Food Festival', rating: 9.0, tag: 'Next Week' },
];


const Section = ({ title, children }) => (
  <Box my={6}>
    <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', borderLeft: '5px solid', borderColor: 'secondary.main', pl: 2, mb: 3 }}>
      {title}
    </Typography>
    {children}
  </Box>
);

const Home = () => {
  const bannerCarouselSettings = {
    slidesToShow: 1,
    autoplay: true,
    fade: true,
    speed: 800,
    dots: false,
  };

  return (
    <Container maxWidth="xl" sx={{ p: { xs: 0, md: 3 } }}>
      {/* Banner Carousel */}
      <Box sx={{ mb: 6, '.slick-list, .slick-track, .slick-slide > div': { height: '50vh', minHeight: '400px' } }}>
          <Carousel settings={bannerCarouselSettings}>
              {bannerData.map(banner => (
                  <Box key={banner.id} sx={{ position: 'relative', height: '100%' }}>
                      <img src={banner.url} alt={banner.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
                      <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 4, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)', color: 'white', borderRadius: '0 0 12px 12px' }}>
                          <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold' }}>{banner.title}</Typography>
                      </Box>
                  </Box>
              ))}
          </Carousel>
      </Box>

      {/* City Selector and Filters */}
      <Box display="flex" justifyContent="flex-end" alignItems="center" mb={4}>
          <CitySelector />
      </Box>

      {/* Recommended Section */}
      <Section title="Recommended For You">
        <Carousel>
          {movieData.map(item => (
            <Box key={item.id} sx={{ p: 1.5 }}>
              <Card {...item} />
            </Box>
          ))}
        </Carousel>
      </Section>

      {/* Live Events Section */}
      <Section title="Live Events">
        <Carousel>
          {eventData.map(item => (
            <Box key={item.id} sx={{ p: 1.5 }}>
              <Card {...item} />
            </Box>
          ))}
        </Carousel>
      </Section>
    </Container>
  );
};

export default Home;