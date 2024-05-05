package com.example.server.controller;

import com.example.server.entity.FitnessActivity;
import com.example.server.service.FitnessActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@RestController
@RequestMapping("/api/fitness-activities")
public class FitnessActivityController {

    @Autowired
    private FitnessActivityService fitnessActivityService;

    
   @PostMapping("/create")
    public ResponseEntity<FitnessActivity> createFitnessActivity(@RequestParam("name") String name,
                                                                 @RequestParam("description") String description,
                                                                 @RequestParam("imageFile") MultipartFile imageFile) {
        try {
            FitnessActivity savedActivity = fitnessActivityService.saveFitnessActivity(name, description, imageFile);
            return new ResponseEntity<>(savedActivity, HttpStatus.CREATED);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
