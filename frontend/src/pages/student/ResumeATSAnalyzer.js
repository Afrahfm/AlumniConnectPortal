import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Alert,
  LinearProgress,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Paper
} from '@mui/material';
import {
  Description,
  Upload,
  AutoAwesome,
  CheckCircle,
  Warning,
  TrendingUp,
  Assessment
} from '@mui/icons-material';

const ResumeATSAnalyzer = () => {
  const [uploadDialog, setUploadDialog] = useState(false);
  const [analysisData, setAnalysisData] = useState({
    resumeScore: 0,
    atsScore: 0,
    hasAnalysis: false,
    strengths: [],
    improvements: [],
    keywords: { present: [], missing: [] }
  });

  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setTimeout(() => {
        setAnalysisData({
          resumeScore: 78,
          atsScore: 65,
          hasAnalysis: true,
          strengths: [
            'Strong technical skills section',
            'Quantified achievements included',
            'Clean formatting and structure',
            'Relevant project experience'
          ],
          improvements: [
            'Add more quantified achievements',
            'Optimize for ATS keywords',
            'Include soft skills section',
            'Add industry-specific terminology'
          ],
          keywords: {
            present: ['JavaScript', 'React', 'Python', 'Git', 'Agile'],
            missing: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'System Design']
          }
        });
        setUploadDialog(false);
      }, 2000);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'error';
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" mb={3}>
          <Description sx={{ mr: 2, color: 'primary.main' }} />
          <Typography variant="h6">AI Resume & ATS Analyzer</Typography>
        </Box>
        
        <Alert severity="info" sx={{ mb: 3 }}>
          Upload your resume to receive AI-driven ATS scores and personalized improvement suggestions to enhance career readiness.
        </Alert>
        
        {!analysisData.hasAnalysis ? (
          <Box textAlign="center" py={4}>
            <Upload sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Upload Your Resume
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Get instant AI analysis and ATS compatibility score
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => setUploadDialog(true)}
              startIcon={<Upload />}
            >
              Upload Resume
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.light', color: 'white' }}>
                <Typography variant="h3" fontWeight="bold">
                  {analysisData.resumeScore}
                </Typography>
                <Typography variant="body1">Overall Score</Typography>
                <Typography variant="caption">Out of 100</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'warning.light', color: 'white' }}>
                <Typography variant="h3" fontWeight="bold">
                  {analysisData.atsScore}
                </Typography>
                <Typography variant="body1">ATS Score</Typography>
                <Typography variant="caption">Compatibility</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'success.light', color: 'white' }}>
                <Typography variant="h3" fontWeight="bold">
                  A-
                </Typography>
                <Typography variant="body1">Grade</Typography>
                <Typography variant="caption">Career Ready</Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom color="success.main">
                <CheckCircle sx={{ mr: 1, verticalAlign: 'middle' }} />
                Strengths Identified
              </Typography>
              <List dense>
                {analysisData.strengths.map((strength, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={strength} />
                  </ListItem>
                ))}
              </List>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom color="warning.main">
                <Warning sx={{ mr: 1, verticalAlign: 'middle' }} />
                Areas for Improvement
              </Typography>
              <List dense>
                {analysisData.improvements.map((improvement, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Warning color="warning" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={improvement} />
                  </ListItem>
                ))}
              </List>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Keyword Analysis
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" color="success.main" gutterBottom>
                    Present Keywords
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {analysisData.keywords.present.map((keyword, index) => (
                      <Chip
                        key={index}
                        label={keyword}
                        color="success"
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" color="warning.main" gutterBottom>
                    Missing Keywords
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {analysisData.keywords.missing.map((keyword, index) => (
                      <Chip
                        key={index}
                        label={keyword}
                        color="warning"
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Alert severity="success" sx={{ mb: 2 }}>
                <AutoAwesome sx={{ mr: 1 }} />
                Your resume shows strong potential! Focus on adding the missing keywords and quantifying more achievements to reach the next level.
              </Alert>
              <Box display="flex" gap={2}>
                <Button variant="contained" startIcon={<TrendingUp />}>
                  Get Detailed Report
                </Button>
                <Button variant="outlined" startIcon={<Assessment />}>
                  Compare with Industry Standards
                </Button>
                <Button variant="outlined" onClick={() => setUploadDialog(true)}>
                  Upload New Version
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}
      </CardContent>

      <Dialog open={uploadDialog} onClose={() => setUploadDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Upload Resume for AI Analysis</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Upload your resume to get instant AI-powered analysis and ATS compatibility score.
          </Typography>
          <Box sx={{ mt: 2, p: 3, border: '2px dashed #ccc', borderRadius: 2, textAlign: 'center' }}>
            <Upload sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
            <Typography variant="body2" gutterBottom>
              Drag and drop your resume here or click to browse
            </Typography>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeUpload}
              style={{ marginTop: 16 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ResumeATSAnalyzer;