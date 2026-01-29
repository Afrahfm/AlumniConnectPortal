import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
  Box,
  Chip,
  Divider,
  Alert
} from '@mui/material';
import { PhotoCamera, Save, Edit } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/apiService';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
    university: '',
    graduationYear: '',
    major: '',
    currentCompany: '',
    position: '',
    experience: '',
    industry: '',
    location: '',
    linkedinProfile: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        bio: user.bio || '',
        university: user.university || '',
        graduationYear: user.graduationYear || '',
        major: user.major || '',
        currentCompany: user.currentCompany || '',
        position: user.position || '',
        experience: user.experience || '',
        industry: user.industry || '',
        location: user.location || '',
        linkedinProfile: user.linkedinProfile || ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const updatedUser = await userService.updateProfile(user.id, formData);
      updateUser(updatedUser);
      setEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Profile update error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phone: user.phone || '',
      bio: user.bio || '',
      university: user.university || '',
      graduationYear: user.graduationYear || '',
      major: user.major || '',
      currentCompany: user.currentCompany || '',
      position: user.position || '',
      experience: user.experience || '',
      industry: user.industry || '',
      location: user.location || '',
      linkedinProfile: user.linkedinProfile || ''
    });
    setEditing(false);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" component="h1">
            My Profile
          </Typography>
          {!editing ? (
            <Button
              variant="contained"
              startIcon={<Edit />}
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </Button>
          ) : (
            <Box>
              <Button
                variant="outlined"
                onClick={handleCancel}
                sx={{ mr: 1 }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={handleSave}
                disabled={loading}
              >
                Save Changes
              </Button>
            </Box>
          )}
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar
                sx={{ width: 120, height: 120, mb: 2 }}
                src={user.profilePicture}
              >
                {user.firstName?.[0]}{user.lastName?.[0]}
              </Avatar>
              {editing && (
                <Button
                  variant="outlined"
                  startIcon={<PhotoCamera />}
                  size="small"
                >
                  Change Photo
                </Button>
              )}
              <Box mt={2}>
                <Chip
                  label={user.role}
                  color={user.role === 'ALUMNI' ? 'primary' : 'secondary'}
                  variant="outlined"
                />
                {user.isVerified && (
                  <Chip
                    label="Verified"
                    color="success"
                    size="small"
                    sx={{ ml: 1 }}
                  />
                )}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  disabled={!editing}
                  variant={editing ? "outlined" : "filled"}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  disabled={!editing}
                  variant={editing ? "outlined" : "filled"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  disabled={true}
                  variant="filled"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!editing}
                  variant={editing ? "outlined" : "filled"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  disabled={!editing}
                  variant={editing ? "outlined" : "filled"}
                  multiline
                  rows={3}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Education & Career
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="University"
              name="university"
              value={formData.university}
              onChange={handleInputChange}
              disabled={!editing}
              variant={editing ? "outlined" : "filled"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Graduation Year"
              name="graduationYear"
              type="number"
              value={formData.graduationYear}
              onChange={handleInputChange}
              disabled={!editing}
              variant={editing ? "outlined" : "filled"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Major"
              name="major"
              value={formData.major}
              onChange={handleInputChange}
              disabled={!editing}
              variant={editing ? "outlined" : "filled"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Industry"
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
              disabled={!editing}
              variant={editing ? "outlined" : "filled"}
            />
          </Grid>
          {user.role === 'ALUMNI' && (
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Current Company"
                  name="currentCompany"
                  value={formData.currentCompany}
                  onChange={handleInputChange}
                  disabled={!editing}
                  variant={editing ? "outlined" : "filled"}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  disabled={!editing}
                  variant={editing ? "outlined" : "filled"}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Years of Experience"
                  name="experience"
                  type="number"
                  value={formData.experience}
                  onChange={handleInputChange}
                  disabled={!editing}
                  variant={editing ? "outlined" : "filled"}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              disabled={!editing}
              variant={editing ? "outlined" : "filled"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="LinkedIn Profile"
              name="linkedinProfile"
              value={formData.linkedinProfile}
              onChange={handleInputChange}
              disabled={!editing}
              variant={editing ? "outlined" : "filled"}
            />
          </Grid>
        </Grid>

        {user.role === 'ALUMNI' && !user.isVerified && (
          <Alert severity="warning" sx={{ mt: 3 }}>
            Your alumni status is pending verification. Please contact the admin to verify your profile.
          </Alert>
        )}
      </Paper>
    </Container>
  );
};

export default Profile;