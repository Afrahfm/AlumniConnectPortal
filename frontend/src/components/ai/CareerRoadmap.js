import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Timeline,
  CheckCircle,
  RadioButtonUnchecked,
  School,
  Work,
  Star
} from '@mui/icons-material';

const CareerRoadmap = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [roadmapData] = useState({
    targetRole: 'Senior Software Engineer',
    timeline: '18 months',
    currentStep: 1,
    steps: [
      {
        title: 'Foundation Skills',
        duration: '3 months',
        status: 'completed',
        progress: 100,
        tasks: [
          { task: 'Learn JavaScript fundamentals', completed: true },
          { task: 'Complete HTML/CSS course', completed: true },
          { task: 'Build first portfolio project', completed: true }
        ],
        mentorSessions: 8
      },
      {
        title: 'Frontend Development',
        duration: '4 months',
        status: 'in-progress',
        progress: 65,
        tasks: [
          { task: 'Master React.js', completed: true },
          { task: 'Learn state management (Redux)', completed: true },
          { task: 'Build 3 React projects', completed: false },
          { task: 'Learn testing frameworks', completed: false }
        ],
        mentorSessions: 12
      },
      {
        title: 'Backend & System Design',
        duration: '5 months',
        status: 'upcoming',
        progress: 0,
        tasks: [
          { task: 'Learn Node.js and Express', completed: false },
          { task: 'Database design and optimization', completed: false },
          { task: 'System design fundamentals', completed: false },
          { task: 'Build full-stack applications', completed: false }
        ],
        mentorSessions: 15
      },
      {
        title: 'Advanced Topics & Leadership',
        duration: '4 months',
        status: 'upcoming',
        progress: 0,
        tasks: [
          { task: 'Microservices architecture', completed: false },
          { task: 'DevOps and deployment', completed: false },
          { task: 'Team leadership skills', completed: false },
          { task: 'Technical interview preparation', completed: false }
        ],
        mentorSessions: 10
      },
      {
        title: 'Job Search & Career Transition',
        duration: '2 months',
        status: 'upcoming',
        progress: 0,
        tasks: [
          { task: 'Resume optimization', completed: false },
          { task: 'Interview practice sessions', completed: false },
          { task: 'Networking and applications', completed: false },
          { task: 'Salary negotiation', completed: false }
        ],
        mentorSessions: 6
      }
    ]
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'primary';
      case 'upcoming': return 'default';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle color="success" />;
      case 'in-progress': return <RadioButtonUnchecked color="primary" />;
      case 'upcoming': return <RadioButtonUnchecked color="disabled" />;
      default: return <RadioButtonUnchecked />;
    }
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <Timeline color="primary" />
          <Typography variant="h6">Personalized Career Roadmap</Typography>
          <Chip label={roadmapData.timeline} color="primary" size="small" />
        </Box>

        <Box mb={3}>
          <Typography variant="subtitle1" gutterBottom>
            Target: {roadmapData.targetRole}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            AI-generated roadmap based on your goals and current skills
          </Typography>
        </Box>

        <Stepper activeStep={activeStep} orientation="vertical">
          {roadmapData.steps.map((step, index) => (
            <Step key={index}>
              <StepLabel
                icon={getStatusIcon(step.status)}
                onClick={() => setActiveStep(index)}
                sx={{ cursor: 'pointer' }}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <Typography variant="subtitle2">{step.title}</Typography>
                  <Chip 
                    label={step.status} 
                    color={getStatusColor(step.status)} 
                    size="small" 
                  />
                  <Chip 
                    label={step.duration} 
                    variant="outlined" 
                    size="small" 
                  />
                </Box>
              </StepLabel>
              <StepContent>
                <Box mb={2}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Progress: {step.progress}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={step.progress}
                    sx={{ height: 6, borderRadius: 3, mb: 2 }}
                  />
                </Box>

                <Typography variant="subtitle2" gutterBottom>
                  Key Tasks:
                </Typography>
                <List dense>
                  {step.tasks.map((task, taskIndex) => (
                    <ListItem key={taskIndex} sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        {task.completed ? (
                          <CheckCircle color="success" fontSize="small" />
                        ) : (
                          <RadioButtonUnchecked color="disabled" fontSize="small" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={task.task}
                        primaryTypographyProps={{
                          variant: 'body2',
                          sx: { textDecoration: task.completed ? 'line-through' : 'none' }
                        }}
                      />
                    </ListItem>
                  ))}
                </List>

                <Box display="flex" alignItems="center" gap={2} mt={2}>
                  <Typography variant="caption" color="text.secondary">
                    Recommended mentor sessions: {step.mentorSessions}
                  </Typography>
                  {step.status === 'in-progress' && (
                    <Button size="small" variant="outlined">
                      Find Mentor
                    </Button>
                  )}
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>

        <Box mt={3}>
          <Button variant="contained" startIcon={<Star />} fullWidth>
            Update Roadmap Based on Progress
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CareerRoadmap;