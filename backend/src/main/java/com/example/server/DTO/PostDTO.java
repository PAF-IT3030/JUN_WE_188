package com.example.server.DTO;

import java.sql.Blob;

public class PostDTO {
    private long id;
    private Blob image;
    private String description;

    // Constructor
    public PostDTO(long id, Blob image, String description) {
        this.id = id;
        this.image = image;
        this.description = description;
    }

    // Getters and setters
}
