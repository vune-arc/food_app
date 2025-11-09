package iuh.fit.food_delivery_app_backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "cart_items")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = {"cart", "food", "options"})
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cartItemId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_id")
    @JsonIgnore
    private Cart cart;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "food_id", nullable = false)
    private Food food;

    @OneToMany(mappedBy = "cartItem", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<CartItemOption> options = new ArrayList<>();

    @Column(nullable = false)
    private int quantity = 1;

    @Column(nullable = false)
    private double subTotal = 0.0;
    private boolean paid = false;
    public void updateSubTotal() {
        double basePrice = food.getPrice();
        double optionTotal = options.stream()
                .mapToDouble(o -> o.getFoodOption().getAdditionalPrice())
                .sum();
        this.subTotal = (basePrice + optionTotal) * quantity;
    }
}



