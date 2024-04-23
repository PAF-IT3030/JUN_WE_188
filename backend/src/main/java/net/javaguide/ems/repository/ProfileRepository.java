package net.javaguide.ems.repository;

import net.javaguide.ems.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Profile findByEmail(String email);
}
