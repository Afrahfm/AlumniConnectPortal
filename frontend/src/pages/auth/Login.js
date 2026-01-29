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
  Divider,
  Card,
  CardContent,
} from '@mui/material';
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  School,
  Business,
  AdminPanelSettings,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { userAnalyticsService } from '../../services/userAnalyticsService';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const user = await login(email, password);
      
      // Record login event and add to logged users
      if (user.role === 'STUDENT') {
        userAnalyticsService.recordLogin('students');
        userAnalyticsService.addLoggedUser('students', {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email
        });
      } else if (user.role === 'ALUMNI') {
        userAnalyticsService.recordLogin('alumni');
        userAnalyticsService.addLoggedUser('alumni', {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email
        });
      }
      
      toast.success('Login successful!');
      
      // Redirect based on role
      switch (user.role) {
        case 'STUDENT':
          navigate('/student/dashboard');
          break;
        case 'ALUMNI':
          navigate('/alumni/dashboard');
          break;
        case 'ADMIN':
          navigate('/admin/dashboard');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <Container component="main" maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Box
            sx={{
              display: 'flex',
              gap: 4,
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {/* Left Side - Welcome */}
            <motion.div variants={itemVariants}>
              <Card
                sx={{
                  maxWidth: 400,
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h3" gutterBottom fontWeight="bold">
                    Welcome to Alumni Connect
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
                    Connecting students with alumni for meaningful mentorship relationships
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <School sx={{ color: '#60a5fa' }} />
                      <Typography>Students: Find your mentor</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Business sx={{ color: '#a78bfa' }} />
                      <Typography>Alumni: Share your expertise</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <AdminPanelSettings sx={{ color: '#fbbf24' }} />
                      <Typography>Admins: Manage the platform</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right Side - Login Form */}
            <motion.div variants={itemVariants}>
              <Paper
                elevation={24}
                sx={{
                  padding: 4,
                  maxWidth: 400,
                  width: '100%',
                  borderRadius: 3,
                }}
              >
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Typography variant="h4" fontWeight="bold" color="primary">
                    Sign In
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Enter your credentials to access your account
                  </Typography>
                </Box>
                
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {error}
                    </Alert>
                  </motion.div>
                )}
                
                <Box component="form" onSubmit={handleSubmit}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 2 }}
                  />
                  
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="primary" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 3 }}
                  />
                  
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{
                      mb: 2,
                      py: 1.5,
                      background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #1d4ed8 30%, #5b21b6 90%)',
                      },
                    }}
                  >
                    {loading ? 'Signing In...' : 'Sign In'}
                  </Button>
                  
                  <Divider sx={{ my: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      OR
                    </Typography>
                  </Divider>
                  
                  <Box textAlign="center">
                    <Typography variant="body2" color="text.secondary">
                      Don't have an account?{' '}
                      <Link
                        to="/register"
                        style={{
                          color: '#2563eb',
                          textDecoration: 'none',
                          fontWeight: 600,
                        }}
                      >
                        Sign Up
                      </Link>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      <Link
                        to="/admin/login"
                        style={{
                          color: '#dc004e',
                          textDecoration: 'none',
                          fontSize: '0.875rem'
                        }}
                      >
                        Admin Portal →
                      </Link>
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Login;