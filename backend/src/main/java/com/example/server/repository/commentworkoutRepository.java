package com.example.server.repository;

import com.example.server.model.commentworkout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface commentworkoutRepository extends JpaRepository<commentworkout, Long> {
}
