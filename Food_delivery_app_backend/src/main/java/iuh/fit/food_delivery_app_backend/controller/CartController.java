package iuh.fit.food_delivery_app_backend.controller;

import iuh.fit.food_delivery_app_backend.dto.request.CartItemRequest;
import iuh.fit.food_delivery_app_backend.service.CartItemService;
import iuh.fit.food_delivery_app_backend.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/carts")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;
    private final CartItemService cartItemService;

    @PostMapping("/{customerId}/items")
    public ResponseEntity<?> addToCart(
            @PathVariable int customerId,
            @RequestBody CartItemRequest request) {

        cartService.addToCart(customerId, request);
        return ResponseEntity.ok("Added to cart successfully");
    }

    @GetMapping("/{customerId}")
    public ResponseEntity<?> getCart(@PathVariable int customerId) {
        var cart = cartService.getCartByCustomerId(customerId);

        if (cart != null && cart.getCartItems() != null) {
            // Lọc chỉ lấy các CartItem chưa thanh toán
            cart.setCartItems(
                    cart.getCartItems().stream()
                            .filter(item -> !item.isPaid())
                            .toList()
            );
        }

        return ResponseEntity.ok(cart);
    }
    //  Tăng số lượng
    @PutMapping("/item/{itemId}/increase")
    public ResponseEntity<?> increaseQuantity(@PathVariable int itemId) {
        cartItemService.increaseQuantity(itemId);
        return ResponseEntity.ok("Increased item quantity");
    }

    //  Giảm số lượng
    @PutMapping("/item/{itemId}/decrease")
    public ResponseEntity<?> decreaseQuantity(@PathVariable int itemId) {
        cartItemService.decreaseQuantity(itemId);
        return ResponseEntity.ok("Decreased item quantity");
    }

    // 🗑 Xóa item
    @DeleteMapping("/item/{itemId}")
    public ResponseEntity<?> removeItem(@PathVariable int itemId) {
        cartItemService.removeItem(itemId);
        return ResponseEntity.ok("Item removed");
    }
}
