package com.alumniconnect.portal.repository;

import com.alumniconnect.portal.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    
    List<User> findByRole(User.Role role);
    
    List<User> findByRoleAndIsVerified(User.Role role, Boolean isVerified);
    
    List<User> findByIsActive(Boolean isActive);
    
    List<User> findByUniversity(String university);
    
    List<User> findByIndustry(String industry);
    
    List<User> findByLocation(String location);
    
    @Query("SELECT u FROM User u WHERE u.role = 'ALUMNI' AND u.isVerified = true AND u.isActive = true")
    List<User> findAvailableAlumni();
    
    @Query("SELECT u FROM User u WHERE u.firstName LIKE %?1% OR u.lastName LIKE %?1%")
    List<User> findByNameContaining(String name);
    
    @Query("SELECT u FROM User u WHERE u.role = ?1 AND (u.firstName LIKE %?2% OR u.lastName LIKE %?2%)")
    List<User> findByRoleAndNameContaining(User.Role role, String name);
    
    long countByRole(User.Role role);
    
    long countByRoleAndIsVerified(User.Role role, Boolean isVerified);
    
    long countByIsActive(Boolean isActive);

}