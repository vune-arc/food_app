package iuh.fit.food_delivery_app_backend.service;

import iuh.fit.food_delivery_app_backend.dto.FoodDTO;
import iuh.fit.food_delivery_app_backend.dto.RestaurantDTO;
import iuh.fit.food_delivery_app_backend.entity.Food;
import iuh.fit.food_delivery_app_backend.entity.Restaurant;
import iuh.fit.food_delivery_app_backend.respository.FoodRepository;
import iuh.fit.food_delivery_app_backend.respository.RestaurantRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;
    @Autowired
    private FoodRepository foodRepository;

    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    public Optional<Restaurant> getRestaurantById(Integer id) {
        return restaurantRepository.findById(id);
    }

    public List<Restaurant> searchRestaurantsByName(String name) {
        return restaurantRepository.findByNameContainingIgnoreCase(name);
    }

    public List<Restaurant> searchRestaurantsByLocation(String location) {
        return restaurantRepository.findByLocationContainingIgnoreCase(location);
    }

    public List<Restaurant> getRestaurantsByRating(Double minRating) {
        return restaurantRepository.findByRatingGreaterThanEqual(minRating);
    }

    public List<Restaurant> getRestaurantsByDeliveryTime(Integer maxDeliveryTime) {
        return restaurantRepository.findByDeliveryTimeMinLessThanEqual(maxDeliveryTime);
    }

    public Restaurant createRestaurant(Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }

    public Restaurant updateRestaurant(Integer id, Restaurant restaurantDetails) {
        return restaurantRepository.findById(id)
                .map(restaurant -> {
                    restaurant.setName(restaurantDetails.getName());
                    restaurant.setDescription(restaurantDetails.getDescription());
                    restaurant.setLocation(restaurantDetails.getLocation());
                    restaurant.setRating(restaurantDetails.getRating());
                    restaurant.setOpenTime(restaurantDetails.getOpenTime());
                    restaurant.setCloseTime(restaurantDetails.getCloseTime());
                    return restaurantRepository.save(restaurant);
                })
                .orElseThrow(() -> new RuntimeException("Restaurant not found with id: " + id));
    }

    public void deleteRestaurant(Integer id) {
        restaurantRepository.deleteById(id);
    }

    // Thêm phương thức tìm restaurant theo category
    public List<Restaurant> getRestaurantsByCategoryId(Integer categoryId) {
        return restaurantRepository.findByCategory_CategoryID(categoryId);
    }

    // Search
    public List<RestaurantDTO> searchAll(String keyword) {
        String trimmed = keyword.trim();
        final String finalKeyword = trimmed.toLowerCase();

        List<Restaurant> restaurants = restaurantRepository.searchByKeyword(trimmed);
        List<Food> foodMatches = foodRepository.searchFoods(trimmed);

        // Group food by restaurant
        Map<Integer, List<Food>> foodMap = foodMatches.stream()
                .collect(Collectors.groupingBy(f -> f.getRestaurant().getRestaurantId()));

        return restaurants.stream().map(r -> {
            List<FoodDTO> foodsForRestaurant = foodMap.getOrDefault(r.getRestaurantId(), r.getFoods())
                    .stream()
                    .filter(f -> f.getName().toLowerCase().contains(finalKeyword))
                    .map(f -> new FoodDTO(
                            f.getFoodId(),
                            f.getName(),
                            f.getDescription(),
                            f.getPrice(),
                            f.getImage()
                    ))
                    .toList();

            return new RestaurantDTO(
                    r.getRestaurantId(),
                    r.getName(),
                    r.getDescription(),
                    r.getRating(),
                    r.getPriceRange(),
                    r.getImage(),
                    r.getLocation(),
                    r.getTags().stream().map(Enum::name).toList(),
                    foodsForRestaurant
            );
        }).toList();
    }




}
