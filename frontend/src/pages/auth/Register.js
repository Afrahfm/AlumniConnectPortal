import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  Grid,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import {
  Person,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  School,
  Business,
  LocationOn,
  Phone,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { userAnalyticsService } from '../../services/userAnalyticsService';
import { toast } from 'react-toastify';

const Register = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    university: '',
    graduationYear: '',
    major: '',
    currentCompany: '',
    position: '',
    experience: '',
    industry: '',
    location: '',
    phone: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const steps = ['Basic Info', 'Role Selection', 'Additional Details'];

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
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
      
      // Record registration event
      if (formData.role === 'STUDENT') {
        userAnalyticsService.recordRegistration('students');
      } else if (formData.role === 'ALUMNI') {
        userAnalyticsService.recordRegistration('alumni');
      }
      
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
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
                label="Email Address"
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
          </Grid>
        );
      
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom textAlign="center">
              Choose Your Role
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {[
                { value: 'STUDENT', label: 'Student', icon: School, desc: 'Looking for mentorship' },
                { value: 'ALUMNI', label: 'Alumni', icon: Business, desc: 'Ready to mentor students' },
              ].map((role) => (
                <Grid item xs={12} sm={6} key={role.value}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      border: formData.role === role.value ? 2 : 1,
                      borderColor: formData.role === role.value ? 'primary.main' : 'grey.300',
                      '&:hover': { borderColor: 'primary.main' },
                    }}
                    onClick={() => setFormData({ ...formData, role: role.value })}
                  >
                    <CardContent sx={{ textAlign: 'center', py: 3 }}>
                      <role.icon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
                      <Typography variant="h6">{role.label}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {role.desc}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        );
      
      case 2:
        return (
          <Grid container spacing={2}>
            {formData.role === 'STUDENT' ? (
              <>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="University"
                    value={formData.university}
                    onChange={handleChange('university')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <School color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Graduation Year"
                    type="number"
                    value={formData.graduationYear}
                    onChange={handleChange('graduationYear')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Major"
                    value={formData.major}
                    onChange={handleChange('major')}
                  />
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Current Company"
                    value={formData.currentCompany}
                    onChange={handleChange('currentCompany')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Business color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Position"
                    value={formData.position}
                    onChange={handleChange('position')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Years of Experience"
                    type="number"
                    value={formData.experience}
                    onChange={handleChange('experience')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Industry"
                    value={formData.industry}
                    onChange={handleChange('industry')}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                value={formData.location}
                onChange={handleChange('location')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
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
          </Grid>
        );
      
      default:
        return null;
    }
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
      <Container component="main" maxWidth="md">
        <Paper elevation={24} sx={{ padding: 4, borderRadius: 3 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" fontWeight="bold" color="primary">
              Join Alumni Connect
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Create your account to start your mentorship journey
            </Typography>
          </Box>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            {renderStepContent(activeStep)}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
              >
                Back
              </Button>
              
              {activeStep === steps.length - 1 ? (
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
                  }}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  variant="contained"
                  disabled={
                    (activeStep === 0 && (!formData.firstName || !formData.lastName || !formData.email || !formData.password)) ||
                    (activeStep === 1 && !formData.role)
                  }
                >
                  Next
                </Button>
              )}
            </Box>
          </Box>

          <Box textAlign="center" sx={{ mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Link
                to="/login"
                style={{
                  color: '#2563eb',
                  textDecoration: 'none',
                  fontWeight: 600,
                }}
              >
                Sign In
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;