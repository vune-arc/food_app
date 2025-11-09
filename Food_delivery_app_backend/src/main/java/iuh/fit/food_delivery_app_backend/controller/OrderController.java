package iuh.fit.food_delivery_app_backend.controller;


import iuh.fit.food_delivery_app_backend.dto.CreateOrderRequest;
import iuh.fit.food_delivery_app_backend.entity.Order;
import iuh.fit.food_delivery_app_backend.enums.OrderStatus;
import iuh.fit.food_delivery_app_backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    @PostMapping("/checkout")
    public ResponseEntity<Order> checkoutAndCreateOrder(@RequestBody CreateOrderRequest request) {
        try {
            Order order = orderService.checkoutAndCreateOrder(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(order);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
//    @PostMapping
//    public ResponseEntity<Order> addOrder(@RequestBody CreateOrderRequest request) {
//        try {
//            // Gọi service, service trả về Order thực tế
////            Order createdOrder = orderService.createOrder(request);
//            return ResponseEntity.status(HttpStatus.CREATED).body(createdOrder);
//        } catch (RuntimeException e) {
//            return ResponseEntity.badRequest().build();
//        }
//    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Integer id) {
        return orderService.getOrderById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Order>> getOrdersByCustomer(@PathVariable Integer customerId) {
        List<Order> orders = orderService.getOrdersByCustomer(customerId);
        return ResponseEntity.ok(orders);
    }

//    @GetMapping("/restaurant/{restaurantId}")
//    public ResponseEntity<List<Order>> getOrdersByRestaurant(@PathVariable Integer restaurantId) {
//        List<Order> orders = orderService.getOrdersByRestaurant(restaurantId);
//        return ResponseEntity.ok(orders);
//    }

    @GetMapping("/driver/{driverId}")
    public ResponseEntity<List<Order>> getOrdersByDriver(@PathVariable Integer driverId) {
        List<Order> orders = orderService.getOrdersByDriver(driverId);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Order>> getOrdersByStatus(@PathVariable OrderStatus status) {
        List<Order> orders = orderService.getOrdersByStatus(status);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/date-range")
    public ResponseEntity<List<Order>> getOrdersByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        List<Order> orders = orderService.getOrdersByDateRange(startDate, endDate);
        return ResponseEntity.ok(orders);
    }

//    @PostMapping
//    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
//        try {
//            Order createdOrder = orderService.createOrder(order);
//            return ResponseEntity.status(HttpStatus.CREATED).body(createdOrder);
//        } catch (RuntimeException e) {
//            return ResponseEntity.badRequest().build();
//        }
//    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Integer id, @RequestParam OrderStatus status) {
        try {
            Order updatedOrder = orderService.updateOrderStatus(id, status);
            return ResponseEntity.ok(updatedOrder);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable Integer id, @RequestBody Order order) {
        try {
            Order updatedOrder = orderService.updateOrder(id, order);
            return ResponseEntity.ok(updatedOrder);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Integer id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }


}
