package iuh.fit.food_delivery_app_backend.controller;

import iuh.fit.food_delivery_app_backend.entity.FoodOption;
import iuh.fit.food_delivery_app_backend.enums.OptionType;
import iuh.fit.food_delivery_app_backend.service.FoodOptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/food-options")
@CrossOrigin(origins = "*")
public class FoodOptionController {

    @Autowired
    private FoodOptionService foodOptionService;

    @GetMapping
    public ResponseEntity<List<FoodOption>> getAllFoodOptions() {
        List<FoodOption> foodOptions = foodOptionService.getAllFoodOptions();
        return ResponseEntity.ok(foodOptions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FoodOption> getFoodOptionById(@PathVariable Integer id) {
        return foodOptionService.getFoodOptionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/type/{optionType}")
    public ResponseEntity<List<FoodOption>> getFoodOptionsByType(@PathVariable OptionType optionType) {
        List<FoodOption> foodOptions = foodOptionService.getFoodOptionsByType(optionType);
        return ResponseEntity.ok(foodOptions);
    }

    @GetMapping("/food/{foodId}")
    public ResponseEntity<List<FoodOption>> getFoodOptionsByFood(@PathVariable Integer foodId) {
        List<FoodOption> foodOptions = foodOptionService.getFoodOptionsByFood(foodId);
        return ResponseEntity.ok(foodOptions);
    }

    @GetMapping("/food/{foodId}/type/{optionType}")
    public ResponseEntity<List<FoodOption>> getFoodOptionsByFoodAndType(
            @PathVariable Integer foodId,
            @PathVariable OptionType optionType) {
        List<FoodOption> foodOptions = foodOptionService.getFoodOptionsByFoodAndType(foodId, optionType);
        return ResponseEntity.ok(foodOptions);
    }

    @GetMapping("/search")
    public ResponseEntity<List<FoodOption>> searchFoodOptions(@RequestParam String optionName) {
        List<FoodOption> foodOptions = foodOptionService.searchFoodOptionsByName(optionName);
        return ResponseEntity.ok(foodOptions);
    }

    @GetMapping("/price-range")
    public ResponseEntity<List<FoodOption>> getFoodOptionsByPriceRange(
            @RequestParam Double minPrice,
            @RequestParam Double maxPrice) {
        List<FoodOption> foodOptions = foodOptionService.getFoodOptionsByPriceRange(minPrice, maxPrice);
        return ResponseEntity.ok(foodOptions);
    }

    @PostMapping
    public ResponseEntity<FoodOption> createFoodOption(@RequestBody FoodOption foodOption) {
        try {
            FoodOption createdFoodOption = foodOptionService.createFoodOption(foodOption);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdFoodOption);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<FoodOption> updateFoodOption(@PathVariable Integer id, @RequestBody FoodOption foodOption) {
        try {
            FoodOption updatedFoodOption = foodOptionService.updateFoodOption(id, foodOption);
            return ResponseEntity.ok(updatedFoodOption);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFoodOption(@PathVariable Integer id) {
        foodOptionService.deleteFoodOption(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/food/{foodId}")
    public ResponseEntity<Void> deleteFoodOptionsByFood(@PathVariable Integer foodId) {
        foodOptionService.deleteFoodOptionsByFood(foodId);
        return ResponseEntity.noContent().build();
    }
}
