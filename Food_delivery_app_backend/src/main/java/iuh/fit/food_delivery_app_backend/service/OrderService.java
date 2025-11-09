package iuh.fit.food_delivery_app_backend.service;

import iuh.fit.food_delivery_app_backend.dto.CreateOrderRequest;
import iuh.fit.food_delivery_app_backend.entity.*;
import iuh.fit.food_delivery_app_backend.enums.OrderStatus;
import iuh.fit.food_delivery_app_backend.respository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private DriverRepository driverRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private VoucherRepository voucherRepository;
    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    private OrderDetailRepository orderDetailRepository;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(Integer id) {
        return orderRepository.findById(id);
    }

    @Transactional
    public Order checkoutAndCreateOrder(CreateOrderRequest request) {
        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));
//        Restaurant restaurant = restaurantRepository.findById(request.getRestaurantId())
//                .orElseThrow(() -> new RuntimeException("Restaurant not found"));

        // Lấy danh sách CartItem
        List<Integer> cartItemIds = request.getItems().stream()
                .map(CreateOrderRequest.OrderItemRequest::getCartItemId)
                .toList();
        List<CartItem> cartItems = cartItemRepository.findAllById(cartItemIds);

        if (cartItems.isEmpty()) {
            throw new RuntimeException("No cart items selected");
        }

        // Cập nhật quantity + paid cho CartItem
        for (CreateOrderRequest.OrderItemRequest itemReq : request.getItems()) {
            CartItem cartItem = cartItems.stream()
                    .filter(c -> c.getCartItemId() == itemReq.getCartItemId())
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("CartItem not found: " + itemReq.getCartItemId()));

            cartItem.setQuantity(itemReq.getQuantity());
            cartItem.updateSubTotal();
            cartItem.setPaid(true);
        }
        cartItemRepository.saveAll(cartItems);

        // Tạo Order
        Order order = new Order();
        order.setCustomer(customer);
//        order.setRestaurant(restaurant);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(OrderStatus.PENDING);
        order.setPaymentMethod(request.getPaymentMethod());
        order.setDeliveryFee(request.getDeliveryFee());
        order.setPromotionDiscount(request.getPromotionDiscount());

        // Tính tổng tiền
        Double deliveryFee = request.getDeliveryFee();
        Double promotionDiscount = request.getPromotionDiscount();

        double total = cartItems.stream().mapToDouble(CartItem::getSubTotal).sum();
        total += (deliveryFee != null ? deliveryFee : 0.0);
        total -= (promotionDiscount != null ? promotionDiscount : 0.0);
        order.setTotalAmount(total);

        // Lưu order để có ID
        orderRepository.save(order);

        // Tạo OrderDetail từ CartItem
        List<OrderDetail> orderDetails = new ArrayList<>();
        for (CartItem item : cartItems) {
            OrderDetail detail = new OrderDetail();
            detail.setOrder(order);
            detail.setCartItem(item);
            detail.setQuantity(item.getQuantity());
            detail.setUnitPrice(item.getSubTotal() / item.getQuantity());
            orderDetails.add(detail);
        }

        orderDetailRepository.saveAll(orderDetails);
        order.setOrderDetails(orderDetails);

        return order;
    }



















    public List<Order> getOrdersByCustomer(Integer customerId) {
        return orderRepository.findByCustomer_CustomerId(customerId);
    }
//
//    public List<Order> getOrdersByRestaurant(Integer restaurantId) {
//        return orderRepository.findByRestaurant_RestaurantId(restaurantId);
//    }

    public List<Order> getOrdersByDriver(Integer driverId) {
        return orderRepository.findByDriver_DriverId(driverId);
    }

    public List<Order> getOrdersByStatus(OrderStatus status) {
        return orderRepository.findByStatus(status);
    }

    public List<Order> getOrdersByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return orderRepository.findByOrderDateBetween(startDate, endDate);
    }

//    public Order createOrder(Order order) {
//        // Validate relationships
//        if (order.getCustomer() != null && !customerRepository.existsById(order.getCustomer().getCustomerId())) {
//            throw new RuntimeException("Customer not found");
//        }
//        if (order.getRestaurant() != null && !restaurantRepository.existsById(order.getRestaurant().getRestaurantId())) {
//            throw new RuntimeException("Restaurant not found");
//        }
//        return orderRepository.save(order);
//    }


    public Order updateOrderStatus(Integer id, OrderStatus status) {
        return orderRepository.findById(id)
                .map(order -> {
                    order.setStatus(status);
                    return orderRepository.save(order);
                })
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
    }

    public Order updateOrder(Integer id, Order orderDetails) {
        return orderRepository.findById(id)
                .map(order -> {
                    order.setStatus(orderDetails.getStatus());
                    order.setTotalAmount(orderDetails.getTotalAmount());
                    order.setDeliveryFee(orderDetails.getDeliveryFee());
                    order.setPromotionDiscount(orderDetails.getPromotionDiscount());
                    return orderRepository.save(order);
                })
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
    }

    public void deleteOrder(Integer id) {
        orderRepository.deleteById(id);
    }
}
