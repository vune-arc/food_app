package iuh.fit.food_delivery_app_backend.controller;

import iuh.fit.food_delivery_app_backend.entity.OrderDetail;
import iuh.fit.food_delivery_app_backend.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order-details")
@CrossOrigin(origins = "*")
public class OrderDetailController {

    @Autowired
    private OrderDetailService orderDetailService;

    @GetMapping
    public ResponseEntity<List<OrderDetail>> getAllOrderDetails() {
        List<OrderDetail> orderDetails = orderDetailService.getAllOrderDetails();
        return ResponseEntity.ok(orderDetails);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDetail> getOrderDetailById(@PathVariable Integer id) {
        return orderDetailService.getOrderDetailById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<List<OrderDetail>> getOrderDetailsByOrder(@PathVariable Integer orderId) {
        List<OrderDetail> orderDetails = orderDetailService.getOrderDetailsByOrder(orderId);
        return ResponseEntity.ok(orderDetails);
    }

//    @GetMapping("/food/{foodId}")
//    public ResponseEntity<List<OrderDetail>> getOrderDetailsByFood(@PathVariable Integer foodId) {
//        List<OrderDetail> orderDetails = orderDetailService.getOrderDetailsByFood(foodId);
//        return ResponseEntity.ok(orderDetails);
//    }

    @GetMapping("/unit-price-range")
    public ResponseEntity<List<OrderDetail>> getOrderDetailsByUnitPriceRange(
            @RequestParam Double minPrice,
            @RequestParam Double maxPrice) {
        List<OrderDetail> orderDetails = orderDetailService.getOrderDetailsByUnitPriceRange(minPrice, maxPrice);
        return ResponseEntity.ok(orderDetails);
    }

    @GetMapping("/quantity/{minQuantity}")
    public ResponseEntity<List<OrderDetail>> getOrderDetailsByMinQuantity(@PathVariable Integer minQuantity) {
        List<OrderDetail> orderDetails = orderDetailService.getOrderDetailsByMinQuantity(minQuantity);
        return ResponseEntity.ok(orderDetails);
    }

//    @PostMapping
//    public ResponseEntity<OrderDetail> createOrderDetail(@RequestBody OrderDetail orderDetail) {
//        try {
//            OrderDetail createdOrderDetail = orderDetailService.createOrderDetail(orderDetail);
//            return ResponseEntity.status(HttpStatus.CREATED).body(createdOrderDetail);
//        } catch (RuntimeException e) {
//            return ResponseEntity.badRequest().build();
//        }
//    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderDetail> updateOrderDetail(@PathVariable Integer id, @RequestBody OrderDetail orderDetail) {
        try {
            OrderDetail updatedOrderDetail = orderDetailService.updateOrderDetail(id, orderDetail);
            return ResponseEntity.ok(updatedOrderDetail);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrderDetail(@PathVariable Integer id) {
        orderDetailService.deleteOrderDetail(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/order/{orderId}")
    public ResponseEntity<Void> deleteOrderDetailsByOrder(@PathVariable Integer orderId) {
        orderDetailService.deleteOrderDetailsByOrder(orderId);
        return ResponseEntity.noContent().build();
    }
}
