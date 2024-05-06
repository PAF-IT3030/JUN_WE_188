package com.example.server.repository;

import com.example.server.entity.FitnessActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface FitnessActivityRepository extends JpaRepository<FitnessActivity, Long> {
    // Your repository methods
}

