package iuh.fit.food_delivery_app_backend.service;

import iuh.fit.food_delivery_app_backend.entity.Comment;
import iuh.fit.food_delivery_app_backend.enums.CommentType;
import iuh.fit.food_delivery_app_backend.respository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private DriverRepository driverRepository;

    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    public Optional<Comment> getCommentById(Integer id) {
        return commentRepository.findById(id);
    }

    public List<Comment> getCommentsByType(CommentType type) {
        return commentRepository.findByType(type);
    }

    public List<Comment> getCommentsByRating(Double minRating) {
        return commentRepository.findByRatingGreaterThanEqual(minRating);
    }

    public List<Comment> getCommentsByCustomer(Integer customerId) {
        return commentRepository.findByCustomer_CustomerId(customerId);
    }

    public List<Comment> getCommentsByFood(Integer foodId) {
        return commentRepository.findByFood_FoodId(foodId);
    }

    public List<Comment> getCommentsByRestaurant(Integer restaurantId) {
        return commentRepository.findByRestaurant_RestaurantId(restaurantId);
    }

    public List<Comment> getCommentsByDriver(Integer driverId) {
        return commentRepository.findByDriver_DriverId(driverId);
    }

    public List<Comment> searchCommentsByTitle(String keyword) {
        return commentRepository.findByTitleContainingIgnoreCase(keyword);
    }

    public Comment createComment(Comment comment) {
        // Validate relationships
        if (comment.getCustomer() != null && !customerRepository.existsById(comment.getCustomer().getCustomerId())) {
            throw new RuntimeException("Customer not found");
        }
        return commentRepository.save(comment);
    }

    public Comment updateComment(Integer id, Comment commentDetails) {
        return commentRepository.findById(id)
                .map(comment -> {
                    comment.setTitle(commentDetails.getTitle());
                    comment.setRating(commentDetails.getRating());
                    comment.setType(commentDetails.getType());
                    return commentRepository.save(comment);
                })
                .orElseThrow(() -> new RuntimeException("Comment not found with id: " + id));
    }

    public void deleteComment(Integer id) {
        commentRepository.deleteById(id);
    }
}
