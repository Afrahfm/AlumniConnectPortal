package com.alumniconnect.portal.service;

import com.alumniconnect.portal.entity.User;
import com.alumniconnect.portal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) {
        // Check if email already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        user.setIsActive(true);
        
        // Auto-verify students, alumni need manual verification
        if (user.getRole() == User.Role.STUDENT) {
            user.setIsVerified(true);
        } else {
            user.setIsVerified(false);
        }
        
        return userRepository.save(user);
    }

    public User authenticateUser(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        
        User user = userOpt.get();
        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }
        
        if (!user.getIsActive()) {
            throw new RuntimeException("Account is deactivated");
        }
        
        // Update last login
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);
        
        return user;
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<User> getVerifiedAlumni() {
        return userRepository.findByRoleAndIsVerified(User.Role.ALUMNI, true);
    }

    public List<User> getStudents() {
        return userRepository.findByRole(User.Role.STUDENT);
    }

    public User updateUser(User user) {
        user.setUpdatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }

    public User verifyAlumni(Long userId) {
        User user = getUserById(userId);
        if (user.getRole() != User.Role.ALUMNI) {
            throw new RuntimeException("User is not an alumni");
        }
        
        user.setIsVerified(true);
        user.setUpdatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }

    public void deleteUser(Long userId) {
        User user = getUserById(userId);
        userRepository.delete(user);
    }

    public void deactivateUser(Long userId) {
        User user = getUserById(userId);
        user.setIsActive(false);
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);
    }

    public void activateUser(Long userId) {
        User user = getUserById(userId);
        user.setIsActive(true);
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);
    }

    public long getTotalUsers() {
        return userRepository.count();
    }

    public long getTotalStudents() {
        return userRepository.countByRole(User.Role.STUDENT);
    }

    public long getTotalAlumni() {
        return userRepository.countByRole(User.Role.ALUMNI);
    }

    public long getVerifiedAlumniCount() {
        return userRepository.countByRoleAndIsVerified(User.Role.ALUMNI, true);
    }
}