package iuh.fit.food_delivery_app_backend.service;

import iuh.fit.food_delivery_app_backend.dto.request.CartItemRequest;
import iuh.fit.food_delivery_app_backend.dto.request.SelectedOptions;
import iuh.fit.food_delivery_app_backend.entity.*;
import iuh.fit.food_delivery_app_backend.respository.CartItemRepository;
import iuh.fit.food_delivery_app_backend.respository.CartRepository;
import iuh.fit.food_delivery_app_backend.respository.FoodOptionRepository;
import iuh.fit.food_delivery_app_backend.respository.FoodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CartService {

    private final CartRepository cartRepository;
    private final FoodRepository foodRepository;
    private final FoodOptionRepository foodOptionRepository;
    private final CartItemRepository cartItemRepository;

    @Transactional
    public void addToCart(int customerId, CartItemRequest req) {
        // 🔹 1. Tìm hoặc tạo giỏ hàng
        Cart cart = cartRepository.findByCustomer_CustomerId(customerId)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    Customer c = new Customer();
                    c.setCustomerId(customerId);
                    newCart.setCustomer(c);
                    newCart.setTotalPrice(0.0);
                    return cartRepository.save(newCart);
                });

        Food food = foodRepository.findById(req.getFoodId())
                .orElseThrow(() -> new RuntimeException("Food not found"));

        // 🔹 2. Chuẩn bị danh sách option được chọn
        List<String> optionNames = new ArrayList<>();
        SelectedOptions opt = req.getSelectedOptions();
        if (opt != null) {
            if (opt.getSize() != null) optionNames.add(opt.getSize());
            if (opt.getSpiciness() != null) optionNames.add(opt.getSpiciness());
            if (opt.getToppings() != null) optionNames.addAll(opt.getToppings());
        }

        List<FoodOption> foodOptions = optionNames.isEmpty()
                ? new ArrayList<>()
                : foodOptionRepository.findByFood_FoodIdAndOptionNameIn(req.getFoodId(), optionNames);

        // 🔹 3. Kiểm tra xem món này với cùng options đã tồn tại trong giỏ chưa
        boolean foundDuplicate = false;

        for (CartItem existingItem : cart.getCartItems()) {
            if (existingItem.isPaid()) continue;
            if (existingItem.getFood().getFoodId() == food.getFoodId()) {

                List<String> existingOptionNames = existingItem.getOptions() == null
                        ? new ArrayList<>()
                        : existingItem.getOptions().stream()
                        .map(o -> o.getFoodOption().getOptionName())
                        .toList();

                boolean noOptions = existingOptionNames.isEmpty() ;
                boolean sameOptions = new HashSet<>(existingOptionNames).equals(new HashSet<>(optionNames));

                if (noOptions || sameOptions) {
                    existingItem.setQuantity(existingItem.getQuantity() + req.getQuantity());
                    existingItem.updateSubTotal();
                    foundDuplicate = true;
                    break;
                }
                System.out.println("Existing foodId = " + existingItem.getFood().getFoodId());
                System.out.println("New foodId = " + food.getFoodId());
                System.out.println("Existing options = " + existingOptionNames);
                System.out.println("New options = " + optionNames);
                System.out.println("Match? " + (noOptions || sameOptions));

            }
        }



        // 🔹 4. Nếu chưa có thì thêm item mới
        if (!foundDuplicate) {
            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setFood(food);
            newItem.setQuantity(req.getQuantity());

            // Tạo list CartItemOption
            List<CartItemOption> cartItemOptions = new ArrayList<>();
            for (FoodOption fo : foodOptions) {
                CartItemOption itemOption = new CartItemOption();
                itemOption.setCartItem(newItem);
                itemOption.setFoodOption(fo);
                cartItemOptions.add(itemOption);
            }
            newItem.setOptions(cartItemOptions);

            newItem.updateSubTotal();
            cart.getCartItems().add(newItem);
        }

        // 🔹 5. Cập nhật tổng giá giỏ hàng và lưu
        cart.updateTotalPrice(false);
        cartRepository.save(cart);
    }


    public Cart getCartByCustomerId(int customerId) {
        return cartRepository.findByCustomer_CustomerId(customerId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));
    }
}
