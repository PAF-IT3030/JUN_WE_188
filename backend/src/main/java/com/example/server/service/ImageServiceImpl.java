//Implements the image service interface for image related options
package com.example.server.service;

import com.example.server.model.Image;
import com.example.server.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageServiceImpl implements ImageService {

    @Autowired
    private ImageRepository imageRepository;

    @Override
    public Image create(Image image) {
        return imageRepository.save(image);
    }

    @Override
    public List<Image> viewAll() {
        return (List<Image>) imageRepository.findAll();
    }

    @Override
    public Image viewById(long id) {
        return imageRepository.findById(id).orElse(null);
    }

    @Override
    public Image updateImage(Image updatedImage) {
        // Implement the update logic here
        // For example:
        // Get the existing image from the repository based on ID
        // Update its fields with the data from updatedImage
        // Save the updated image back to the repository
        Image existingImage = imageRepository.findById(updatedImage.getId())
                .orElseThrow(() -> new IllegalArgumentException("Image not found with ID: " + updatedImage.getId()));
        existingImage.setImage(updatedImage.getImage());
        existingImage.setDescription(updatedImage.getDescription());

        return imageRepository.save(existingImage);
    }


    @Override
    public void deleteImage(Image image) {
        imageRepository.delete(image);
    }
}
