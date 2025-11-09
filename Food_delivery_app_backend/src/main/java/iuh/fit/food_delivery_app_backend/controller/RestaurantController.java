package iuh.fit.food_delivery_app_backend.controller;

import iuh.fit.food_delivery_app_backend.dto.RestaurantDTO;
import iuh.fit.food_delivery_app_backend.entity.Restaurant;
import iuh.fit.food_delivery_app_backend.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
@CrossOrigin(origins = "*")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @GetMapping
    public ResponseEntity<List<Restaurant>> getAllRestaurants() {
        List<Restaurant> restaurants = restaurantService.getAllRestaurants();
        return ResponseEntity.ok(restaurants);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Restaurant> getRestaurantById(@PathVariable Integer id) {
        return restaurantService.getRestaurantById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

//    @GetMapping("/search/")
//    public ResponseEntity<List<Restaurant>> searchRestaurantsByName(@RequestParam String name) {
//        List<Restaurant> restaurants = restaurantService.searchRestaurantsByName(name);
//        return ResponseEntity.ok(restaurants);
//    }

    @GetMapping("/search/location")
    public ResponseEntity<List<Restaurant>> searchRestaurantsByLocation(@RequestParam String location) {
        List<Restaurant> restaurants = restaurantService.searchRestaurantsByLocation(location);
        return ResponseEntity.ok(restaurants);
    }

    @GetMapping("/rating/{minRating}")
    public ResponseEntity<List<Restaurant>> getRestaurantsByRating(@PathVariable Double minRating) {
        List<Restaurant> restaurants = restaurantService.getRestaurantsByRating(minRating);
        return ResponseEntity.ok(restaurants);
    }

    @GetMapping("/delivery-time/{maxTime}")
    public ResponseEntity<List<Restaurant>> getRestaurantsByDeliveryTime(@PathVariable Integer maxTime) {
        List<Restaurant> restaurants = restaurantService.getRestaurantsByDeliveryTime(maxTime);
        return ResponseEntity.ok(restaurants);
    }

    @PostMapping
    public ResponseEntity<Restaurant> createRestaurant(@RequestBody Restaurant restaurant) {
        Restaurant createdRestaurant = restaurantService.createRestaurant(restaurant);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdRestaurant);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Restaurant> updateRestaurant(@PathVariable Integer id, @RequestBody Restaurant restaurant) {
        try {
            Restaurant updatedRestaurant = restaurantService.updateRestaurant(id, restaurant);
            return ResponseEntity.ok(updatedRestaurant);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRestaurant(@PathVariable Integer id) {
        restaurantService.deleteRestaurant(id);
        return ResponseEntity.noContent().build();
    }

    // Thêm endpoint tìm restaurant theo category
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<Restaurant>> getRestaurantsByCategoryId(@PathVariable Integer categoryId) {
        List<Restaurant> restaurants = restaurantService.getRestaurantsByCategoryId(categoryId);
        return ResponseEntity.ok(restaurants);
    }

    @GetMapping("/search")
    public ResponseEntity<List<RestaurantDTO>> search(@RequestParam String keyword) {
        List<RestaurantDTO> result = restaurantService.searchAll(keyword);
        return ResponseEntity.ok(result);
    }

}