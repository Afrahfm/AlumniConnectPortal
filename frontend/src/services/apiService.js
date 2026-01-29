import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:9999';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/api/auth/login', credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/api/auth/register', userData);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/api/auth/me');
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export const userService = {
  getAllUsers: async () => {
    const response = await api.get('/api/users');
    return response.data;
  },

  getAlumni: async () => {
    const response = await api.get('/api/users/alumni');
    return response.data;
  },

  updateProfile: async (userId, profileData) => {
    const response = await api.put(`/api/users/${userId}`, profileData);
    return response.data;
  },

  verifyAlumni: async (userId) => {
    const response = await api.put(`/api/users/${userId}/verify`);
    return response.data;
  }
};

export const mentorshipService = {
  sendRequest: async (mentorshipData) => {
    const response = await api.post('/api/mentorships', mentorshipData);
    return response.data;
  },

  getMyMentorships: async () => {
    const response = await api.get('/api/mentorships/my');
    return response.data;
  },

  updateMentorshipStatus: async (mentorshipId, status, responseMessage) => {
    const response = await api.put(`/api/mentorships/${mentorshipId}/status`, {
      status,
      responseMessage
    });
    return response.data;
  },

  rateMentorship: async (mentorshipId, rating, feedback) => {
    const response = await api.put(`/api/mentorships/${mentorshipId}/rate`, {
      rating,
      feedback
    });
    return response.data;
  }
};

export const chatService = {
  getMessages: async (mentorshipId) => {
    const response = await api.get(`/api/chats/${mentorshipId}/messages`);
    return response.data;
  },

  sendMessage: async (mentorshipId, messageData) => {
    const response = await api.post(`/api/chats/${mentorshipId}/messages`, messageData);
    return response.data;
  },

  markAsRead: async (messageId) => {
    const response = await api.put(`/api/chats/messages/${messageId}/read`);
    return response.data;
  }
};

export const meetingService = {
  scheduleMeeting: async (meetingData) => {
    const response = await api.post('/api/meetings', meetingData);
    return response.data;
  },

  getMyMeetings: async () => {
    const response = await api.get('/api/meetings/my');
    return response.data;
  },

  updateMeetingStatus: async (meetingId, status) => {
    const response = await api.put(`/api/meetings/${meetingId}/status`, { status });
    return response.data;
  },

  joinMeeting: async (meetingId) => {
    const response = await api.put(`/api/meetings/${meetingId}/join`);
    return response.data;
  }
};

export const adminService = {
  getAnalytics: async () => {
    const response = await api.get('/api/admin/analytics');
    return response.data;
  },

  getMentorshipContinuity: async () => {
    const response = await api.get('/api/admin/analytics/mentorship-continuity');
    return response.data;
  },

  getEffectivenessAnalytics: async () => {
    const response = await api.get('/api/admin/analytics/effectiveness');
    return response.data;
  },

  getRiskAssessment: async () => {
    const response = await api.get('/api/admin/analytics/risk-assessment');
    return response.data;
  },

  getMentorLoadBalancing: async () => {
    const response = await api.get('/api/admin/analytics/mentor-load-balancing');
    return response.data;
  },

  getProgramInsights: async () => {
    const response = await api.get('/api/admin/analytics/program-insights');
    return response.data;
  },

  autoBalanceMentors: async () => {
    const response = await api.post('/api/admin/auto-balance-mentors');
    return response.data;
  },

  getAllMentorships: async () => {
    const response = await api.get('/api/admin/mentorships');
    return response.data;
  },

  getAllMeetings: async () => {
    const response = await api.get('/api/admin/meetings');
    return response.data;
  }
};

export default api;