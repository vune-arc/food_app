package iuh.fit.food_delivery_app_backend.respository;

import iuh.fit.food_delivery_app_backend.entity.Restaurant;
import iuh.fit.food_delivery_app_backend.enums.TagType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Integer> {
    List<Restaurant> findByCategory_CategoryID(int categoryId);
    List<Restaurant> findByNameContainingIgnoreCase(String name);
    List<Restaurant> findByLocationContainingIgnoreCase(String location);
    List<Restaurant> findByRatingGreaterThanEqual(Double minRating);
    List<Restaurant> findByTags(TagType tags);
    List<Restaurant> findByDeliveryTimeMinLessThanEqual(Integer maxDeliveryTime);
    List<Restaurant> findByPriceRangeContaining(String priceRange);
    List<Restaurant> findByNameContainingIgnoreCaseAndLocationContainingIgnoreCase(String name, String location);

    @Query("""
    SELECT DISTINCT r 
    FROM Restaurant r 
    LEFT JOIN r.foods f
    WHERE LOWER(r.name) LIKE LOWER(CONCAT('%', :keyword, '%'))
       OR LOWER(f.name) LIKE LOWER(CONCAT('%', :keyword, '%'))
""")
    List<Restaurant> searchByKeyword(@Param("keyword") String keyword);


}
