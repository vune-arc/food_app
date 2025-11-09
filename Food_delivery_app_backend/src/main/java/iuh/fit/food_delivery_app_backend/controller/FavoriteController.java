package iuh.fit.food_delivery_app_backend.controller;

import iuh.fit.food_delivery_app_backend.entity.Favorite;
import iuh.fit.food_delivery_app_backend.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@CrossOrigin(origins = "*")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    @GetMapping("/{customerId}")
    public List<Favorite> getFavoritesByCustomer(@PathVariable int customerId) {
        return favoriteService.getFavoritesByCustomerId(customerId);
    }

    @PostMapping("/food/{customerId}/{foodId}")
    public Favorite addFavoriteFood(@PathVariable int customerId, @PathVariable int foodId) {
        return favoriteService.addFavoriteFood(customerId, foodId);
    }

    @PostMapping("/restaurant/{customerId}/{restaurantId}")
    public Favorite addFavoriteRestaurant(@PathVariable int customerId, @PathVariable int restaurantId) {
        return favoriteService.addFavoriteRestaurant(customerId, restaurantId);
    }

    @DeleteMapping("/food/{customerId}/{foodId}")
    public void removeFavoriteFood(@PathVariable int customerId, @PathVariable int foodId) {
        favoriteService.removeFavoriteFood(customerId, foodId);
    }

    @DeleteMapping("/restaurant/{customerId}/{restaurantId}")
    public void removeFavoriteRestaurant(@PathVariable int customerId, @PathVariable int restaurantId) {
        favoriteService.removeFavoriteRestaurant(customerId, restaurantId);
    }
}
