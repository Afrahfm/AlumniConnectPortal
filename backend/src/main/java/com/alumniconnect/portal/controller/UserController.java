package com.alumniconnect.portal.controller;

import com.alumniconnect.portal.entity.User;
import com.alumniconnect.portal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/alumni")
    public ResponseEntity<List<User>> getAlumni() {
        List<User> alumni = userService.getVerifiedAlumni();
        return ResponseEntity.ok(alumni);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        try {
            User user = userService.getUserById(id);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody Map<String, Object> userData) {
        try {
            User user = userService.getUserById(id);
            
            if (userData.get("firstName") != null) user.setFirstName((String) userData.get("firstName"));
            if (userData.get("lastName") != null) user.setLastName((String) userData.get("lastName"));
            if (userData.get("phone") != null) user.setPhone((String) userData.get("phone"));
            if (userData.get("bio") != null) user.setBio((String) userData.get("bio"));
            if (userData.get("university") != null) user.setUniversity((String) userData.get("university"));
            if (userData.get("graduationYear") != null) user.setGraduationYear(Integer.parseInt(userData.get("graduationYear").toString()));
            if (userData.get("major") != null) user.setMajor((String) userData.get("major"));
            if (userData.get("currentCompany") != null) user.setCurrentCompany((String) userData.get("currentCompany"));
            if (userData.get("position") != null) user.setPosition((String) userData.get("position"));
            if (userData.get("experience") != null) user.setExperience(Integer.parseInt(userData.get("experience").toString()));
            if (userData.get("industry") != null) user.setIndustry((String) userData.get("industry"));
            if (userData.get("location") != null) user.setLocation((String) userData.get("location"));
            if (userData.get("linkedinProfile") != null) user.setLinkedinProfile((String) userData.get("linkedinProfile"));

            User updatedUser = userService.updateUser(user);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PutMapping("/{id}/verify")
    public ResponseEntity<?> verifyAlumni(@PathVariable Long id) {
        try {
            User user = userService.verifyAlumni(id);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "User deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}