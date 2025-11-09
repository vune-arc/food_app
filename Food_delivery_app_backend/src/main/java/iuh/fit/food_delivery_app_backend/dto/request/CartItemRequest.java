package iuh.fit.food_delivery_app_backend.dto.request;

import lombok.Data;
import java.util.List;

// CartItemRequest.java
@Data
public class CartItemRequest {
    private int foodId;
    private int quantity;
    private SelectedOptions selectedOptions;
}

