import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Alert,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import {
  Warning,
  Error,
  Info,
  Refresh,
  ContactSupport,
  Send
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const RiskAssessment = () => {
  const [riskData, setRiskData] = useState({});
  const [loading, setLoading] = useState(true);
  const [interventionDialog, setInterventionDialog] = useState(false);
  const [selectedMentorship, setSelectedMentorship] = useState(null);
  const [interventionMessage, setInterventionMessage] = useState('');

  useEffect(() => {
    fetchRiskAssessment();
  }, []);

  const fetchRiskAssessment = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/analytics/risk-assessment');
      const data = await response.json();
      setRiskData(data);
    } catch (error) {
      console.error('Error fetching risk assessment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleIntervention = (mentorship) => {
    setSelectedMentorship(mentorship);
    setInterventionDialog(true);
  };

  const sendIntervention = async () => {
    // In real implementation, this would send intervention message
    console.log('Sending intervention:', interventionMessage);
    setInterventionDialog(false);
    setInterventionMessage('');
  };

  const getRiskLevelColor = (level) => {
    switch (level) {
      case 'HIGH': return 'error';
      case 'MEDIUM': return 'warning';
      case 'LOW': return 'info';
      default: return 'default';
    }
  };

  const getRiskIcon = (level) => {
    switch (level) {
      case 'HIGH': return <Error color="error" />;
      case 'MEDIUM': return <Warning color="warning" />;
      case 'LOW': return <Info color="info" />;
      default: return <Info />;
    }
  };

  if (loading) {
    return <Box p={3}><Typography>Loading risk assessment...</Typography></Box>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5">
              <Warning sx={{ mr: 1, verticalAlign: 'middle' }} />
              Predictive Risk Assessment
            </Typography>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={fetchRiskAssessment}
            >
              Refresh Analysis
            </Button>
          </Box>
        </Grid>

        {/* Risk Overview Alert */}
        <Grid item xs={12}>
          <Alert 
            severity={
              riskData.totalAtRisk > 10 ? "error" : 
              riskData.totalAtRisk > 5 ? "warning" : 
              riskData.totalAtRisk > 0 ? "info" : "success"
            }
            sx={{ mb: 3 }}
          >
            <Typography variant="h6">
              Risk Assessment Summary: {riskData.totalAtRisk || 0} mentorships identified as at-risk 
              ({riskData.riskPercentage || 0}% of active mentorships)
            </Typography>
            <Typography variant="body2">
              {riskData.totalAtRisk > 10 
                ? "Critical: Immediate intervention required for multiple mentorships."
                : riskData.totalAtRisk > 5
                ? "Warning: Several mentorships need attention to prevent dropout."
                : riskData.totalAtRisk > 0
                ? "Monitor: Some mentorships showing early warning signs."
                : "Excellent: All mentorships are performing well."
              }
            </Typography>
          </Alert>
        </Grid>

        {/* Risk Level Distribution */}
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" color="error.main" gutterBottom>
                <Error sx={{ mr: 1, verticalAlign: 'middle' }} />
                High Risk
              </Typography>
              <Typography variant="h3" color="error.main">
                {(riskData.atRiskMentorships || []).filter(m => m.riskLevel === 'HIGH').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Immediate intervention needed
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" color="warning.main" gutterBottom>
                <Warning sx={{ mr: 1, verticalAlign: 'middle' }} />
                Medium Risk
              </Typography>
              <Typography variant="h3" color="warning.main">
                {(riskData.atRiskMentorships || []).filter(m => m.riskLevel === 'MEDIUM').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Monitor closely
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" color="info.main" gutterBottom>
                <Info sx={{ mr: 1, verticalAlign: 'middle' }} />
                Low Risk
              </Typography>
              <Typography variant="h3" color="info.main">
                {(riskData.atRiskMentorships || []).filter(m => m.riskLevel === 'LOW').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Early warning signs
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* At-Risk Mentorships Table */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                At-Risk Mentorships Details
              </Typography>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Risk Level</TableCell>
                      <TableCell>Mentor</TableCell>
                      <TableCell>Mentee</TableCell>
                      <TableCell>Risk Score</TableCell>
                      <TableCell>Risk Factors</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(riskData.atRiskMentorships || []).map((mentorship, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            {getRiskIcon(mentorship.riskLevel)}
                            <Chip 
                              label={mentorship.riskLevel} 
                              color={getRiskLevelColor(mentorship.riskLevel)}
                              size="small"
                              sx={{ ml: 1 }}
                            />
                          </Box>
                        </TableCell>
                        <TableCell>{mentorship.mentorName}</TableCell>
                        <TableCell>{mentorship.menteeName}</TableCell>
                        <TableCell>
                          <Typography 
                            variant="body2" 
                            color={mentorship.riskScore >= 70 ? 'error.main' : 'warning.main'}
                            fontWeight="bold"
                          >
                            {mentorship.riskScore}/100
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box>
                            {(mentorship.riskReasons || []).map((reason, i) => (
                              <Chip 
                                key={i} 
                                label={reason} 
                                size="small" 
                                variant="outlined"
                                sx={{ mr: 0.5, mb: 0.5 }} 
                              />
                            ))}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            color="primary"
                            onClick={() => handleIntervention(mentorship)}
                            title="Send Intervention"
                          >
                            <ContactSupport />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {(riskData.atRiskMentorships || []).length === 0 && (
                <Box textAlign="center" py={4}>
                  <Typography variant="h6" color="success.main">
                    🎉 No at-risk mentorships detected!
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    All mentorships are performing well.
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Risk Factors Analysis */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Common Risk Factors & Prevention Strategies
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle2" color="error.main" gutterBottom>
                        🚨 High-Risk Indicators
                      </Typography>
                      <ul style={{ margin: 0, paddingLeft: 20 }}>
                        <li>No interaction for 14+ days</li>
                        <li>Less than 2 meetings completed</li>
                        <li>Mentorship duration over 6 months</li>
                        <li>No recorded feedback or ratings</li>
                      </ul>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle2" color="success.main" gutterBottom>
                        ✅ Prevention Strategies
                      </Typography>
                      <ul style={{ margin: 0, paddingLeft: 20 }}>
                        <li>Weekly check-in reminders</li>
                        <li>Automated meeting scheduling</li>
                        <li>Progress milestone tracking</li>
                        <li>Early intervention protocols</li>
                      </ul>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Intervention Dialog */}
      <Dialog 
        open={interventionDialog} 
        onClose={() => setInterventionDialog(false)} 
        maxWidth="sm" 
        fullWidth
      >
        <DialogTitle>
          Send Intervention Message
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Sending intervention to: {selectedMentorship?.mentorName} and {selectedMentorship?.menteeName}
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Intervention Message"
            value={interventionMessage}
            onChange={(e) => setInterventionMessage(e.target.value)}
            placeholder="Write a supportive message to help get the mentorship back on track..."
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInterventionDialog(false)}>Cancel</Button>
          <Button
            onClick={sendIntervention}
            variant="contained"
            startIcon={<Send />}
            disabled={!interventionMessage.trim()}
          >
            Send Intervention
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};

export default RiskAssessment;