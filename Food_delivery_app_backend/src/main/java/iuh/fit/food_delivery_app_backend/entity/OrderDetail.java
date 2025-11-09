package iuh.fit.food_delivery_app_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "OrderDetails")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class OrderDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private Integer quantity;

    private Double unitPrice; // Giá mỗi món đã bao gồm option

    @ManyToOne
    @JoinColumn(name = "orderId", nullable = false)
    @JsonBackReference
    private Order order;

    // Map trực tiếp CartItem để giữ thông tin đầy đủ món + option
    @ManyToOne
    @JoinColumn(name = "cartItemId", nullable = false)
    private CartItem cartItem;
}
