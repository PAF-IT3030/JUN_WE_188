package net.javaguide.ems.controller;

import net.javaguide.ems.service.MealPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/meal-plans")
public class MealPlanController {

    @Autowired
    private MealPlanService mealPlanService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadMealPlan(@RequestBody String mealPlan) {
        // Process the uploaded meal plan data as needed
        // For example, you can save it to the database or perform other operations
        // Here, we'll simply print the received meal plan to the console
        System.out.println("Received meal plan: " + mealPlan);

        // You can also return a success message or any relevant response to the frontend
        return ResponseEntity.status(HttpStatus.OK).body("Meal plan uploaded successfully.");
    }
}
