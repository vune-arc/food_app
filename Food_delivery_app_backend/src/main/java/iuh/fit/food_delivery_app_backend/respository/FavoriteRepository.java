package iuh.fit.food_delivery_app_backend.respository;

import iuh.fit.food_delivery_app_backend.entity.Customer;
import iuh.fit.food_delivery_app_backend.entity.Favorite;
import iuh.fit.food_delivery_app_backend.entity.Food;
import iuh.fit.food_delivery_app_backend.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Integer> {
    List<Favorite> findByCustomer(Customer customer);

    Optional<Favorite> findByCustomerAndFood(Customer customer, Food food);

    Optional<Favorite> findByCustomerAndRestaurant(Customer customer, Restaurant restaurant);
}
