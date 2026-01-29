# Alumni Connect Portal - Folder Structure

## Backend Structure (`/backend`) - Spring Boot

```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── alumniconnect/
│   │   │           └── portal/
│   │   │               ├── AlumniConnectPortalApplication.java # Main Spring Boot class
│   │   │               ├── config/
│   │   │               │   ├── WebConfig.java          # CORS and web configuration
│   │   │               │   ├── SecurityConfig.java     # Spring Security configuration
│   │   │               │   └── WebSocketConfig.java    # WebSocket configuration
│   │   │               ├── controller/
│   │   │               │   ├── AuthController.java     # Authentication endpoints
│   │   │               │   ├── UserController.java     # User management endpoints
│   │   │               │   ├── MentorshipController.java # Mentorship endpoints
│   │   │               │   ├── ChatController.java     # Chat endpoints
│   │   │               │   ├── MeetingController.java  # Meeting endpoints
│   │   │               │   └── AdminController.java    # Admin endpoints
│   │   │               ├── dto/
│   │   │               │   ├── LoginRequest.java       # Login request DTO
│   │   │               │   ├── RegisterRequest.java    # Registration request DTO
│   │   │               │   ├── UserResponse.java       # User response DTO
│   │   │               │   └── ChatMessage.java        # Chat message DTO
│   │   │               ├── entity/
│   │   │               │   ├── User.java               # User entity (JPA)
│   │   │               │   ├── Mentorship.java         # Mentorship entity
│   │   │               │   ├── Chat.java               # Chat entity
│   │   │               │   ├── Meeting.java            # Meeting entity
│   │   │               │   └── Notification.java       # Notification entity
│   │   │               ├── repository/
│   │   │               │   ├── UserRepository.java     # User data access
│   │   │               │   ├── MentorshipRepository.java # Mentorship data access
│   │   │               │   ├── ChatRepository.java     # Chat data access
│   │   │               │   └── MeetingRepository.java  # Meeting data access
│   │   │               ├── service/
│   │   │               │   ├── AuthService.java        # Authentication service
│   │   │               │   ├── UserService.java        # User service
│   │   │               │   ├── MentorshipService.java  # Mentorship service
│   │   │               │   ├── ChatService.java        # Chat service
│   │   │               │   └── MeetingService.java     # Meeting service
│   │   │               ├── security/
│   │   │               │   ├── JwtAuthenticationFilter.java # JWT filter
│   │   │               │   ├── JwtTokenProvider.java   # JWT token utility
│   │   │               │   └── UserPrincipal.java      # User principal
│   │   │               └── websocket/
│   │   │                   ├── WebSocketHandler.java   # WebSocket handler
│   │   │                   └── ChatWebSocketHandler.java # Chat WebSocket
│   │   └── resources/
│   │       ├── application.properties  # Application configuration
│   │       └── static/                 # Static resources
│   └── test/                           # Test classes
├── pom.xml                             # Maven dependencies
└── target/                             # Build output
```

## Frontend Structure (`/frontend`)

