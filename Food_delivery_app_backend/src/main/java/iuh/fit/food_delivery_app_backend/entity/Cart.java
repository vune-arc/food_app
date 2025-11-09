package iuh.fit.food_delivery_app_backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "carts")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = {"customer", "cartItems"})
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cartId;

    // Một khách hàng có thể có một giỏ hàng (1-1)
    @OneToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "customerId")
    @JsonIgnore
    private Customer customer;

    // Tổng giá trị giỏ hàng
    private double totalPrice = 0.0;
    // Danh sách sản phẩm trong giỏ
    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItem> cartItems = new ArrayList<>();

    public void updateTotalPrice(boolean includePaid) {
        this.totalPrice = cartItems.stream()
                .filter(ci -> includePaid || !ci.isPaid())
                .mapToDouble(CartItem::getSubTotal)
                .sum();
    }
}
