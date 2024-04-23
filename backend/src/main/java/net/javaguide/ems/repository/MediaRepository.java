package net.javaguide.ems.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import javax.print.attribute.standard.Media;

public interface MediaRepository extends JpaRepository<Media, Long> {
    // Define custom query methods if needed
}
