import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  BarChart,
  PieChart,
  Pie,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from 'recharts';
import { Paper, Typography } from '@mui/material';

// Define a color palette for charts
const COLORS = ['#1d4ed8', '#FFD700', '#C0C0C0', '#4CAF50', '#FF9800', '#F44336'];

/**
 * A reusable chart component for displaying analytics data.
 *
 * @param {object} props - The component props.
 * @param {'line' | 'bar' | 'pie'} props.type - The type of chart to display.
 * @param {Array<object>} props.data - The data to be plotted on the chart.
 * @param {string} props.title - The title of the chart.
 * @param {string} props.dataKey - The key in the data objects for the main value (y-axis or pie value).
 * @param {string} [props.xAxisKey] - The key in the data objects for the x-axis labels.
 * @returns {JSX.Element} The rendered chart component.
 */
const Chart = ({ type, data, title, dataKey, xAxisKey }) => {
  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey={xAxisKey} stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #ddd',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line type="monotone" dataKey={dataKey} stroke="#1d4ed8" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey={xAxisKey} stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #ddd',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Bar dataKey={dataKey} fill="#1d4ed8" radius={[4, 4, 0, 0]} />
          </BarChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Pie data={data} dataKey={dataKey} nameKey={xAxisKey} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        );
      default:
        return <Typography>Invalid chart type specified.</Typography>;
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: '12px',
        height: '400px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </Paper>
  );
};

export default Chart;