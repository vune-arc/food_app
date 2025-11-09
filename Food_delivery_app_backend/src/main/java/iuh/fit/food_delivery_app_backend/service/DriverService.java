package iuh.fit.food_delivery_app_backend.service;

import iuh.fit.food_delivery_app_backend.entity.Driver;
import iuh.fit.food_delivery_app_backend.respository.DriverRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class DriverService {

    @Autowired
    private DriverRepository driverRepository;

    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }

    public Optional<Driver> getDriverById(Integer id) {
        return driverRepository.findById(id);
    }

    public Optional<Driver> getDriverByUsername(String username) {
        return driverRepository.findByUsername(username);
    }

    public List<Driver> getDriversByRating(Double minRating) {
        return driverRepository.findByRatingTotalGreaterThanEqual(minRating);
    }

    public List<Driver> getDriversByLocation(String location) {
        return driverRepository.findByLocationContainingIgnoreCase(location);
    }

    public List<Driver> searchDriversByVehicle(String vehicleNumber) {
        return driverRepository.findByVehicleNumberContaining(vehicleNumber);
    }

    public Driver createDriver(Driver driver) {
        if (driverRepository.existsByUsername(driver.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        if (driverRepository.existsByEmail(driver.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        return driverRepository.save(driver);
    }

    public Driver updateDriver(Integer id, Driver driverDetails) {
        return driverRepository.findById(id)
                .map(driver -> {
                    driver.setUsername(driverDetails.getUsername());
                    driver.setEmail(driverDetails.getEmail());
                    driver.setPhone(driverDetails.getPhone());
                    driver.setLocation(driverDetails.getLocation());
                    driver.setRatingTotal(driverDetails.getRatingTotal());
                    driver.setVehicleNumber(driverDetails.getVehicleNumber());
                    return driverRepository.save(driver);
                })
                .orElseThrow(() -> new RuntimeException("Driver not found with id: " + id));
    }

    public Driver updateDriverRating(Integer id, Double newRating) {
        return driverRepository.findById(id)
                .map(driver -> {
                    driver.setRatingTotal(newRating);
                    return driverRepository.save(driver);
                })
                .orElseThrow(() -> new RuntimeException("Driver not found with id: " + id));
    }

    public void deleteDriver(Integer id) {
        driverRepository.deleteById(id);
    }
}