// User Analytics Service
class UserAnalyticsService {
  constructor() {
    this.initializeData();
  }

  initializeData() {
    const defaultData = {
      alumni: {
        totalRegistered: 245,
        recentRegistrations: 12,
        totalLogins: 1834,
        recentLogins: 89,
        activeUsers: 156,
        registrationHistory: [],
        loginHistory: []
      },
      students: {
        totalRegistered: 892,
        recentRegistrations: 34,
        totalLogins: 4521,
        recentLogins: 234,
        activeUsers: 567,
        registrationHistory: [],
        loginHistory: []
      }
    };

    if (!localStorage.getItem('userAnalytics')) {
      localStorage.setItem('userAnalytics', JSON.stringify(defaultData));
    }
  }

  getData() {
    return JSON.parse(localStorage.getItem('userAnalytics'));
  }

  updateData(data) {
    localStorage.setItem('userAnalytics', JSON.stringify(data));
  }

  recordRegistration(userType) {
    const data = this.getData();
    const now = new Date().toISOString();
    
    data[userType].totalRegistered += 1;
    data[userType].recentRegistrations += 1;
    data[userType].registrationHistory.push({
      timestamp: now,
      type: 'registration'
    });

    this.updateData(data);
    return data;
  }

  recordLogin(userType) {
    const data = this.getData();
    const now = new Date().toISOString();
    
    data[userType].totalLogins += 1;
    data[userType].recentLogins += 1;
    data[userType].loginHistory.push({
      timestamp: now,
      type: 'login'
    });

    // Update active users (simulate)
    data[userType].activeUsers = Math.min(
      data[userType].activeUsers + 1,
      Math.floor(data[userType].totalRegistered * 0.7)
    );

    this.updateData(data);
    return data;
  }

  addLoggedUser(userType, userInfo) {
    const loggedUsers = JSON.parse(localStorage.getItem('loggedUsers') || '{}');
    if (!loggedUsers[userType]) {
      loggedUsers[userType] = [];
    }
    
    const newUser = {
      id: Date.now(),
      name: userInfo.name || 'Unknown User',
      email: userInfo.email,
      loginTime: new Date().toLocaleString(),
      status: 'online'
    };
    
    loggedUsers[userType].push(newUser);
    localStorage.setItem('loggedUsers', JSON.stringify(loggedUsers));
    return loggedUsers;
  }

  getLoggedUsers() {
    return JSON.parse(localStorage.getItem('loggedUsers') || '{}');
  }

  getRecentActivity(userType, days = 7) {
    const data = this.getData();
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);

    const recentRegistrations = data[userType].registrationHistory.filter(
      event => new Date(event.timestamp) > cutoff
    ).length;

    const recentLogins = data[userType].loginHistory.filter(
      event => new Date(event.timestamp) > cutoff
    ).length;

    return {
      recentRegistrations,
      recentLogins
    };
  }

  resetWeeklyStats() {
    const data = this.getData();
    data.alumni.recentRegistrations = 0;
    data.alumni.recentLogins = 0;
    data.students.recentRegistrations = 0;
    data.students.recentLogins = 0;
    this.updateData(data);
  }
}

export const userAnalyticsService = new UserAnalyticsService();