package com.alumniconnect.portal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
@RestController
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class AlumniConnectPortalApplication {

    @GetMapping("/")
    public Map<String, String> home() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Alumni Connect Portal API is running!");
        response.put("status", "success");
        return response;
    }

    @GetMapping("/api/test/hello")
    public Map<String, String> hello() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Hello from Alumni Connect!");
        response.put("status", "success");
        return response;
    }

    public static void main(String[] args) {
        SpringApplication.run(AlumniConnectPortalApplication.class, args);
    }
}