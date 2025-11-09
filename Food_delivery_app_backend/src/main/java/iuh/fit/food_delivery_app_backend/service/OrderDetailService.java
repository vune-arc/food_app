package iuh.fit.food_delivery_app_backend.service;

import iuh.fit.food_delivery_app_backend.entity.OrderDetail;
import iuh.fit.food_delivery_app_backend.respository.FoodRepository;
import iuh.fit.food_delivery_app_backend.respository.OrderDetailRepository;
import iuh.fit.food_delivery_app_backend.respository.OrderRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class OrderDetailService {

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private FoodRepository foodRepository;

    public List<OrderDetail> getAllOrderDetails() {
        return orderDetailRepository.findAll();
    }

    public Optional<OrderDetail> getOrderDetailById(Integer id) {
        return orderDetailRepository.findById(id);
    }

    public List<OrderDetail> getOrderDetailsByOrder(Integer orderId) {
        return orderDetailRepository.findByOrder_OrderId(orderId);
    }

//    public List<OrderDetail> getOrderDetailsByFood(Integer foodId) {
//        return orderDetailRepository.findByFood_FoodId(foodId);
//    }

    public List<OrderDetail> getOrderDetailsByUnitPriceRange(Double minPrice, Double maxPrice) {
        return orderDetailRepository.findByUnitPriceBetween(minPrice, maxPrice);
    }

    public List<OrderDetail> getOrderDetailsByMinQuantity(Integer minQuantity) {
        return orderDetailRepository.findByQuantityGreaterThanEqual(minQuantity);
    }

//    public OrderDetail createOrderDetail(OrderDetail orderDetail) {
//        // Validate relationships
//        if (orderDetail.getOrder() != null && !orderRepository.existsById(orderDetail.getOrder().getOrderId())) {
//            throw new RuntimeException("Order not found");
//        }
//        if (orderDetail.getFood() != null && !foodRepository.existsById(orderDetail.getFood().getFoodId())) {
//            throw new RuntimeException("Food not found");
//        }
//        return orderDetailRepository.save(orderDetail);
//    }

    public OrderDetail updateOrderDetail(Integer id, OrderDetail orderDetailDetails) {
        return orderDetailRepository.findById(id)
                .map(orderDetail -> {
                    orderDetail.setQuantity(orderDetailDetails.getQuantity());
                    orderDetail.setUnitPrice(orderDetailDetails.getUnitPrice());
                    return orderDetailRepository.save(orderDetail);
                })
                .orElseThrow(() -> new RuntimeException("OrderDetail not found with id: " + id));
    }

    public void deleteOrderDetail(Integer id) {
        orderDetailRepository.deleteById(id);
    }

    public void deleteOrderDetailsByOrder(Integer orderId) {
        List<OrderDetail> orderDetails = orderDetailRepository.findByOrder_OrderId(orderId);
        orderDetailRepository.deleteAll(orderDetails);
    }
}
