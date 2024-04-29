package com.example.server.controller;

import com.example.server.model.Image;
import com.example.server.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.rowset.serial.SerialBlob;
import javax.sql.rowset.serial.SerialException;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;

@Controller
public class ClientController {

    private final ImageService imageService;

    @Autowired
    public ClientController(ImageService imageService) {
        this.imageService = imageService;
    }

    @GetMapping("/ping")
    @ResponseBody
    public String helloWorld() {
        return "Hello World!";
    }

    @GetMapping("/display")
    public ResponseEntity<byte[]> displayImage(@RequestParam("id") String idParam) {
        try {
            long id = Long.parseLong(idParam);
            Image image = imageService.viewById(id);
            if (image != null) {
                Blob imageData = image.getImage();
                if (imageData != null) {
                    byte[] imageBytes = imageData.getBytes(1, (int) imageData.length());
                    return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageBytes);
                }
            }
        } catch (NumberFormatException | SQLException e) {
            e.printStackTrace();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/")
    public ModelAndView home() {
        ModelAndView mv = new ModelAndView("index");
        List<Image> imageList = imageService.viewAll();
        mv.addObject("imageList", imageList);
        return mv;
    }

    @GetMapping("/add")
    public ModelAndView addImageForm() {
        return new ModelAndView("addimage");
    }

    @PostMapping("/add")
    public ResponseEntity<Long> addImagePost(@RequestParam("image") MultipartFile file, @RequestParam("description") String description) {
        try {
            byte[] bytes = file.getBytes();
            Blob blob = new SerialBlob(bytes);
            Image image = new Image();
            image.setImage(blob);
            image.setDescription(description);
            imageService.create(image);
            return ResponseEntity.ok(image.getId());
        } catch (IOException | SQLException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(-1L);
        }
    }

    @GetMapping("/description")
    public ResponseEntity<String> getImageDescription(@RequestParam("id") String idParam) {
        try {
            long id = Long.parseLong(idParam);
            Image image = imageService.viewById(id);
            if (image != null) {
                String description = image.getDescription();
                return ResponseEntity.ok(description);
            }
        } catch (NumberFormatException e) {
            e.printStackTrace();
        }
        return ResponseEntity.notFound().build();
    }

    @ExceptionHandler({IOException.class, SerialException.class, SQLException.class})
    public ModelAndView handleFileUploadException(Exception ex, HttpServletRequest request, HttpServletResponse response) {
        ModelAndView mv = new ModelAndView("error");
        mv.addObject("errorMessage", "Error uploading file: " + ex.getMessage());
        return mv;
    }

    @PutMapping("/update-description")
    public ResponseEntity<Void> updateImageDescription(@RequestParam("id") String idParam, @RequestBody UpdateDescriptionRequest request) {
        try {
            long id = Long.parseLong(idParam);
            Image image = imageService.viewById(id);
            if (image != null) {
                image.setDescription(request.getDescription());
                imageService.updateImage(image);
                return ResponseEntity.ok().build();
            }
        } catch (NumberFormatException  e) {
            e.printStackTrace();
        }
        return ResponseEntity.notFound().build();
    }

    static class UpdateDescriptionRequest {
        private String description;

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

    }

    @DeleteMapping("/delete-post/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable("id") long id) {
        try {
            Image image = imageService.viewById(id);
            if (image != null) {
                imageService.deleteImage(image); // Assuming a delete method in your service
                return ResponseEntity.ok().build(); // Return success response
            }
        } catch (Exception e) {
            e.printStackTrace(); // Handle or log the exception as needed
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/all-posts")
    public ResponseEntity<List<Image>> getAllPosts() {
        List<Image> images = imageService.viewAll();
        if (!images.isEmpty()) {
            return ResponseEntity.ok(images);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}


