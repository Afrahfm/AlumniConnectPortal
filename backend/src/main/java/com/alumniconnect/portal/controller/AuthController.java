package com.alumniconnect.portal.controller;

import com.alumniconnect.portal.entity.User;
import com.alumniconnect.portal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, Object> userData) {
        try {
            // Validate required fields
            if (userData.get("firstName") == null || userData.get("lastName") == null || 
                userData.get("email") == null || userData.get("password") == null || 
                userData.get("role") == null) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "Missing required fields");
                return ResponseEntity.badRequest().body(error);
            }
            
            // Create new user
            User user = new User();
            user.setFirstName((String) userData.get("firstName"));
            user.setLastName((String) userData.get("lastName"));
            user.setEmail((String) userData.get("email"));
            user.setPassword((String) userData.get("password"));
            user.setRole(User.Role.valueOf((String) userData.get("role")));
            
            // Set optional fields
            if (userData.get("university") != null && !userData.get("university").toString().isEmpty()) {
                user.setUniversity((String) userData.get("university"));
            }
            if (userData.get("graduationYear") != null && !userData.get("graduationYear").toString().isEmpty()) {
                user.setGraduationYear(Integer.valueOf(userData.get("graduationYear").toString()));
            }
            if (userData.get("major") != null && !userData.get("major").toString().isEmpty()) {
                user.setMajor((String) userData.get("major"));
            }
            if (userData.get("currentCompany") != null && !userData.get("currentCompany").toString().isEmpty()) {
                user.setCurrentCompany((String) userData.get("currentCompany"));
            }
            if (userData.get("position") != null && !userData.get("position").toString().isEmpty()) {
                user.setPosition((String) userData.get("position"));
            }
            if (userData.get("experience") != null && !userData.get("experience").toString().isEmpty()) {
                user.setExperience(Integer.valueOf(userData.get("experience").toString()));
            }
            if (userData.get("industry") != null && !userData.get("industry").toString().isEmpty()) {
                user.setIndustry((String) userData.get("industry"));
            }
            if (userData.get("location") != null && !userData.get("location").toString().isEmpty()) {
                user.setLocation((String) userData.get("location"));
            }
            if (userData.get("phone") != null && !userData.get("phone").toString().isEmpty()) {
                user.setPhone((String) userData.get("phone"));
            }
            
            User savedUser = userService.createUser(user);
            
            Map<String, Object> response = new HashMap<>();
            response.put("user", savedUser);
            response.put("token", "jwt-token-" + savedUser.getId());
            response.put("message", "Registration successful");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        try {
            String email = loginData.get("email");
            String password = loginData.get("password");
            
            User user = userService.authenticateUser(email, password);
            
            Map<String, Object> response = new HashMap<>();
            response.put("user", user);
            response.put("token", "jwt-token-" + user.getId());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader(value = "Authorization", required = false) String token) {
        try {
            if (token == null || !token.startsWith("Bearer ")) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "No token provided");
                return ResponseEntity.badRequest().body(error);
            }
            
            String tokenValue = token.substring(7);
            if (tokenValue.startsWith("jwt-token-")) {
                String userId = tokenValue.replace("jwt-token-", "");
                User user = userService.getUserById(Long.parseLong(userId));
                return ResponseEntity.ok(user);
            }
            
            Map<String, String> error = new HashMap<>();
            error.put("message", "Invalid token");
            return ResponseEntity.badRequest().body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}