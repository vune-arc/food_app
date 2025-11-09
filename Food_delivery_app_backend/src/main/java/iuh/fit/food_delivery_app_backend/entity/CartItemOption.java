package iuh.fit.food_delivery_app_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Entity
@Table(name = "cart_item_options")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartItemOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_item_id")
    @JsonBackReference
    private CartItem cartItem;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "food_option_id")
    private FoodOption foodOption;
}


