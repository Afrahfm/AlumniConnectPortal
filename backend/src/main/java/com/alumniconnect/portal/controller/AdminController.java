package com.alumniconnect.portal.controller;

import com.alumniconnect.portal.service.AdminAnalyticsService;
import com.alumniconnect.portal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private AdminAnalyticsService analyticsService;

    @GetMapping("/analytics")
    public ResponseEntity<Map<String, Object>> getAnalytics() {
        Map<String, Object> analytics = new HashMap<>();
        
        analytics.put("totalUsers", userService.getTotalUsers());
        analytics.put("totalStudents", userService.getTotalStudents());
        analytics.put("totalAlumni", userService.getTotalAlumni());
        analytics.put("verifiedAlumni", userService.getVerifiedAlumniCount());
        analytics.put("activeUsers", userService.getTotalUsers());
        
        return ResponseEntity.ok(analytics);
    }

    @GetMapping("/analytics/mentorship-continuity")
    public ResponseEntity<Map<String, Object>> getMentorshipContinuityAnalytics() {
        return ResponseEntity.ok(analyticsService.getMentorshipContinuityMetrics());
    }

    @GetMapping("/analytics/effectiveness")
    public ResponseEntity<Map<String, Object>> getEffectivenessAnalytics() {
        return ResponseEntity.ok(analyticsService.getMentorshipEffectivenessMetrics());
    }

    @GetMapping("/analytics/risk-assessment")
    public ResponseEntity<Map<String, Object>> getRiskAssessment() {
        return ResponseEntity.ok(analyticsService.getPredictiveRiskAnalysis());
    }

    @GetMapping("/analytics/mentor-load-balancing")
    public ResponseEntity<Map<String, Object>> getMentorLoadBalancing() {
        return ResponseEntity.ok(analyticsService.getMentorLoadBalancingData());
    }

    @GetMapping("/analytics/program-insights")
    public ResponseEntity<Map<String, Object>> getProgramInsights() {
        return ResponseEntity.ok(analyticsService.getProgramLevelInsights());
    }

    @PostMapping("/auto-balance-mentors")
    public ResponseEntity<Map<String, Object>> autoBalanceMentors() {
        return ResponseEntity.ok(analyticsService.performAutomaticMentorLoadBalancing());
    }

    @PutMapping("/users/{id}/verify")
    public ResponseEntity<?> verifyUser(@PathVariable Long id) {
        try {
            userService.verifyAlumni(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "User verified successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PutMapping("/users/{id}/activate")
    public ResponseEntity<?> activateUser(@PathVariable Long id) {
        try {
            userService.activateUser(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "User activated successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PutMapping("/users/{id}/deactivate")
    public ResponseEntity<?> deactivateUser(@PathVariable Long id) {
        try {
            userService.deactivateUser(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "User deactivated successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}