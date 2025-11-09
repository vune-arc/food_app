package iuh.fit.food_delivery_app_backend.controller;

import iuh.fit.food_delivery_app_backend.entity.Driver;
import iuh.fit.food_delivery_app_backend.service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drivers")
@CrossOrigin(origins = "*")
public class DriverController {

    @Autowired
    private DriverService driverService;

    @GetMapping
    public ResponseEntity<List<Driver>> getAllDrivers() {
        List<Driver> drivers = driverService.getAllDrivers();
        return ResponseEntity.ok(drivers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Driver> getDriverById(@PathVariable Integer id) {
        return driverService.getDriverById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<Driver> getDriverByUsername(@PathVariable String username) {
        return driverService.getDriverByUsername(username)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/rating/{minRating}")
    public ResponseEntity<List<Driver>> getDriversByRating(@PathVariable Double minRating) {
        List<Driver> drivers = driverService.getDriversByRating(minRating);
        return ResponseEntity.ok(drivers);
    }

    @GetMapping("/location/{location}")
    public ResponseEntity<List<Driver>> getDriversByLocation(@PathVariable String location) {
        List<Driver> drivers = driverService.getDriversByLocation(location);
        return ResponseEntity.ok(drivers);
    }

    @GetMapping("/search/vehicle")
    public ResponseEntity<List<Driver>> searchDriversByVehicle(@RequestParam String vehicleNumber) {
        List<Driver> drivers = driverService.searchDriversByVehicle(vehicleNumber);
        return ResponseEntity.ok(drivers);
    }

    @PostMapping
    public ResponseEntity<Driver> createDriver(@RequestBody Driver driver) {
        try {
            Driver createdDriver = driverService.createDriver(driver);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdDriver);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Driver> updateDriver(@PathVariable Integer id, @RequestBody Driver driver) {
        try {
            Driver updatedDriver = driverService.updateDriver(id, driver);
            return ResponseEntity.ok(updatedDriver);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}/rating")
    public ResponseEntity<Driver> updateDriverRating(@PathVariable Integer id, @RequestParam Double rating) {
        try {
            Driver updatedDriver = driverService.updateDriverRating(id, rating);
            return ResponseEntity.ok(updatedDriver);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDriver(@PathVariable Integer id) {
        driverService.deleteDriver(id);
        return ResponseEntity.noContent().build();
    }
}
