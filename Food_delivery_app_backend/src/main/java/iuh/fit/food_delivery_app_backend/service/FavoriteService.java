package iuh.fit.food_delivery_app_backend.service;

import iuh.fit.food_delivery_app_backend.entity.Customer;
import iuh.fit.food_delivery_app_backend.entity.Favorite;
import iuh.fit.food_delivery_app_backend.entity.Food;
import iuh.fit.food_delivery_app_backend.entity.Restaurant;
import iuh.fit.food_delivery_app_backend.enums.FavoriteType;
import iuh.fit.food_delivery_app_backend.respository.CustomerRepository;
import iuh.fit.food_delivery_app_backend.respository.FavoriteRepository;
import iuh.fit.food_delivery_app_backend.respository.FoodRepository;
import iuh.fit.food_delivery_app_backend.respository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoriteService {
    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    public List<Favorite> getFavoritesByCustomerId(int customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        return favoriteRepository.findByCustomer(customer);
    }

    public Favorite addFavoriteFood(int customerId, int foodId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        Food food = foodRepository.findById(foodId)
                .orElseThrow(() -> new RuntimeException("Food not found"));

        // Kiểm tra nếu đã tồn tại
        if (favoriteRepository.findByCustomerAndFood(customer, food).isPresent()) {
            throw new RuntimeException("This food is already in favorites");
        }

        Favorite fav = new Favorite();
        fav.setCustomer(customer);
        fav.setFood(food);
        fav.setType(FavoriteType.FOOD);
        return favoriteRepository.save(fav);
    }

    public Favorite addFavoriteRestaurant(int customerId, int restaurantId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));

        if (favoriteRepository.findByCustomerAndRestaurant(customer, restaurant).isPresent()) {
            throw new RuntimeException("This restaurant is already in favorites");
        }

        Favorite fav = new Favorite();
        fav.setCustomer(customer);
        fav.setRestaurant(restaurant);
        fav.setType(FavoriteType.RESTAURANT);
        return favoriteRepository.save(fav);
    }

    public void removeFavoriteFood(int customerId, int foodId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        Food food = foodRepository.findById(foodId)
                .orElseThrow(() -> new RuntimeException("Food not found"));

        Favorite favorite = favoriteRepository.findByCustomerAndFood(customer, food)
                .orElseThrow(() -> new RuntimeException("Favorite not found"));
        favoriteRepository.delete(favorite);
    }

    public void removeFavoriteRestaurant(int customerId, int restaurantId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));

        Favorite favorite = favoriteRepository.findByCustomerAndRestaurant(customer, restaurant)
                .orElseThrow(() -> new RuntimeException("Favorite not found"));
        favoriteRepository.delete(favorite);
    }
}
