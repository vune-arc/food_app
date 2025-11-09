package iuh.fit.food_delivery_app_backend.respository;

import iuh.fit.food_delivery_app_backend.entity.Comment;
import iuh.fit.food_delivery_app_backend.enums.CommentType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findByType(CommentType type);
    List<Comment> findByRatingGreaterThanEqual(Double minRating);
    List<Comment> findByDateCommentBetween(LocalDate startDate, LocalDate endDate);
    List<Comment> findByCustomer_CustomerId(int customerId);
    List<Comment> findByFood_FoodId(int foodId);
    List<Comment> findByRestaurant_RestaurantId(int restaurantId);
    List<Comment> findByDriver_DriverId(int driverId);
    List<Comment> findByTitleContainingIgnoreCase(String keyword);
}
