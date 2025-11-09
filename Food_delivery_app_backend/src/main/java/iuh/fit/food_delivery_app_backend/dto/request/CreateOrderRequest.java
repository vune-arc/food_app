package iuh.fit.food_delivery_app_backend.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class CreateOrderRequest {
    private int customerId;
//    private int restaurantId;
    private String paymentMethod;
    private double deliveryFee;
    private double promotionDiscount;
    private List<OrderItemRequest> items; // Thay cartItemIds

    @Data
    public static class OrderItemRequest {
        private int cartItemId;
        private int quantity;
    }
}
