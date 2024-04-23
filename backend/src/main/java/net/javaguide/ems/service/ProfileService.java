package net.javaguide.ems.service;

import net.javaguide.ems.dto.ProfileDTO;

public interface ProfileService {
    ProfileDTO getProfileByEmail(String email);
    ProfileDTO createProfile(ProfileDTO profileDTO);
    ProfileDTO updateProfile(Long id, ProfileDTO profileDTO);
    boolean deleteProfile(Long id);
}
