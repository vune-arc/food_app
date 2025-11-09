package iuh.fit.food_delivery_app_backend.dto;

public record FoodDTO(
        int foodId,
        String name,
        String description,
        Double price,
        String image
) {}
