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
  Person,
  AccessTime,
  Refresh,
  Circle
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { userAnalyticsService } from '../../services/userAnalyticsService';

const StudentLoginDetails = () => {
  const navigate = useNavigate();
  const [loggedStudents, setLoggedStudents] = useState([]);

  useEffect(() => {
    fetchLoggedStudents();
  }, []);

  const fetchLoggedStudents = () => {
    const logged = userAnalyticsService.getLoggedUsers();
    setLoggedStudents(logged.students || []);
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
        <School sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Currently Logged Students
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Real-time view of active student sessions
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={fetchLoggedStudents}
          sx={{ ml: 'auto' }}
        >
          Refresh
        </Button>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Person sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Box>
                  <Typography variant="h4" fontWeight="bold" color="primary.main">
                    {loggedStudents.length}
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
                    {loggedStudents.filter(s => s.status === 'online').length}
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
                    {loggedStudents.filter(s => s.status === 'away').length}
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

      {/* Students Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Student Login Sessions
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Login Time</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Session Duration</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loggedStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <Typography variant="body1" fontWeight="bold">
                          {student.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.loginTime}</TableCell>
                    <TableCell>
                      <Chip
                        label={student.status}
                        color={getStatusColor(student.status)}
                        size="small"
                        icon={<Circle sx={{ fontSize: 12 }} />}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {Math.floor(Math.random() * 120) + 10} minutes
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          {loggedStudents.length === 0 && (
            <Box textAlign="center" py={4}>
              <School sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No students currently logged in
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Students will appear here when they log into the platform
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default StudentLoginDetails;