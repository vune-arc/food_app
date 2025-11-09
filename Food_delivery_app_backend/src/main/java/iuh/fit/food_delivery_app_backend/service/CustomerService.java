package iuh.fit.food_delivery_app_backend.service;

import iuh.fit.food_delivery_app_backend.entity.Customer;
import iuh.fit.food_delivery_app_backend.respository.CustomerRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Optional<Customer> getCustomerById(Integer id) {
        return customerRepository.findById(id);
    }

    public Optional<Customer> getCustomerByUsername(String username) {
        return customerRepository.findByUsername(username);
    }

    public Optional<Customer> getCustomerByEmail(String email) {
        return customerRepository.findByEmail(email);
    }

    public List<Customer> searchCustomersByUsername(String username) {
        return customerRepository.findByUsernameContainingIgnoreCase(username);
    }

    public Customer createCustomer(Customer customer) {
        if (customerRepository.existsByUsername(customer.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        if (customerRepository.existsByEmail(customer.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        return customerRepository.save(customer);
    }

    public Customer updateCustomer(Integer id, Customer customerDetails) {
        return customerRepository.findById(id)
                .map(customer -> {
                    // ✅ Kiểm tra trùng username
                    if (!customer.getUsername().equals(customerDetails.getUsername())) {
                        boolean exists = customerRepository.existsByUsername(customerDetails.getUsername());
                        if (exists) {
                            throw new RuntimeException("Username already exists");
                        }
                    }

                    customer.setUsername(customerDetails.getUsername());
                    customer.setEmail(customerDetails.getEmail());
                    customer.setPhone(customerDetails.getPhone());
                    customer.setAvatar(customerDetails.getAvatar());
                    customer.setAddress(customerDetails.getAddress());
                    return customerRepository.save(customer);
                })
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + id));
    }



    public void deleteCustomer(Integer id) {
        customerRepository.deleteById(id);
    }
    public boolean existsByUsername(String userName) {
        return customerRepository.existsByUsername(userName);
    }
}