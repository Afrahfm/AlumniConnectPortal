package com.alumniconnect.portal.service;

import com.alumniconnect.portal.entity.Mentorship;
import com.alumniconnect.portal.entity.User;
import com.alumniconnect.portal.repository.MentorshipRepository;
import com.alumniconnect.portal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AdminAnalyticsService {

    @Autowired
    private MentorshipRepository mentorshipRepository;

    @Autowired
    private UserRepository userRepository;

    public Map<String, Object> getMentorshipContinuityMetrics() {
        Map<String, Object> metrics = new HashMap<>();
        
        List<Mentorship> allMentorships = mentorshipRepository.findAll();
        
        // Calculate average mentorship duration
        double avgDuration = allMentorships.stream()
            .filter(m -> m.getStartDate() != null && m.getEndDate() != null)
            .mapToLong(m -> ChronoUnit.DAYS.between(m.getStartDate(), m.getEndDate()))
            .average()
            .orElse(0.0);
        
        // Calculate completion rate
        long completedMentorships = allMentorships.stream()
            .filter(m -> m.getStatus() == Mentorship.Status.COMPLETED)
            .count();
        
        double completionRate = allMentorships.isEmpty() ? 0 : 
            (double) completedMentorships / allMentorships.size() * 100;
        
        // Calculate dropout rate
        long droppedMentorships = allMentorships.stream()
            .filter(m -> m.getStatus() == Mentorship.Status.CANCELLED)
            .count();
        
        double dropoutRate = allMentorships.isEmpty() ? 0 : 
            (double) droppedMentorships / allMentorships.size() * 100;
        
        // Active mentorships trend
        long activeMentorships = allMentorships.stream()
            .filter(m -> m.getStatus() == Mentorship.Status.ACTIVE)
            .count();
        
        metrics.put("averageDurationDays", Math.round(avgDuration));
        metrics.put("completionRate", Math.round(completionRate * 100) / 100.0);
        metrics.put("dropoutRate", Math.round(dropoutRate * 100) / 100.0);
        metrics.put("activeMentorships", activeMentorships);
        metrics.put("totalMentorships", allMentorships.size());
        
        return metrics;
    }

    public Map<String, Object> getMentorshipEffectivenessMetrics() {
        Map<String, Object> metrics = new HashMap<>();
        
        List<Mentorship> completedMentorships = mentorshipRepository.findByStatus(Mentorship.Status.COMPLETED);
        
        // Average ratings
        double avgMentorRating = completedMentorships.stream()
            .filter(m -> m.getMentorRating() != null)
            .mapToInt(Mentorship::getMentorRating)
            .average()
            .orElse(0.0);
        
        double avgMenteeRating = completedMentorships.stream()
            .filter(m -> m.getMenteeRating() != null)
            .mapToInt(Mentorship::getMenteeRating)
            .average()
            .orElse(0.0);
        
        // Success rate (ratings >= 4)
        long successfulMentorships = completedMentorships.stream()
            .filter(m -> m.getMentorRating() != null && m.getMentorRating() >= 4)
            .count();
        
        double successRate = completedMentorships.isEmpty() ? 0 : 
            (double) successfulMentorships / completedMentorships.size() * 100;
        
        // Meeting completion rate
        double avgMeetingsCompleted = completedMentorships.stream()
            .filter(m -> m.getMeetingsCompleted() != null)
            .mapToInt(Mentorship::getMeetingsCompleted)
            .average()
            .orElse(0.0);
        
        metrics.put("averageMentorRating", Math.round(avgMentorRating * 100) / 100.0);
        metrics.put("averageMenteeRating", Math.round(avgMenteeRating * 100) / 100.0);
        metrics.put("successRate", Math.round(successRate * 100) / 100.0);
        metrics.put("averageMeetingsCompleted", Math.round(avgMeetingsCompleted));
        metrics.put("totalCompletedMentorships", completedMentorships.size());
        
        return metrics;
    }

    public Map<String, Object> getPredictiveRiskAnalysis() {
        Map<String, Object> riskAnalysis = new HashMap<>();
        
        List<Mentorship> activeMentorships = mentorshipRepository.findByStatus(Mentorship.Status.ACTIVE);
        List<Map<String, Object>> atRiskMentorships = new ArrayList<>();
        
        for (Mentorship mentorship : activeMentorships) {
            Map<String, Object> riskFactors = new HashMap<>();
            int riskScore = 0;
            List<String> riskReasons = new ArrayList<>();
            
            // Check last interaction
            if (mentorship.getLastInteraction() != null) {
                long daysSinceLastInteraction = ChronoUnit.DAYS.between(
                    mentorship.getLastInteraction(), LocalDateTime.now());
                
                if (daysSinceLastInteraction > 14) {
                    riskScore += 30;
                    riskReasons.add("No interaction for " + daysSinceLastInteraction + " days");
                }
            } else {
                riskScore += 40;
                riskReasons.add("No recorded interactions");
            }
            
            // Check mentorship duration
            if (mentorship.getStartDate() != null) {
                long mentorshipDays = ChronoUnit.DAYS.between(
                    mentorship.getStartDate(), LocalDateTime.now());
                
                if (mentorshipDays > 180) { // 6 months
                    riskScore += 20;
                    riskReasons.add("Long-running mentorship (" + mentorshipDays + " days)");
                }
            }
            
            // Check meeting completion
            if (mentorship.getMeetingsCompleted() != null && mentorship.getMeetingsCompleted() < 2) {
                riskScore += 25;
                riskReasons.add("Low meeting frequency");
            }
            
            if (riskScore >= 50) {
                riskFactors.put("mentorshipId", mentorship.getId());
                riskFactors.put("mentorName", mentorship.getMentor().getFirstName() + " " + 
                    mentorship.getMentor().getLastName());
                riskFactors.put("menteeName", mentorship.getMentee().getFirstName() + " " + 
                    mentorship.getMentee().getLastName());
                riskFactors.put("riskScore", riskScore);
                riskFactors.put("riskLevel", riskScore >= 70 ? "HIGH" : "MEDIUM");
                riskFactors.put("riskReasons", riskReasons);
                
                atRiskMentorships.add(riskFactors);
            }
        }
        
        riskAnalysis.put("atRiskMentorships", atRiskMentorships);
        riskAnalysis.put("totalAtRisk", atRiskMentorships.size());
        riskAnalysis.put("riskPercentage", activeMentorships.isEmpty() ? 0 : 
            Math.round((double) atRiskMentorships.size() / activeMentorships.size() * 100));
        
        return riskAnalysis;
    }

    public Map<String, Object> getMentorLoadBalancingData() {
        Map<String, Object> loadData = new HashMap<>();
        
        List<User> mentors = userRepository.findByRoleAndIsVerified(User.Role.ALUMNI, true);
        List<Map<String, Object>> mentorLoads = new ArrayList<>();
        
        for (User mentor : mentors) {
            List<Mentorship> activeMentorships = mentorshipRepository.findByMentorId(mentor.getId())
                .stream()
                .filter(m -> m.getStatus() == Mentorship.Status.ACTIVE)
                .collect(Collectors.toList());
            
            Map<String, Object> mentorLoad = new HashMap<>();
            mentorLoad.put("mentorId", mentor.getId());
            mentorLoad.put("mentorName", mentor.getFirstName() + " " + mentor.getLastName());
            mentorLoad.put("currentLoad", activeMentorships.size());
            mentorLoad.put("industry", mentor.getIndustry());
            mentorLoad.put("experience", mentor.getExperience());
            
            // Calculate load status
            String loadStatus;
            if (activeMentorships.size() == 0) {
                loadStatus = "AVAILABLE";
            } else if (activeMentorships.size() <= 2) {
                loadStatus = "OPTIMAL";
            } else if (activeMentorships.size() <= 4) {
                loadStatus = "HIGH";
            } else {
                loadStatus = "OVERLOADED";
            }
            
            mentorLoad.put("loadStatus", loadStatus);
            mentorLoads.add(mentorLoad);
        }
        
        // Sort by current load
        mentorLoads.sort((a, b) -> Integer.compare((Integer) b.get("currentLoad"), (Integer) a.get("currentLoad")));
        
        loadData.put("mentorLoads", mentorLoads);
        loadData.put("totalMentors", mentors.size());
        loadData.put("availableMentors", mentorLoads.stream()
            .mapToInt(m -> "AVAILABLE".equals(m.get("loadStatus")) ? 1 : 0)
            .sum());
        loadData.put("overloadedMentors", mentorLoads.stream()
            .mapToInt(m -> "OVERLOADED".equals(m.get("loadStatus")) ? 1 : 0)
            .sum());
        
        return loadData;
    }

    public Map<String, Object> getProgramLevelInsights() {
        Map<String, Object> insights = new HashMap<>();
        
        // Overall program health
        long totalUsers = userRepository.count();
        long totalMentorships = mentorshipRepository.count();
        long activeMentorships = mentorshipRepository.countByStatus(Mentorship.Status.ACTIVE);
        
        // Growth metrics
        Map<String, Object> growthMetrics = new HashMap<>();
        growthMetrics.put("totalUsers", totalUsers);
        growthMetrics.put("totalMentorships", totalMentorships);
        growthMetrics.put("activeMentorships", activeMentorships);
        growthMetrics.put("engagementRate", totalUsers > 0 ? 
            Math.round((double) activeMentorships / totalUsers * 100) : 0);
        
        // Industry distribution
        Map<String, Long> industryDistribution = userRepository.findByRole(User.Role.ALUMNI)
            .stream()
            .filter(u -> u.getIndustry() != null)
            .collect(Collectors.groupingBy(User::getIndustry, Collectors.counting()));
        
        // University distribution
        Map<String, Long> universityDistribution = userRepository.findAll()
            .stream()
            .filter(u -> u.getUniversity() != null)
            .collect(Collectors.groupingBy(User::getUniversity, Collectors.counting()));
        
        insights.put("growthMetrics", growthMetrics);
        insights.put("industryDistribution", industryDistribution);
        insights.put("universityDistribution", universityDistribution);
        insights.put("programHealth", activeMentorships > 0 ? "HEALTHY" : "NEEDS_ATTENTION");
        
        return insights;
    }

    public Map<String, Object> performAutomaticMentorLoadBalancing() {
        Map<String, Object> result = new HashMap<>();
        
        // Get pending mentorship requests
        List<Mentorship> pendingRequests = mentorshipRepository.findByStatus(Mentorship.Status.PENDING);
        
        // Get available mentors (sorted by current load)
        List<User> availableMentors = userRepository.findByRoleAndIsVerified(User.Role.ALUMNI, true);
        
        Map<Long, Integer> mentorLoads = new HashMap<>();
        for (User mentor : availableMentors) {
            long activeCount = mentorshipRepository.findByMentorId(mentor.getId())
                .stream()
                .filter(m -> m.getStatus() == Mentorship.Status.ACTIVE)
                .count();
            mentorLoads.put(mentor.getId(), (int) activeCount);
        }
        
        List<String> balancingActions = new ArrayList<>();
        int rebalanced = 0;
        
        // Simple load balancing: assign pending requests to least loaded mentors
        for (Mentorship request : pendingRequests) {
            if (rebalanced >= 10) break; // Limit to 10 auto-assignments per run
            
            User leastLoadedMentor = availableMentors.stream()
                .filter(m -> mentorLoads.get(m.getId()) < 3) // Max 3 active mentorships
                .min(Comparator.comparing(m -> mentorLoads.get(m.getId())))
                .orElse(null);
            
            if (leastLoadedMentor != null) {
                // Auto-assign (in real implementation, you might want to consider matching criteria)
                balancingActions.add("Suggested assignment: " + request.getMentee().getFirstName() + 
                    " to " + leastLoadedMentor.getFirstName());
                mentorLoads.put(leastLoadedMentor.getId(), mentorLoads.get(leastLoadedMentor.getId()) + 1);
                rebalanced++;
            }
        }
        
        result.put("balancingActions", balancingActions);
        result.put("rebalancedCount", rebalanced);
        result.put("pendingRequests", pendingRequests.size());
        result.put("message", "Load balancing analysis completed");
        
        return result;
    }
}