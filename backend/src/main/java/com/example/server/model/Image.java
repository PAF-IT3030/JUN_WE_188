//Propeties/Entities

package com.example.server.model;

import jakarta.persistence.*;

import java.sql.Blob;
import java.util.Date;

@Entity
@Table(name = "image_table")
public class Image {
    //@id-primary key
    @Id
    //indicated tht the database should automatically generate the primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;


    //stores as large object in the databse
    @Lob
    private Blob image;

    private String description; // Add description field

    private Date date = new Date();

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Blob getImage() {
        return image;
    }

    public void setImage(Blob image) {
        this.image = image;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDate() {
        return date;
    }
}
