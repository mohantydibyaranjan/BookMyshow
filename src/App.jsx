import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { RealTimeProvider } from './contexts/RealTimeContext';

// Layout Components
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Page Components
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Profile from './pages/User/Profile';
import MyBookings from './pages/User/MyBookings';
import MovieDetail from './pages/Booking/MovieDetail';
import EventDetail from './pages/Booking/EventDetail';
import TheatreSelection from './pages/Booking/TheatreSelection';
import SeatSelection from './pages/Booking/SeatSelection';
import OrderSummary from './pages/Booking/OrderSummary';
import Checkout from './pages/Booking/Checkout';
import TicketConfirmation from './pages/Booking/TicketConfirmation';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManageMovies from './pages/Admin/ManageMovies';
import ManageEvents from './pages/Admin/ManageEvents';
import ManageTheatres from './pages/Admin/ManageTheatres';
import ManageOrganizers from './pages/Admin/ManageOrganizers';
import ManageUsers from './pages/Admin/ManageUsers';
import ManageOffers from './pages/Admin/ManageOffers';
import OrganizerDashboard from './pages/Admin/OrganizerDashboard';
import Help from './pages/Static/Help';

// A placeholder for a protected route component
// In a real app, this would check for auth status and role
const ProtectedRoute = ({ children }) => {
  // const { isAuthenticated, userRole } = useAuth();
  // Add logic here to redirect if not authenticated or wrong role
  return children;
};

function App() {
  return (
    <AuthProvider>
      <RealTimeProvider>
        <div className="flex bg-gray-100 min-h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Navbar />
            <main className="flex-grow p-4 md:p-6 lg:p-8">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/movie/:id" element={<MovieDetail />} />
                <Route path="/event/:id" element={<EventDetail />} />
                <Route path="/help" element={<Help />} />

                {/* Booking Flow (Protected) */}
                <Route path="/book/theatres" element={<ProtectedRoute><TheatreSelection /></ProtectedRoute>} />
                <Route path="/book/seats" element={<ProtectedRoute><SeatSelection /></ProtectedRoute>} />
                <Route path="/book/summary" element={<ProtectedRoute><OrderSummary /></ProtectedRoute>} />
                <Route path="/book/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                <Route path="/book/confirmation" element={<ProtectedRoute><TicketConfirmation /></ProtectedRoute>} />

                {/* User Routes (Protected) */}
                <Route path="/user/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/user/bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />

                {/* Admin Routes (Protected) */}
                <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/movies" element={<ProtectedRoute><ManageMovies /></ProtectedRoute>} />
                <Route path="/admin/events" element={<ProtectedRoute><ManageEvents /></ProtectedRoute>} />
                <Route path="/admin/theatres" element={<ProtectedRoute><ManageTheatres /></ProtectedRoute>} />
                <Route path="/admin/organizers" element={<ProtectedRoute><ManageOrganizers /></ProtectedRoute>} />
                <Route path="/admin/users" element={<ProtectedRoute><ManageUsers /></ProtectedRoute>} />
                <Route path="/admin/offers" element={<ProtectedRoute><ManageOffers /></ProtectedRoute>} />

                {/* Organizer Routes (Protected) */}
                <Route path="/organizer/dashboard" element={<ProtectedRoute><OrganizerDashboard /></ProtectedRoute>} />

              </Routes>
            </main>
            <Footer />
          </div>
        </div>
      </RealTimeProvider>
    </AuthProvider>
  );
}

export default App;