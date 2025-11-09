package iuh.fit.food_delivery_app_backend.controller;

import iuh.fit.food_delivery_app_backend.entity.Customer;
import iuh.fit.food_delivery_app_backend.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@Controller
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private CustomerService customerService;
    @Autowired
    private PasswordEncoder passwordEncoder;


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Customer customer) {
        if (customerService.getCustomerByUsername(customer.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        customer.setPassword(passwordEncoder.encode(customer.getPassword()));
        customer.setRole("ROLE_CUSTOMER");
        customerService.createCustomer(customer);
        return ResponseEntity.ok("Register success");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> req) {
        String username = req.get("username");
        String password = req.get("password");

        Customer customer = customerService.getCustomerByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(password, customer.getPassword())) {
            return ResponseEntity.badRequest().body("Wrong password");
        }

        // (Có thể thêm JWT ở đây, tạm thời trả thẳng thông tin)
        return ResponseEntity.ok(customer);
    }
}
