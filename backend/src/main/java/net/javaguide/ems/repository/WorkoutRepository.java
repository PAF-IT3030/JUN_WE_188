package net.javaguide.ems.repository;

import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkoutRepository<Workout> extends JpaRepository<Workout, Long> {
    // Define custom query methods if needed
}
