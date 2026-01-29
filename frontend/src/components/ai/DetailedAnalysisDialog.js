import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import {
  Assessment,
  TrendingUp,
  Psychology,
  Timeline,
  Star
} from '@mui/icons-material';

const DetailedAnalysisDialog = ({ open, onClose }) => {
  const [tabValue, setTabValue] = useState(0);
  const [analysisData] = useState({
    skillProgress: [
      { skill: 'Technical Skills', current: 85, target: 95, trend: '+12%' },
      { skill: 'Communication', current: 78, target: 85, trend: '+8%' },
      { skill: 'Leadership', current: 65, target: 80, trend: '+15%' },
      { skill: 'Problem Solving', current: 82, target: 90, trend: '+10%' }
    ],
    sessionAnalytics: [
      { date: '2024-01-20', topic: 'Career Planning', rating: 5, duration: 45, engagement: 92 },
      { date: '2024-01-15', topic: 'Technical Skills', rating: 4, duration: 60, engagement: 88 },
      { date: '2024-01-10', topic: 'Interview Prep', rating: 5, duration: 30, engagement: 95 }
    ],
    goalTracking: [
      { goal: 'Complete React Certification', progress: 75, deadline: '2024-02-15', status: 'On Track' },
      { goal: 'Build Portfolio Project', progress: 45, deadline: '2024-03-01', status: 'Behind' },
      { goal: 'Network with 5 Professionals', progress: 60, deadline: '2024-02-28', status: 'On Track' }
    ],
    mentorFeedback: [
      { mentor: 'John Doe', feedback: 'Excellent progress in technical skills', rating: 5 },
      { mentor: 'Sarah Wilson', feedback: 'Great improvement in communication', rating: 4 },
      { mentor: 'Mike Johnson', feedback: 'Shows strong leadership potential', rating: 5 }
    ]
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={2}>
          <Assessment color="primary" />
          Detailed Mentorship Analysis
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
            <Tab label="Skill Progress" />
            <Tab label="Session Analytics" />
            <Tab label="Goal Tracking" />
            <Tab label="Mentor Feedback" />
          </Tabs>
        </Box>

        {tabValue === 0 && (
          <Grid container spacing={3}>
            {analysisData.skillProgress.map((skill, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <Typography variant="h6">{skill.skill}</Typography>
                      <Chip label={skill.trend} color="success" size="small" />
                    </Box>
                    <Box mb={2}>
                      <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography variant="body2">Current: {skill.current}%</Typography>
                        <Typography variant="body2">Target: {skill.target}%</Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={skill.current}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {skill.target - skill.current}% to reach target
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {tabValue === 1 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Topic</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Engagement</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {analysisData.sessionAnalytics.map((session, index) => (
                  <TableRow key={index}>
                    <TableCell>{session.date}</TableCell>
                    <TableCell>{session.topic}</TableCell>
                    <TableCell>{session.duration} min</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Star color="warning" fontSize="small" />
                        {session.rating}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={`${session.engagement}%`} 
                        color={session.engagement > 90 ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {tabValue === 2 && (
          <Grid container spacing={3}>
            {analysisData.goalTracking.map((goal, index) => (
              <Grid item xs={12} key={index}>
                <Card>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <Typography variant="h6">{goal.goal}</Typography>
                      <Chip 
                        label={goal.status} 
                        color={goal.status === 'On Track' ? 'success' : 'warning'}
                        size="small"
                      />
                    </Box>
                    <Box mb={2}>
                      <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography variant="body2">Progress: {goal.progress}%</Typography>
                        <Typography variant="body2">Deadline: {goal.deadline}</Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={goal.progress}
                        color={goal.status === 'On Track' ? 'success' : 'warning'}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {tabValue === 3 && (
          <List>
            {analysisData.mentorFeedback.map((feedback, index) => (
              <ListItem key={index} sx={{ mb: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
                <ListItemText
                  primary={
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="subtitle1">{feedback.mentor}</Typography>
                      <Box display="flex" alignItems="center" gap={1}>
                        {[...Array(feedback.rating)].map((_, i) => (
                          <Star key={i} color="warning" fontSize="small" />
                        ))}
                      </Box>
                    </Box>
                  }
                  secondary={feedback.feedback}
                />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained" startIcon={<TrendingUp />}>
          Export Report
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetailedAnalysisDialog;