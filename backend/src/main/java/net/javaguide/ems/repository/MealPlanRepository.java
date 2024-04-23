package net.javaguide.ems.repository;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MealPlanRepository<MealPlan> extends JpaRepository<MealPlan, Long> {
    // Define custom query methods if needed
}
