package iuh.fit.food_delivery_app_backend.service;

import iuh.fit.food_delivery_app_backend.entity.CartItem;
import iuh.fit.food_delivery_app_backend.respository.CartItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class CartItemService {

    private final CartItemRepository cartItemRepository;

    // 🔼 Tăng số lượng
    public void increaseQuantity(int itemId) {
        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        item.setQuantity(item.getQuantity() + 1);
        item.updateSubTotal();
        cartItemRepository.save(item);
    }

    // 🔽 Giảm số lượng
    public void decreaseQuantity(int itemId) {
        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        if (item.getQuantity() > 1) {
            item.setQuantity(item.getQuantity() - 1);
            item.updateSubTotal();
            cartItemRepository.save(item);
        } else {
            // nếu số lượng = 1 → xóa item
            cartItemRepository.delete(item);
        }
    }

    // 🗑️ Xóa item
    public void removeItem(int itemId) {
        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        cartItemRepository.delete(item);
    }
}
