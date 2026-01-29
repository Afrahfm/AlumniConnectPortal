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
  CardContent,
  Grid
} from '@mui/material';
import {
  AdminPanelSettings,
  Person,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Security,
  Phone,
  Business
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    department: '',
    role: 'ADMIN'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await register(formData);
      toast.success('Admin account created successfully! Please login.');
      navigate('/admin/login');
    } catch (error) {
      setError(error.response?.data?.error || 'Registration failed');
      toast.error('Registration failed. Please try again.');
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
      <Container component="main" maxWidth="md">
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
                Create Admin Account
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Register for administrative access to Alumni Connect Portal
              </Typography>
            </Box>

            <Card sx={{ mb: 3, bgcolor: 'warning.50' }}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <Security color="warning" sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="subtitle2" color="warning.main">
                      Admin Account Registration
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Admin accounts require approval and provide access to sensitive system functions.
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
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="First Name"
                    value={formData.firstName}
                    onChange={handleChange('firstName')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Last Name"
                    value={formData.lastName}
                    onChange={handleChange('lastName')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Admin Email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange('email')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange('password')}
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange('confirmPassword')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={formData.phone}
                    onChange={handleChange('phone')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Department"
                    value={formData.department}
                    onChange={handleChange('department')}
                    placeholder="e.g., IT, Student Affairs, Alumni Relations"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Business color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                startIcon={<AdminPanelSettings />}
                sx={{
                  py: 1.5,
                  mt: 3,
                  mb: 3,
                  background: 'linear-gradient(45deg, #1e3c72 30%, #2a5298 90%)',
                  fontSize: '1.1rem',
                  fontWeight: 600
                }}
              >
                {loading ? 'Creating Admin Account...' : 'Create Admin Account'}
              </Button>
            </Box>

            <Box textAlign="center">
              <Typography variant="body2" color="text.secondary">
                Already have an admin account?{' '}
                <Link
                  to="/admin/login"
                  style={{
                    color: '#1e3c72',
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  Sign In
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
                  ← Back to User Portal
                </Link>
              </Typography>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default AdminRegister;