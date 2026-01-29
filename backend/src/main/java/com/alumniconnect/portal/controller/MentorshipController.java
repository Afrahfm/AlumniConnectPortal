package com.alumniconnect.portal.controller;

import com.alumniconnect.portal.entity.Mentorship;
import com.alumniconnect.portal.entity.User;
import com.alumniconnect.portal.service.MentorshipService;
import com.alumniconnect.portal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mentorships")
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class MentorshipController {

    @Autowired
    private MentorshipService mentorshipService;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<?> createMentorship(@RequestBody Map<String, Object> data) {
        try {
            Long mentorId = Long.parseLong(data.get("mentorId").toString());
            Long menteeId = Long.parseLong(data.get("menteeId").toString());
            
            User mentor = userService.getUserById(mentorId);
            User mentee = userService.getUserById(menteeId);
            
            Mentorship mentorship = new Mentorship();
            mentorship.setMentor(mentor);
            mentorship.setMentee(mentee);
            mentorship.setRequestMessage((String) data.get("requestMessage"));
            mentorship.setDomain((String) data.get("domain"));
            mentorship.setDuration((String) data.get("duration"));
            
            Mentorship saved = mentorshipService.createMentorship(mentorship);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/my")
    public ResponseEntity<List<Mentorship>> getMyMentorships(@RequestParam Long userId) {
        List<Mentorship> mentorships = mentorshipService.getUserMentorships(userId);
        return ResponseEntity.ok(mentorships);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> data) {
        try {
            String status = data.get("status");
            String responseMessage = data.get("responseMessage");
            
            Mentorship updated = mentorshipService.updateStatus(id, Mentorship.Status.valueOf(status), responseMessage);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}