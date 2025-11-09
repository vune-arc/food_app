package iuh.fit.food_delivery_app_backend.respository;

import iuh.fit.food_delivery_app_backend.entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodRepository extends JpaRepository<Food, Integer> {
    List<Food> findByNameContainingIgnoreCase(String name);
    List<Food> findByAvailableTrue();
    List<Food> findByPriceBetween(Double minPrice, Double maxPrice);
    List<Food> findByRatingTotalGreaterThanEqual(Double minRating);
    List<Food> findByCategory_CategoryID(int categoryId);
    List<Food> findByRestaurant_RestaurantId(int restaurantId);
    List<Food> findByCategory_CategoryIDAndAvailableTrue(int categoryId);
    List<Food> findByRestaurant_RestaurantIdAndAvailableTrue(int restaurantId);
    @Query("""
    SELECT f 
    FROM Food f
    WHERE LOWER(f.name) LIKE LOWER(CONCAT('%', :keyword, '%'))
""")
    List<Food> searchFoods(@Param("keyword") String keyword);

}
