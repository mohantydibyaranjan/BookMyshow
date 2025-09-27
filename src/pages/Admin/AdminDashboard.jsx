import React from 'react';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import GroupIcon from '@mui/icons-material/Group';
import TheatersIcon from '@mui/icons-material/Theaters';
import Chart from '../../components/Chart';

// Mock data for the dashboard
const kpiData = {
  totalRevenue: 125000,
  ticketsSold: 8340,
  activeUsers: 15200,
  listedMovies: 75,
};

const revenueData = [
  { name: 'Jan', revenue: 12000 }, { name: 'Feb', revenue: 15000 }, { name: 'Mar', revenue: 18000 },
  { name: 'Apr', revenue: 17500 }, { name: 'May', revenue: 21000 }, { name: 'Jun', revenue: 25000 },
];

const ticketCategoryData = [
  { name: 'Movies', value: 4500 },
  { name: 'Events', value: 2500 },
  { name: 'Sports', value: 1340 },
];

const occupancyData = [
    { name: 'Luxe Palace', occupancy: 85 }, { name: 'Grand Screen', occupancy: 72 },
    { name: 'Cineplex One', occupancy: 65 }, { name: 'The Roxy', occupancy: 91 },
];

const KpiCard = ({ title, value, icon, color }) => (
  <Paper elevation={4} sx={{ p: 2, display: 'flex', alignItems: 'center', borderRadius: '12px', background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)`, color: 'white' }}>
    <Box sx={{ p: 2, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', mr: 2 }}>
        {icon}
    </Box>
    <Box>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{value}</Typography>
    </Box>
  </Paper>
);

const AdminDashboard = () => {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', my: 2 }}>
        Admin Dashboard
      </Typography>

      {/* KPI Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <KpiCard
            title="Total Revenue"
            value={`$${kpiData.totalRevenue.toLocaleString()}`}
            icon={<MonetizationOnIcon sx={{ fontSize: 32 }} />}
            color="#1d4ed8"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KpiCard
            title="Tickets Sold"
            value={kpiData.ticketsSold.toLocaleString()}
            icon={<ConfirmationNumberIcon sx={{ fontSize: 32 }} />}
            color="#4caf50"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KpiCard
            title="Active Users"
            value={kpiData.activeUsers.toLocaleString()}
            icon={<GroupIcon sx={{ fontSize: 32 }} />}
            color="#ff9800"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KpiCard
            title="Listed Movies"
            value={kpiData.listedMovies}
            icon={<TheatersIcon sx={{ fontSize: 32 }} />}
            color="#f44336"
          />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Chart
            type="line"
            data={revenueData}
            title="Monthly Revenue"
            dataKey="revenue"
            xAxisKey="name"
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Chart
            type="pie"
            data={ticketCategoryData}
            title="Tickets by Category"
            dataKey="value"
            xAxisKey="name"
          />
        </Grid>
        <Grid item xs={12}>
            <Chart
                type="bar"
                data={occupancyData}
                title="Theatre Occupancy Rate (%)"
                dataKey="occupancy"
                xAxisKey="name"
            />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;