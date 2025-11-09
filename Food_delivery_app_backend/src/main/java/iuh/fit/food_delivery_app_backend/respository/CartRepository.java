package iuh.fit.food_delivery_app_backend.respository;

import iuh.fit.food_delivery_app_backend.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {
    Optional<Cart> findByCustomer_CustomerId(int customerId);
    @Query("""
       SELECT c FROM Cart c
       LEFT JOIN FETCH c.cartItems ci
       LEFT JOIN FETCH ci.options opt
       LEFT JOIN FETCH opt.foodOption
       WHERE c.customer.customerId = :customerId
       """)
    Optional<Cart> findWithItemsByCustomerId(@Param("customerId") int customerId);
    @Query("""
    SELECT DISTINCT c FROM Cart c
    LEFT JOIN FETCH c.cartItems ci
    LEFT JOIN FETCH ci.options o
    WHERE c.customer.customerId = :customerId
""")
    Optional<Cart> findByCustomer_CustomerId1(@Param("customerId") int customerId);
}
