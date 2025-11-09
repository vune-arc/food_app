package iuh.fit.food_delivery_app_backend.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class SelectedOptions {
    private String size;
    private String spiciness;
    private List<String> toppings;
}
