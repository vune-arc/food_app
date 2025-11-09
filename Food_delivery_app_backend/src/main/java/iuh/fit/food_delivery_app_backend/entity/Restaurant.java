package iuh.fit.food_delivery_app_backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import iuh.fit.food_delivery_app_backend.enums.TagType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Restaurants")
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"foods", "orders", "comments"})
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int restaurantId;
    private String name;
    private String description;
    private Double rating;

    private String priceRange;

    private String image;
    private String location;


    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "restaurant_tags",
            joinColumns = @JoinColumn(name = "restaurant_id")
    )
    @Enumerated(EnumType.STRING)
    @Column(name = "tag")
    private List<TagType> tags = new ArrayList<>();

    private LocalTime openTime;
    private LocalTime closeTime;
    private Integer deliveryTimeMin;
    private Integer deliveryTimeMax;
    private String attribute;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Food> foods;

//    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
//    @JsonIgnore
//    private List<Order> orders;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Comment> comments;

    @ManyToOne
    @JoinColumn(name = "categoryId")
    private Category category;


    public int getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(int restaurantId) {
        this.restaurantId = restaurantId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getPriceRange() {
        return priceRange;
    }

    public void setPriceRange(String priceRange) {
        this.priceRange = priceRange;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public List<TagType> getTags() {
        return tags;
    }

    public void setTags(List<TagType> tags) {
        this.tags = tags;
    }

    public LocalTime getOpenTime() {
        return openTime;
    }

    public void setOpenTime(LocalTime openTime) {
        this.openTime = openTime;
    }

    public LocalTime getCloseTime() {
        return closeTime;
    }

    public void setCloseTime(LocalTime closeTime) {
        this.closeTime = closeTime;
    }

    public Integer getDeliveryTimeMin() {
        return deliveryTimeMin;
    }

    public void setDeliveryTimeMin(Integer deliveryTimeMin) {
        this.deliveryTimeMin = deliveryTimeMin;
    }

    public Integer getDeliveryTimeMax() {
        return deliveryTimeMax;
    }

    public void setDeliveryTimeMax(Integer deliveryTimeMax) {
        this.deliveryTimeMax = deliveryTimeMax;
    }

    public String getAttribute() {
        return attribute;
    }

    public void setAttribute(String attribute) {
        this.attribute = attribute;
    }

    public List<Food> getFoods() {
        return foods;
    }

    public void setFoods(List<Food> foods) {
        this.foods = foods;
    }

//    public List<Order> getOrders() {
//        return orders;
//    }
//
//    public void setOrders(List<Order> orders) {
//        this.orders = orders;
//    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}

