package com.example.server.service;

import com.example.server.entity.FitnessActivity;
import com.example.server.repository.FitnessActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@Service
public class FitnessActivityService {

    @Autowired
    private FitnessActivityRepository fitnessActivityRepository;

    public FitnessActivity saveFitnessActivity(String name, String description, MultipartFile imageFile) throws IOException {
        FitnessActivity fitnessActivity = new FitnessActivity();
        fitnessActivity.setName(name);
        fitnessActivity.setDescription(description);
        fitnessActivity.setImage(imageFile.getBytes()); // Store image data as byte array
        return fitnessActivityRepository.save(fitnessActivity);
    }
}
