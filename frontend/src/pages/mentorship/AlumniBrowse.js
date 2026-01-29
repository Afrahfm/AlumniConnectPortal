import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Chip,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  AppBar,
  Toolbar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
} from '@mui/material';
import {
  Search,
  FilterList,
  Business,
  LocationOn,
  Star,
  Message,
  ArrowBack,
  LinkedIn,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AlumniBrowse = () => {
  const navigate = useNavigate();
  const [alumni, setAlumni] = useState([]);
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [requestDialog, setRequestDialog] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');

  // Mock data - replace with API call
  useEffect(() => {
    const mockAlumni = [
      {
        id: 1,
        firstName: 'Sarah',
        lastName: 'Johnson',
        currentCompany: 'Google',
        position: 'Senior Software Engineer',
        industry: 'Technology',
        experience: 8,
        location: 'San Francisco, CA',
        bio: 'Passionate about mentoring students in software development and career growth.',
        rating: 4.8,
        menteeCount: 15,
        profilePicture: null,
        expertise: ['React', 'Node.js', 'System Design'],
      },
      {
        id: 2,
        firstName: 'Michael',
        lastName: 'Chen',
        currentCompany: 'Microsoft',
        position: 'Product Manager',
        industry: 'Technology',
        experience: 6,
        location: 'Seattle, WA',
        bio: 'Helping students transition from technical roles to product management.',
        rating: 4.9,
        menteeCount: 12,
        profilePicture: null,
        expertise: ['Product Strategy', 'Data Analysis', 'Leadership'],
      },
      {
        id: 3,
        firstName: 'Emily',
        lastName: 'Rodriguez',
        currentCompany: 'Goldman Sachs',
        position: 'Investment Banker',
        industry: 'Finance',
        experience: 10,
        location: 'New York, NY',
        bio: 'Experienced in finance and investment banking, passionate about mentoring.',
        rating: 4.7,
        menteeCount: 20,
        profilePicture: null,
        expertise: ['Investment Banking', 'Financial Analysis', 'Client Relations'],
      },
    ];
    setAlumni(mockAlumni);
    setFilteredAlumni(mockAlumni);
  }, []);

  useEffect(() => {
    let filtered = alumni;

    if (searchTerm) {
      filtered = filtered.filter(
        (person) =>
          person.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          person.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          person.currentCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
          person.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (industryFilter) {
      filtered = filtered.filter((person) => person.industry === industryFilter);
    }

    if (experienceFilter) {
      const exp = parseInt(experienceFilter);
      filtered = filtered.filter((person) => person.experience >= exp);
    }

    setFilteredAlumni(filtered);
  }, [searchTerm, industryFilter, experienceFilter, alumni]);

  const handleSendRequest = async () => {
    try {
      // API call to send mentorship request
      toast.success('Mentorship request sent successfully!');
      setRequestDialog(false);
      setRequestMessage('');
      setSelectedAlumni(null);
    } catch (error) {
      toast.error('Failed to send request. Please try again.');
    }
  };

  const AlumniCard = ({ person }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        sx={{
          height: '100%',
          '&:hover': {
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Avatar
              sx={{ width: 60, height: 60, bgcolor: 'primary.main' }}
            >
              {person.firstName[0]}{person.lastName[0]}
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                {person.firstName} {person.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {person.position}
              </Typography>
              <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                <Business sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {person.currentCompany}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {person.location}
            </Typography>
          </Box>

          <Typography variant="body2" sx={{ mb: 2, minHeight: 40 }}>
            {person.bio}
          </Typography>

          <Box display="flex" flexWrap="wrap" gap={0.5} mb={2}>
            {person.expertise.slice(0, 3).map((skill) => (
              <Chip
                key={skill}
                label={skill}
                size="small"
                variant="outlined"
                color="primary"
              />
            ))}
          </Box>

          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <Rating value={person.rating} precision={0.1} size="small" readOnly />
              <Typography variant="body2" color="text.secondary">
                ({person.rating})
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {person.menteeCount} mentees
            </Typography>
          </Box>

          <Box display="flex" gap={1}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<Message />}
              onClick={() => {
                setSelectedAlumni(person);
                setRequestDialog(true);
              }}
            >
              Request Mentorship
            </Button>
            <IconButton color="primary">
              <LinkedIn />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* App Bar */}
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => navigate('/student/dashboard')}
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Browse Alumni
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        {/* Search and Filters */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  placeholder="Search alumni..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Industry</InputLabel>
                  <Select
                    value={industryFilter}
                    onChange={(e) => setIndustryFilter(e.target.value)}
                    label="Industry"
                  >
                    <MenuItem value="">All Industries</MenuItem>
                    <MenuItem value="Technology">Technology</MenuItem>
                    <MenuItem value="Finance">Finance</MenuItem>
                    <MenuItem value="Healthcare">Healthcare</MenuItem>
                    <MenuItem value="Consulting">Consulting</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Min Experience</InputLabel>
                  <Select
                    value={experienceFilter}
                    onChange={(e) => setExperienceFilter(e.target.value)}
                    label="Min Experience"
                  >
                    <MenuItem value="">Any Experience</MenuItem>
                    <MenuItem value="3">3+ years</MenuItem>
                    <MenuItem value="5">5+ years</MenuItem>
                    <MenuItem value="10">10+ years</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<FilterList />}
                  sx={{ height: 56 }}
                >
                  More Filters
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Results */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          {filteredAlumni.length} Alumni Found
        </Typography>

        <Grid container spacing={3}>
          {filteredAlumni.map((person) => (
            <Grid item xs={12} sm={6} lg={4} key={person.id}>
              <AlumniCard person={person} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Request Dialog */}
      <Dialog
        open={requestDialog}
        onClose={() => setRequestDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Send Mentorship Request to {selectedAlumni?.firstName} {selectedAlumni?.lastName}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Message"
            placeholder="Tell them why you'd like them as a mentor..."
            value={requestMessage}
            onChange={(e) => setRequestMessage(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRequestDialog(false)}>Cancel</Button>
          <Button
            onClick={handleSendRequest}
            variant="contained"
            disabled={!requestMessage.trim()}
          >
            Send Request
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AlumniBrowse;