import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:8081';
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      
      let userData, authToken;
      
      if (response.data.user && response.data.token) {
        userData = response.data.user;
        authToken = response.data.token;
      } else {
        userData = response.data;
        authToken = 'mock-token-' + Date.now();
      }
      
      localStorage.setItem('token', authToken);
      setToken(authToken);
      setUser(userData);
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
      
      return userData;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      // Clean up the data - remove confirmPassword and empty fields
      const cleanData = { ...userData };
      delete cleanData.confirmPassword;
      
      // Remove empty string fields
      Object.keys(cleanData).forEach(key => {
        if (cleanData[key] === '') {
          delete cleanData[key];
        }
      });
      
      const response = await axios.post('/api/auth/register', cleanData);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};