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
  PersonAdd,
  AccessTime,
  Refresh
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { userAnalyticsService } from '../../services/userAnalyticsService';

const AlumniRegisterDetails = () => {
  const navigate = useNavigate();
  const [recentRegistrations, setRecentRegistrations] = useState([
    { id: 1, name: 'Dr. Sarah Williams', email: 'sarah@techcorp.com', registrationDate: '2024-01-15 3:20 PM', company: 'TechCorp', position: 'Senior Engineer', experience: '8 years' },
    { id: 2, name: 'Prof. David Chen', email: 'david@innovate.com', registrationDate: '2024-01-14 11:45 AM', company: 'Innovate Inc', position: 'CTO', experience: '12 years' },
    { id: 3, name: 'Maria Rodriguez', email: 'maria@startup.io', registrationDate: '2024-01-14 9:30 AM', company: 'StartupIO', position: 'Product Manager', experience: '6 years' }
  ]);

  const fetchRegistrations = () => {
    // In real implementation, this would fetch from the analytics service
    console.log('Refreshing alumni registrations...');
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
            Recent Alumni Registrations
          </Typography>
          <Typography variant="body1" color="text.secondary">
            New alumni accounts and professional details
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
                <Business sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Box>
                  <Typography variant="h4" fontWeight="bold" color="primary.main">
                    245
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Alumni
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
                    12h
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
            Recent Alumni Registrations
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Alumni</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Position</TableCell>
                  <TableCell>Experience</TableCell>
                  <TableCell>Registration Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentRegistrations.map((alumni) => (
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
                    <TableCell>{alumni.company}</TableCell>
                    <TableCell>
                      <Chip label={alumni.position} color="primary" size="small" />
                    </TableCell>
                    <TableCell>{alumni.experience}</TableCell>
                    <TableCell>{alumni.registrationDate}</TableCell>
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

export default AlumniRegisterDetails;