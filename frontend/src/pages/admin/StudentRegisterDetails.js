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
  School,
  PersonAdd,
  AccessTime,
  Refresh
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { userAnalyticsService } from '../../services/userAnalyticsService';

const StudentRegisterDetails = () => {
  const navigate = useNavigate();
  const [recentRegistrations, setRecentRegistrations] = useState([
    { id: 1, name: 'Alex Thompson', email: 'alex@student.edu', registrationDate: '2024-01-15 2:30 PM', university: 'MIT', major: 'Computer Science' },
    { id: 2, name: 'Emma Davis', email: 'emma@student.edu', registrationDate: '2024-01-15 1:15 PM', university: 'Stanford', major: 'Data Science' },
    { id: 3, name: 'Ryan Wilson', email: 'ryan@student.edu', registrationDate: '2024-01-14 4:45 PM', university: 'Berkeley', major: 'Software Engineering' }
  ]);

  const fetchRegistrations = () => {
    // In real implementation, this would fetch from the analytics service
    console.log('Refreshing student registrations...');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton onClick={() => navigate('/admin/dashboard')} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <PersonAdd sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Recent Student Registrations
          </Typography>
          <Typography variant="body1" color="text.secondary">
            New student accounts and registration details
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={fetchRegistrations}
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
                <PersonAdd sx={{ fontSize: 40, color: 'success.main', mr: 2 }} />
                <Box>
                  <Typography variant="h4" fontWeight="bold" color="success.main">
                    {recentRegistrations.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    This Week
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
                <School sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Box>
                  <Typography variant="h4" fontWeight="bold" color="primary.main">
                    892
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Students
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
                    24h
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Latest Registration
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
            Recent Student Registrations
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>University</TableCell>
                  <TableCell>Major</TableCell>
                  <TableCell>Registration Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentRegistrations.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <Typography variant="body1" fontWeight="bold">
                          {student.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.university}</TableCell>
                    <TableCell>
                      <Chip label={student.major} color="primary" size="small" />
                    </TableCell>
                    <TableCell>{student.registrationDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Container>
  );
};

export default StudentRegisterDetails;