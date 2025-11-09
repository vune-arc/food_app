package iuh.fit.food_delivery_app_backend.controller;

import iuh.fit.food_delivery_app_backend.entity.Food;
import iuh.fit.food_delivery_app_backend.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/foods")
@CrossOrigin(origins = "*")
public class FoodController {

    @Autowired
    private FoodService foodService;

    @GetMapping
    public ResponseEntity<List<Food>> getAllFoods() {
        List<Food> foods = foodService.getAllFoods();
        return ResponseEntity.ok(foods);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Food> getFoodById(@PathVariable Integer id) {
        return foodService.getFoodById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<Food>> getFoodsByCategory(@PathVariable Integer categoryId) {
        List<Food> foods = foodService.getFoodsByCategory(categoryId);
        return ResponseEntity.ok(foods);
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<Food>> getFoodsByRestaurant(@PathVariable Integer restaurantId) {
        List<Food> foods = foodService.getFoodsByRestaurant(restaurantId);
        return ResponseEntity.ok(foods);
    }

    @GetMapping("/available")
    public ResponseEntity<List<Food>> getAvailableFoods() {
        List<Food> foods = foodService.getAvailableFoods();
        return ResponseEntity.ok(foods);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Food>> searchFoods(@RequestParam String name) {
        List<Food> foods = foodService.searchFoodsByName(name);
        return ResponseEntity.ok(foods);
    }

    @GetMapping("/price-range")
    public ResponseEntity<List<Food>> getFoodsByPriceRange(
            @RequestParam Double minPrice,
            @RequestParam Double maxPrice) {
        List<Food> foods = foodService.getFoodsByPriceRange(minPrice, maxPrice);
        return ResponseEntity.ok(foods);
    }

    @PostMapping
    public ResponseEntity<Food> createFood(@RequestBody Food food) {
        Food createdFood = foodService.createFood(food);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdFood);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Food> updateFood(@PathVariable Integer id, @RequestBody Food food) {
        try {
            Food updatedFood = foodService.updateFood(id, food);
            return ResponseEntity.ok(updatedFood);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFood(@PathVariable Integer id) {
        foodService.deleteFood(id);
        return ResponseEntity.noContent().build();
    }
}
