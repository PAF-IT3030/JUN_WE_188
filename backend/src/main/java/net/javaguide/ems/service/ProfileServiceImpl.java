package net.javaguide.ems.service;

import net.javaguide.ems.dto.ProfileDTO;
import net.javaguide.ems.entity.Profile;
import net.javaguide.ems.repository.ProfileRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfileServiceImpl implements ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ProfileDTO getProfileByEmail(String email) {
        Profile profile = profileRepository.findByEmail(email);
        return convertToDto(profile);
    }

    @Override
    public ProfileDTO createProfile(ProfileDTO profileDTO) {
        Profile profile = convertToEntity(profileDTO);
        Profile savedProfile = profileRepository.save(profile);
        return convertToDto(savedProfile);
    }

    @Override
    public ProfileDTO updateProfile(Long id, ProfileDTO profileDTO) {
        Profile existingProfile = profileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Profile not found"));
        existingProfile.setBio(profileDTO.getBio());
        existingProfile.setProfilePictureUrl(profileDTO.getProfilePictureUrl());
        Profile updatedProfile = profileRepository.save(existingProfile);
        return convertToDto(updatedProfile);
    }

    @Override
    public boolean deleteProfile(Long id) {
        if (profileRepository.existsById(id)) {
            profileRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private ProfileDTO convertToDto(Profile profile) {
        return modelMapper.map(profile, ProfileDTO.class);
    }

    private Profile convertToEntity(ProfileDTO profileDTO) {
        return modelMapper.map(profileDTO, Profile.class);
    }
}
