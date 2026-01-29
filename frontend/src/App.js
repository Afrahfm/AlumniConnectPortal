import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminLogin from './pages/auth/AdminLogin';
import AdminRegister from './pages/auth/AdminRegister';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import AlumniDashboard from './pages/dashboard/AlumniDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentLoginDetails from './pages/admin/StudentLoginDetails';
import StudentRegisterDetails from './pages/admin/StudentRegisterDetails';
import AlumniLoginDetails from './pages/admin/AlumniLoginDetails';
import AlumniRegisterDetails from './pages/admin/AlumniRegisterDetails';
import AlumniBrowse from './pages/mentorship/AlumniBrowse';
import Profile from './components/profile/Profile';
import MentorshipRequests from './pages/mentorship/MentorshipRequests';
import ChatInterface from './components/chat/ChatInterface';
import MeetingScheduler from './components/meetings/MeetingScheduler';
import Mentorship from './pages/mentorship/Mentorship';
import Chats from './pages/chat/Chats';
import Meetings from './pages/meetings/Meetings';
import VideoCall from './pages/VideoCall';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/register" element={<AdminRegister />} />
              
              <Route path="/student/dashboard" element={
                <ProtectedRoute allowedRoles={['STUDENT']}>
                  <StudentDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/alumni/dashboard" element={
                <ProtectedRoute allowedRoles={['ALUMNI']}>
                  <AlumniDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/admin/dashboard" element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/admin/student-login-details" element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <StudentLoginDetails />
                </ProtectedRoute>
              } />
              
              <Route path="/admin/student-register-details" element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <StudentRegisterDetails />
                </ProtectedRoute>
              } />
              
              <Route path="/admin/alumni-login-details" element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AlumniLoginDetails />
                </ProtectedRoute>
              } />
              
              <Route path="/admin/alumni-register-details" element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AlumniRegisterDetails />
                </ProtectedRoute>
              } />
              
              <Route path="/browse-alumni" element={
                <ProtectedRoute allowedRoles={['STUDENT']}>
                  <AlumniBrowse />
                </ProtectedRoute>
              } />
              
              <Route path="/mentorship-requests" element={
                <ProtectedRoute allowedRoles={['ALUMNI', 'STUDENT']}>
                  <MentorshipRequests />
                </ProtectedRoute>
              } />
              
              <Route path="/profile" element={
                <ProtectedRoute allowedRoles={['STUDENT', 'ALUMNI', 'ADMIN']}>
                  <Profile />
                </ProtectedRoute>
              } />
              
              <Route path="/chat/:mentorshipId" element={
                <ProtectedRoute allowedRoles={['STUDENT', 'ALUMNI']}>
                  <ChatInterface />
                </ProtectedRoute>
              } />
              
              <Route path="/schedule-meeting/:mentorshipId" element={
                <ProtectedRoute allowedRoles={['STUDENT', 'ALUMNI']}>
                  <MeetingScheduler />
                </ProtectedRoute>
              } />
              
              <Route path="/mentorship" element={
                <ProtectedRoute allowedRoles={['STUDENT']}>
                  <Mentorship />
                </ProtectedRoute>
              } />
              
              <Route path="/chats" element={
                <ProtectedRoute allowedRoles={['STUDENT', 'ALUMNI']}>
                  <Chats />
                </ProtectedRoute>
              } />
              
              <Route path="/meetings" element={
                <ProtectedRoute allowedRoles={['STUDENT', 'ALUMNI']}>
                  <Meetings />
                </ProtectedRoute>
              } />
              
              <Route path="/video-call/:meetingId" element={
                <ProtectedRoute allowedRoles={['STUDENT', 'ALUMNI']}>
                  <VideoCall />
                </ProtectedRoute>
              } />
              
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
            
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;