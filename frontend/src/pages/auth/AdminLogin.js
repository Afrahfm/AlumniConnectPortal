import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  InputAdornment,
  IconButton,
  Card,
  CardContent
} from '@mui/material';
import {
  AdminPanelSettings,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Security,
  Dashboard
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const user = await login(formData.email, formData.password);
      
      // Check if user is admin
      if (user.role !== 'ADMIN') {
        setError('Access denied. Admin privileges required.');
        toast.error('Access denied. Admin privileges required.');
        return;
      }

      toast.success('Admin login successful!');
      navigate('/admin/dashboard');
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed');
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <Container component="main" maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper elevation={24} sx={{ padding: 4, borderRadius: 3 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <AdminPanelSettings 
                sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} 
              />
              <Typography variant="h4" fontWeight="bold" color="primary">
                Admin Portal
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Secure access to Alumni Connect administration
              </Typography>
            </Box>

            <Card sx={{ mb: 3, bgcolor: 'primary.50' }}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <Security color="primary" sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      Administrator Access Only
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      This portal provides access to advanced analytics, user management, and system administration tools.
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                required
                fullWidth
                label="Admin Email"
                type="email"
                value={formData.email}
                onChange={handleChange('email')}
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="primary" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                required
                fullWidth
                label="Admin Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange('password')}
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                startIcon={<Dashboard />}
                sx={{
                  py: 1.5,
                  mb: 3,
                  background: 'linear-gradient(45deg, #1e3c72 30%, #2a5298 90%)',
                  fontSize: '1.1rem',
                  fontWeight: 600
                }}
              >
                {loading ? 'Authenticating...' : 'Access Admin Portal'}
              </Button>
            </Box>

            <Box textAlign="center">
              <Typography variant="body2" color="text.secondary">
                Need admin access?{' '}
                <Link
                  to="/admin/register"
                  style={{
                    color: '#1e3c72',
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  Request Admin Account
                </Link>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                <Link
                  to="/login"
                  style={{
                    color: '#1e3c72',
                    textDecoration: 'none',
                  }}
                >
                  ← Back to User Login
                </Link>
              </Typography>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default AdminLogin;