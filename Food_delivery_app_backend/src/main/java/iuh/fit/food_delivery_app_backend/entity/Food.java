package iuh.fit.food_delivery_app_backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "Foods")
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"foodOptions", "orderDetails", "comments"})
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int foodId;

    private String name;
    private String image;
    private String description;
    private Double ratingTotal;
    private Double price;
    private Boolean available;

    private double percentSale;

    @ManyToOne
    @JoinColumn(name = "categoryId")
    @JsonIgnore
    private Category category;

    @ManyToOne
    @JoinColumn(name = "restaurantId")
    @JsonIgnore
    private Restaurant restaurant;

    @OneToMany(mappedBy = "food", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<FoodOption> foodOptions;
//
//    @OneToMany(mappedBy = "food", cascade = CascadeType.ALL)
//    @JsonIgnore
//    private List<OrderDetail> orderDetails;

    @OneToMany(mappedBy = "food", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Comment> comments;

    public int getFoodId() {
        return foodId;
    }

    public void setFoodId(int foodId) {
        this.foodId = foodId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getRatingTotal() {
        return ratingTotal;
    }

    public void setRatingTotal(Double ratingTotal) {
        this.ratingTotal = ratingTotal;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public List<FoodOption> getFoodOptions() {
        return foodOptions;
    }

    public void setFoodOptions(List<FoodOption> foodOptions) {
        this.foodOptions = foodOptions;
    }

//    public List<OrderDetail> getOrderDetails() {
//        return orderDetails;
//    }

//    public void setOrderDetails(List<OrderDetail> orderDetails) {
//        this.orderDetails = orderDetails;
//    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public double getPercentSale() {
        return percentSale;
    }

    public void setPercentSale(double percentSale) {
        this.percentSale = percentSale;
    }
}
