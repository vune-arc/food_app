package iuh.fit.food_delivery_app_backend.respository;

import iuh.fit.food_delivery_app_backend.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
    List<OrderDetail> findByOrder_OrderId(int orderId);
//    List<OrderDetail> findByFood_FoodId(int foodId);
//    List<OrderDetail> findByOrder_OrderIdAndFood_FoodId(int orderId, int foodId);
    List<OrderDetail> findByUnitPriceBetween(Double minPrice, Double maxPrice);
    List<OrderDetail> findByQuantityGreaterThanEqual(Integer minQuantity);
}
