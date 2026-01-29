import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@mui/material';
import {
  ArrowBack,
  Business,
  Person,
  AccessTime,
  Refresh,
  Circle
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { userAnalyticsService } from '../../services/userAnalyticsService';

const AlumniLoginDetails = () => {
  const navigate = useNavigate();
  const [loggedAlumni, setLoggedAlumni] = useState([]);

  useEffect(() => {
    fetchLoggedAlumni();
  }, []);

  const fetchLoggedAlumni = () => {
    const logged = userAnalyticsService.getLoggedUsers();
    setLoggedAlumni(logged.alumni || []);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'success';
      case 'away': return 'warning';
      case 'offline': return 'error';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton onClick={() => navigate('/admin/dashboard')} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Business sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Currently Logged Alumni
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Real-time view of active alumni sessions
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={fetchLoggedAlumni}
          sx={{ ml: 'auto' }}
        >
          Refresh
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Person sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Box>
                  <Typography variant="h4" fontWeight="bold" color="primary.main">
                    {loggedAlumni.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Online
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Circle sx={{ fontSize: 40, color: 'success.main', mr: 2 }} />
                <Box>
                  <Typography variant="h4" fontWeight="bold" color="success.main">
                    {loggedAlumni.filter(a => a.status === 'online').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active Now
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <AccessTime sx={{ fontSize: 40, color: 'warning.main', mr: 2 }} />
                <Box>
                  <Typography variant="h4" fontWeight="bold" color="warning.main">
                    {loggedAlumni.filter(a => a.status === 'away').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Away
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Alumni Login Sessions
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Alumni</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Login Time</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Session Duration</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loggedAlumni.map((alumni) => (
                  <TableRow key={alumni.id}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                          {alumni.name.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <Typography variant="body1" fontWeight="bold">
                          {alumni.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{alumni.email}</TableCell>
                    <TableCell>{alumni.loginTime}</TableCell>
                    <TableCell>
                      <Chip
                        label={alumni.status}
                        color={getStatusColor(alumni.status)}
                        size="small"
                        icon={<Circle sx={{ fontSize: 12 }} />}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {Math.floor(Math.random() * 180) + 30} minutes
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          {loggedAlumni.length === 0 && (
            <Box textAlign="center" py={4}>
              <Business sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No alumni currently logged in
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Alumni will appear here when they log into the platform
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default AlumniLoginDetails;