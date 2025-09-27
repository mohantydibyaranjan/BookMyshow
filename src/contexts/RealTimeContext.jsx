import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import io from 'socket.io-client';

// In a real application, this URL would come from an environment variable
const SOCKET_IO_URL = 'http://localhost:4000'; // Example backend URL

const RealTimeContext = createContext(null);

/**
 * RealTimeProvider component that establishes and manages the Socket.io connection.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 */
export const RealTimeProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize the socket connection
    const newSocket = io(SOCKET_IO_URL, {
      // You can add authentication tokens or other options here
      // For example: auth: { token: 'your-jwt-token' }
    });

    setSocket(newSocket);

    // Listen for connection events (optional but good for debugging)
    newSocket.on('connect', () => {
      console.log('Socket.io connected successfully.');
    });

    newSocket.on('disconnect', () => {
      console.log('Socket.io disconnected.');
    });

    // Cleanup on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({ socket }), [socket]);

  return (
    <RealTimeContext.Provider value={value}>
      {children}
    </RealTimeContext.Provider>
  );
};

/**
 * Custom hook to use the RealTimeContext.
 * @returns {object} The real-time context value, containing the socket instance.
 */
export const useRealTime = () => {
  const context = useContext(RealTimeContext);
  if (!context) {
    throw new Error('useRealTime must be used within a RealTimeProvider');
  }
  return context;
};