```
frontend/
├── public/
│   ├── index.html                 # HTML template
│   └── favicon.ico                # App icon
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.js          # Navigation header
│   │   │   ├── Sidebar.js         # Dashboard sidebar
│   │   │   ├── ProtectedRoute.js  # Route protection
│   │   │   ├── LoadingSpinner.js  # Loading component
│   │   │   └── ErrorBoundary.js   # Error handling
│   │   ├── chat/
│   │   │   ├── ChatInterface.js   # Main chat component
│   │   │   ├── MessageList.js     # Message display
│   │   │   ├── MessageInput.js    # Message input
│   │   │   └── ChatSidebar.js     # Chat list sidebar
│   │   ├── dashboard/
│   │   │   ├── DashboardStats.js  # Statistics cards
│   │   │   ├── RecentActivity.js  # Activity feed
│   │   │   ├── QuickActions.js    # Action buttons
│   │   │   └── NotificationPanel.js # Notifications
│   │   ├── meetings/
│   │   │   ├── MeetingScheduler.js # Meeting scheduling
│   │   │   ├── Calendar.js        # Calendar component
│   │   │   ├── MeetingList.js     # Upcoming meetings
│   │   │   ├── VideoCall.js       # Video calling interface
│   │   │   └── MeetingNotes.js    # Meeting notes
│   │   └── profile/
│   │       ├── Profile.js         # Profile management
│   │       ├── ProfileEdit.js     # Profile editing
│   │       ├── AlumniCard.js      # Alumni profile card
│   │       └── StudentCard.js     # Student profile card
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.js           # Login page
│   │   │   ├── Register.js        # Registration page
│   │   │   └── ForgotPassword.js  # Password reset
│   │   ├── dashboard/
│   │   │   ├── StudentDashboard.js # Student dashboard
│   │   │   ├── AlumniDashboard.js  # Alumni dashboard
│   │   │   └── AdminDashboard.js   # Admin dashboard
│   │   ├── mentorship/
│   │   │   ├── AlumniBrowse.js     # Browse alumni profiles
│   │   │   ├── MentorshipRequests.js # Manage requests
│   │   │   └── MentorshipDetails.js # Mentorship details
│   │   └── admin/
│   │       ├── UserManagement.js   # User management
│   │       ├── AlumniVerification.js # Alumni verification
│   │       └── PlatformAnalytics.js # Analytics dashboard
│   ├── services/
│   │   ├── api.js                 # Axios API configuration
│   │   ├── authService.js         # Authentication API calls
│   │   ├── userService.js         # User API calls
│   │   ├── mentorshipService.js   # Mentorship API calls
│   │   ├── chatService.js         # Chat API calls
│   │   ├── meetingService.js      # Meeting API calls
│   │   └── socketService.js       # Socket.io client
│   ├── hooks/
│   │   ├── useAuth.js             # Authentication hook
│   │   ├── useSocket.js           # Socket connection hook
│   │   ├── useChat.js             # Chat functionality hook
│   │   └── useMeetings.js         # Meeting management hook
│   ├── context/
│   │   ├── AuthContext.js         # Authentication context
│   │   ├── SocketContext.js       # Socket.io context
│   │   └── ThemeContext.js        # Theme management
│   ├── utils/
│   │   ├── constants.js           # App constants
│   │   ├── helpers.js             # Utility functions
│   │   └── validators.js          # Form validation
│   ├── assets/
│   │   ├── images/                # Image assets
│   │   └── styles/
│   │       ├── index.css          # Global styles
│   │       └── components.css     # Component styles
│   ├── App.js                     # Main App component
│   └── index.js                   # React entry point
├── package.json                   # Dependencies and scripts
└── .gitignore                     # Git ignore rules
```

## Key Features Implementation

### 1. Role-Based Access Control
- **Models**: User.js with role field (student/alumni/admin)
- **Middleware**: roleAuth.js for route protection
- **Frontend**: ProtectedRoute.js component

### 2. Real-Time Chat
- **Backend**: socketService.js, Chat.js model
- **Frontend**: ChatInterface.js, useSocket.js hook

### 3. Video Calling
- **Backend**: videoService.js for WebRTC signaling
- **Frontend**: VideoCall.js component with simple-peer

### 4. Meeting Scheduling
- **Backend**: Meeting.js model, meetingController.js
- **Frontend**: MeetingScheduler.js, Calendar.js

### 5. Mentorship Management
- **Backend**: Mentorship.js model, mentorshipController.js
- **Frontend**: AlumniBrowse.js, MentorshipRequests.js

### 6. Admin Panel
- **Backend**: adminController.js, adminRoutes.js
- **Frontend**: AdminDashboard.js, UserManagement.js

## Technology Stack

### Backend
- **Framework**: Spring Boot 3.2.0
- **Language**: Java 17
- **Database**: MySQL 8.0
- **ORM**: Spring Data JPA
- **Authentication**: JWT with Spring Security
- **Real-time**: WebSocket with STOMP
- **Build Tool**: Maven
- **Validation**: Spring Boot Validation

### Frontend
- **Framework**: React.js 18
- **UI Library**: Material-UI (MUI)
- **Routing**: React Router
- **State Management**: Context API
- **Real-time**: WebSocket with STOMP
- **Video**: WebRTC with simple-peer
- **Forms**: Formik + Yup validation
- **HTTP Client**: Axios

## Getting Started

1. **Database Setup**:
   - Install MySQL 8.0
   - Create database: `alumni_connect`
   - Update credentials in application.properties

2. **Backend Setup**:
   ```bash
   cd backend
   mvn clean install
   mvn spring-boot:run
   ```
   Server runs on: http://localhost:8080

3. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm start
   ```
   Client runs on: http://localhost:3000

This structure provides a scalable, maintainable foundation for the Alumni Connect Portal with clear separation of concerns and modular architecture.