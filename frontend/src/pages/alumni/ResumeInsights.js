import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Alert,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  Divider
} from '@mui/material';
import {
  Description,
  AutoAwesome,
  CheckCircle,
  Warning,
  TrendingUp,
  School,
  Work,
  Star,
  ExpandMore,
  Upload,
  Feedback,
  Psychology
} from '@mui/icons-material';

const ResumeInsights = () => {
  const [selectedMentee, setSelectedMentee] = useState(null);
  const [feedbackDialog, setFeedbackDialog] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [aiValidation, setAiValidation] = useState(null);

  const menteeResumes = [
    {
      id: 1,
      name: 'Sarah Chen',
      lastUpdated: '2024-01-15',
      aiScore: 85,
      analysis: {
        strengths: [
          'Strong technical skills section',
          'Quantified achievements',
          'Relevant project experience',
          'Clean formatting and structure'
        ],
        improvements: [
          'Add more leadership examples',
          'Include soft skills',
          'Expand on impact metrics',
          'Add industry keywords'
        ],
        keywords: {
          present: ['React', 'Node.js', 'Python', 'AWS', 'Git'],
          missing: ['Docker', 'Kubernetes', 'CI/CD', 'Agile', 'Scrum']
        },
        sections: {
          summary: { score: 80, feedback: 'Good technical focus, could add career objectives' },
          experience: { score: 90, feedback: 'Excellent quantified achievements' },
          skills: { score: 85, feedback: 'Comprehensive but missing some trending technologies' },
          education: { score: 95, feedback: 'Well presented with relevant coursework' }
        }
      },
      mentorFeedback: [
        {
          date: '2024-01-10',
          feedback: 'Great improvement on technical skills section. Consider adding more project details.',
          rating: 4
        }
      ]
    },
    {
      id: 2,
      name: 'Mike Johnson',
      lastUpdated: '2024-01-12',
      aiScore: 78,
      analysis: {
        strengths: [
          'Strong leadership experience',
          'Good education background',
          'Clear career progression',
          'Professional summary'
        ],
        improvements: [
          'Add technical certifications',
          'Include more metrics',
          'Expand project descriptions',
          'Update skills section'
        ],
        keywords: {
          present: ['Management', 'Leadership', 'Strategy', 'Team Building'],
          missing: ['Digital Transformation', 'Data Analytics', 'Process Improvement']
        },
        sections: {
          summary: { score: 85, feedback: 'Strong leadership focus' },
          experience: { score: 75, feedback: 'Could use more quantified results' },
          skills: { score: 70, feedback: 'Needs more technical skills' },
          education: { score: 90, feedback: 'Excellent academic background' }
        }
      },
      mentorFeedback: []
    }
  ];

  const handleProvideFeedback = () => {
    if (feedback.trim() && selectedMentee) {
      // Simulate AI validation
      setAiValidation({
        sentiment: 'Positive',
        constructiveness: 92,
        suggestions: [
          'Consider adding specific examples to support your feedback',
          'Your feedback aligns well with industry standards',
          'Mentee is likely to respond positively to this guidance'
        ]
      });
    }
  };

  const submitFeedback = () => {
    // Add feedback to mentee record
    setFeedbackDialog(false);
    setFeedback('');
    setAiValidation(null);
  };

  const ResumeAnalysisCard = ({ mentee }) => (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box display="flex" alignItems="center">
            <Description sx={{ mr: 2, color: 'primary.main' }} />
            <Box>
              <Typography variant="h6">{mentee.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                Last updated: {mentee.lastUpdated}
              </Typography>
            </Box>
          </Box>
          <Box textAlign="center">
            <Typography variant="h4" color="primary.main" fontWeight="bold">
              {mentee.aiScore}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              AI Score
            </Typography>
          </Box>
        </Box>

        <Box mb={3}>
          <Typography variant="subtitle2" gutterBottom>Overall Resume Strength</Typography>
          <LinearProgress
            variant="determinate"
            value={mentee.aiScore}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>

        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="success.main" gutterBottom>
              Strengths Identified
            </Typography>
            <List dense>
              {mentee.analysis.strengths.map((strength, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemIcon>
                    <CheckCircle color="success" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={strength} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="warning.main" gutterBottom>
              Areas for Improvement
            </Typography>
            <List dense>
              {mentee.analysis.improvements.map((improvement, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemIcon>
                    <Warning color="warning" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={improvement} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="subtitle1">Detailed Section Analysis</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {Object.entries(mentee.analysis.sections).map(([section, data]) => (
                <Grid item xs={12} sm={6} key={section}>
                  <Box mb={2}>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="subtitle2" sx={{ textTransform: 'capitalize' }}>
                        {section}
                      </Typography>
                      <Typography variant="body2" color="primary">
                        {data.score}/100
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={data.score}
                      sx={{ height: 6, borderRadius: 3, mb: 1 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {data.feedback}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="subtitle1">Keyword Analysis</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="success.main" gutterBottom>
                  Present Keywords
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                  {mentee.analysis.keywords.present.map((keyword, index) => (
                    <Chip key={index} label={keyword} color="success" size="small" />
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="warning.main" gutterBottom>
                  Recommended Keywords
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {mentee.analysis.keywords.missing.map((keyword, index) => (
                    <Chip key={index} label={keyword} color="warning" size="small" />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle2">
            Previous Feedback: {mentee.mentorFeedback.length} entries
          </Typography>
          <Button
            variant="contained"
            startIcon={<Feedback />}
            onClick={() => {
              setSelectedMentee(mentee);
              setFeedbackDialog(true);
            }}
          >
            Provide Feedback
          </Button>
        </Box>

        {mentee.mentorFeedback.length > 0 && (
          <Box mt={2}>
            <Typography variant="subtitle2" gutterBottom>Latest Feedback</Typography>
            <Card variant="outlined">
              <CardContent sx={{ py: 2 }}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="caption" color="text.secondary">
                    {mentee.mentorFeedback[0].date}
                  </Typography>
                  <Rating value={mentee.mentorFeedback[0].rating} size="small" readOnly />
                </Box>
                <Typography variant="body2">
                  {mentee.mentorFeedback[0].feedback}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" alignItems="center" mb={3}>
        <Description sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Resume Insights & Feedback
          </Typography>
          <Typography variant="body1" color="text.secondary">
            AI-powered resume analysis and mentoring feedback system
          </Typography>
        </Box>
      </Box>

      <Alert severity="info" sx={{ mb: 3 }}>
        <Box display="flex" alignItems="center">
          <AutoAwesome sx={{ mr: 1 }} />
          AI analyzes resumes for industry standards, keyword optimization, and improvement opportunities
        </Box>
      </Alert>

      {menteeResumes.map((mentee) => (
        <ResumeAnalysisCard key={mentee.id} mentee={mentee} />
      ))}

      {/* Feedback Dialog */}
      <Dialog open={feedbackDialog} onClose={() => setFeedbackDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <Feedback sx={{ mr: 1 }} />
            Provide Resume Feedback for {selectedMentee?.name}
          </Box>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Your Feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            sx={{ mt: 2, mb: 2 }}
            placeholder="Provide constructive feedback on the resume..."
          />
          
          <Button
            variant="outlined"
            startIcon={<Psychology />}
            onClick={handleProvideFeedback}
            sx={{ mb: 2 }}
          >
            Validate with AI
          </Button>

          {aiValidation && (
            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  AI Feedback Validation
                </Typography>
                <Box display="flex" alignItems="center" mb={2}>
                  <Typography variant="body2" sx={{ mr: 2 }}>
                    Sentiment: <Chip label={aiValidation.sentiment} color="success" size="small" />
                  </Typography>
                  <Typography variant="body2">
                    Constructiveness: {aiValidation.constructiveness}%
                  </Typography>
                </Box>
                <Typography variant="subtitle2" gutterBottom>AI Suggestions:</Typography>
                <List dense>
                  {aiValidation.suggestions.map((suggestion, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <AutoAwesome color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={suggestion} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFeedbackDialog(false)}>Cancel</Button>
          <Button onClick={submitFeedback} variant="contained" disabled={!feedback.trim()}>
            Submit Feedback
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ResumeInsights;