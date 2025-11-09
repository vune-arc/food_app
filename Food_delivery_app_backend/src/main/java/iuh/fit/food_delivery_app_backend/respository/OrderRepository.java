package iuh.fit.food_delivery_app_backend.respository;

import iuh.fit.food_delivery_app_backend.entity.Order;
import iuh.fit.food_delivery_app_backend.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findByStatus(OrderStatus status);
    List<Order> findByCustomer_CustomerId(int customerId);
    List<Order> findByDriver_DriverId(int driverId);
//    List<Order> findByRestaurant_RestaurantId(int restaurantId);
    List<Order> findByVoucher_VoucherId(int voucherId);
    List<Order> findByOrderDateBetween(LocalDateTime startDate, LocalDateTime endDate);
    List<Order> findByTotalAmountGreaterThanEqual(Double minAmount);
    List<Order> findByCustomer_CustomerIdAndStatus(int customerId, OrderStatus status);
//    List<Order> findByRestaurant_RestaurantIdAndStatus(int restaurantId, OrderStatus status);
}
