package net.javaguide.ems.controller;

import net.javaguide.ems.service.MediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/media")
public class MediaController {

    @Autowired
    private MediaService mediaService;

    // Define endpoints for media-related operations
}
