package net.javaguide.ems.controller;

import net.javaguide.ems.dto.ProfileDTO;
import net.javaguide.ems.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profiles")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @GetMapping("/{email}")
    public ResponseEntity<ProfileDTO> getProfileByEmail(@PathVariable String email) {
        ProfileDTO profileDTO = profileService.getProfileByEmail(email);
        if (profileDTO != null) {
            return ResponseEntity.ok(profileDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<ProfileDTO> createProfile(@RequestBody ProfileDTO profileDTO) {
        ProfileDTO createdProfileDTO = profileService.createProfile(profileDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProfileDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProfileDTO> updateProfile(@PathVariable Long id, @RequestBody ProfileDTO profileDTO) {
        ProfileDTO updatedProfileDTO = profileService.updateProfile(id, profileDTO);
        if (updatedProfileDTO != null) {
            return ResponseEntity.ok(updatedProfileDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfile(@PathVariable Long id) {
        boolean deleted = profileService.deleteProfile(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
