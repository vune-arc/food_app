package iuh.fit.food_delivery_app_backend.service;

import iuh.fit.food_delivery_app_backend.entity.Food;
import iuh.fit.food_delivery_app_backend.respository.CategoryRepository;
import iuh.fit.food_delivery_app_backend.respository.FoodRepository;
import iuh.fit.food_delivery_app_backend.respository.RestaurantRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class FoodService {

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }

    public Optional<Food> getFoodById(Integer id) {
        return foodRepository.findById(id);
    }

    public List<Food> getFoodsByCategory(Integer categoryId) {
        return foodRepository.findByCategory_CategoryID(categoryId);
    }

    public List<Food> getFoodsByRestaurant(Integer restaurantId) {
        return foodRepository.findByRestaurant_RestaurantId(restaurantId);
    }

    public List<Food> getAvailableFoods() {
        return foodRepository.findByAvailableTrue();
    }

    public List<Food> searchFoodsByName(String name) {
        return foodRepository.findByNameContainingIgnoreCase(name);
    }

    public List<Food> getFoodsByPriceRange(Double minPrice, Double maxPrice) {
        return foodRepository.findByPriceBetween(minPrice, maxPrice);
    }

    public Food createFood(Food food) {
        return foodRepository.save(food);
    }

    public Food updateFood(Integer id, Food foodDetails) {
        return foodRepository.findById(id)
                .map(food -> {
                    food.setName(foodDetails.getName());
                    food.setDescription(foodDetails.getDescription());
                    food.setPrice(foodDetails.getPrice());
                    food.setAvailable(foodDetails.getAvailable());
                    food.setImage(foodDetails.getImage());
                    return foodRepository.save(food);
                })
                .orElseThrow(() -> new RuntimeException("Food not found with id: " + id));
    }

    public void deleteFood(Integer id) {
        foodRepository.deleteById(id);
    }
}
