import React, { createContext, useState, useContext, useMemo } from 'react';

// Create the context
const AuthContext = createContext(null);

/**
 * AuthProvider component that holds the authentication state and logic.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be rendered within the provider.
 */
export const AuthProvider = ({ children }) => {
  // In a real app, you would initialize this from localStorage or a session cookie
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // e.g., 'customer', 'admin', 'organizer'

  // Mock login function
  const login = (userData) => {
    // In a real implementation, this would involve an API call
    setUser(userData);
    setIsAuthenticated(true);
    setUserRole(userData.role); // Assuming the user object has a 'role' property
  };

  // Mock logout function
  const logout = () => {
    // Clear user data and authentication status
    setUser(null);
    setIsAuthenticated(false);
    setUserRole(null);
    // Also clear any stored tokens or session info
  };

  // The value provided to consuming components
  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      userRole,
      login,
      logout,
    }),
    [user, isAuthenticated, userRole]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to use the AuthContext.
 * This makes it easier for components to access the context without boilerplate.
 * @returns {object} The authentication context value.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};