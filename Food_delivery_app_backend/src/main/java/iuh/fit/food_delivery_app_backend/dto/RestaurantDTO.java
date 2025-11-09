package iuh.fit.food_delivery_app_backend.dto;

import java.util.List;

public record RestaurantDTO(
        int restaurantId,
        String name,
        String description,
        Double rating,
        String priceRange,
        String image,
        String location,
        List<String> tags,
        List<FoodDTO> foods
) {}
