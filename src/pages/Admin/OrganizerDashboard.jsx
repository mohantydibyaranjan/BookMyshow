import React from 'react';
import { Container, Grid, Paper, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import EventIcon from '@mui/icons-material/Event';
import Chart from '../../components/Chart';

// Mock data for an organizer's dashboard
const kpiData = {
  totalRevenue: 45000,
  ticketsSold: 3120,
  activeEvents: 4,
};

const salesData = [
  { name: 'Week 1', tickets: 300 }, { name: 'Week 2', tickets: 500 },
  { name: 'Week 3', tickets: 820 }, { name: 'Week 4', tickets: 1500 },
];

const organizerEvents = [
    { id: 1, title: 'Starlight Symphony', status: 'Live', ticketsSold: 1200, revenue: 18000 },
    { id: 2, title: 'Art & Soul Festival', status: 'Upcoming', ticketsSold: 800, revenue: 12000 },
    { id: 3, title: 'Summer Rock Fest', status: 'Upcoming', ticketsSold: 520, revenue: 7800 },
    { id: 4, title: 'The Jazz Experience', status: 'Completed', ticketsSold: 600, revenue: 7200 },
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

const getStatusChip = (status) => {
    switch (status) {
      case 'Live': return <Chip label="Live" color="error" size="small" />;
      case 'Upcoming': return <Chip label="Upcoming" color="warning" size="small" />;
      case 'Completed': return <Chip label="Completed" color="success" size="small" />;
      default: return <Chip label={status} size="small" />;
    }
};

const OrganizerDashboard = () => {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', my: 2 }}>
        Organizer Dashboard
      </Typography>

      {/* KPI Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={4}>
          <KpiCard
            title="Total Revenue"
            value={`$${kpiData.totalRevenue.toLocaleString()}`}
            icon={<MonetizationOnIcon sx={{ fontSize: 32 }} />}
            color="#1d4ed8"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <KpiCard
            title="Tickets Sold"
            value={kpiData.ticketsSold.toLocaleString()}
            icon={<ConfirmationNumberIcon sx={{ fontSize: 32 }} />}
            color="#4caf50"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <KpiCard
            title="Active Events"
            value={kpiData.activeEvents}
            icon={<EventIcon sx={{ fontSize: 32 }} />}
            color="#ff9800"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Event Performance Table */}
        <Grid item xs={12} lg={7}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: '12px', height: '100%' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>My Events</Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Event</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Tickets Sold</TableCell>
                                <TableCell>Revenue</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {organizerEvents.map(event => (
                                <TableRow key={event.id}>
                                    <TableCell>{event.title}</TableCell>
                                    <TableCell>{getStatusChip(event.status)}</TableCell>
                                    <TableCell>{event.ticketsSold.toLocaleString()}</TableCell>
                                    <TableCell>${event.revenue.toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Grid>
        {/* Sales Chart */}
        <Grid item xs={12} lg={5}>
          <Chart
            type="bar"
            data={salesData}
            title="Weekly Ticket Sales (Starlight Symphony)"
            dataKey="tickets"
            xAxisKey="name"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrganizerDashboard;