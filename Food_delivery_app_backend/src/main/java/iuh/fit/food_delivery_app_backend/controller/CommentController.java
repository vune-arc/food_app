package iuh.fit.food_delivery_app_backend.controller;

import iuh.fit.food_delivery_app_backend.entity.Comment;
import iuh.fit.food_delivery_app_backend.enums.CommentType;
import iuh.fit.food_delivery_app_backend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "*")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping
    public ResponseEntity<List<Comment>> getAllComments() {
        List<Comment> comments = commentService.getAllComments();
        return ResponseEntity.ok(comments);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Comment> getCommentById(@PathVariable Integer id) {
        return commentService.getCommentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<Comment>> getCommentsByType(@PathVariable CommentType type) {
        List<Comment> comments = commentService.getCommentsByType(type);
        return ResponseEntity.ok(comments);
    }

    @GetMapping("/rating/{minRating}")
    public ResponseEntity<List<Comment>> getCommentsByRating(@PathVariable Double minRating) {
        List<Comment> comments = commentService.getCommentsByRating(minRating);
        return ResponseEntity.ok(comments);
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Comment>> getCommentsByCustomer(@PathVariable Integer customerId) {
        List<Comment> comments = commentService.getCommentsByCustomer(customerId);
        return ResponseEntity.ok(comments);
    }

    @GetMapping("/food/{foodId}")
    public ResponseEntity<List<Comment>> getCommentsByFood(@PathVariable Integer foodId) {
        List<Comment> comments = commentService.getCommentsByFood(foodId);
        return ResponseEntity.ok(comments);
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<Comment>> getCommentsByRestaurant(@PathVariable Integer restaurantId) {
        List<Comment> comments = commentService.getCommentsByRestaurant(restaurantId);
        return ResponseEntity.ok(comments);
    }

    @GetMapping("/driver/{driverId}")
    public ResponseEntity<List<Comment>> getCommentsByDriver(@PathVariable Integer driverId) {
        List<Comment> comments = commentService.getCommentsByDriver(driverId);
        return ResponseEntity.ok(comments);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Comment>> searchComments(@RequestParam String keyword) {
        List<Comment> comments = commentService.searchCommentsByTitle(keyword);
        return ResponseEntity.ok(comments);
    }

    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
        try {
            Comment createdComment = commentService.createComment(comment);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdComment);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Comment> updateComment(@PathVariable Integer id, @RequestBody Comment comment) {
        try {
            Comment updatedComment = commentService.updateComment(id, comment);
            return ResponseEntity.ok(updatedComment);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Integer id) {
        commentService.deleteComment(id);
        return ResponseEntity.noContent().build();
    }
}
