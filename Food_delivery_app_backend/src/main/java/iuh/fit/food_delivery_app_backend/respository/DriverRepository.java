package iuh.fit.food_delivery_app_backend.respository;

import iuh.fit.food_delivery_app_backend.entity.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DriverRepository extends JpaRepository<Driver, Integer> {
    Optional<Driver> findByUsername(String username);
    Optional<Driver> findByEmail(String email);
    Optional<Driver> findByPhone(String phone);
    List<Driver> findByRatingTotalGreaterThanEqual(Double minRating);
    List<Driver> findByLocationContainingIgnoreCase(String location);
    List<Driver> findByVehicleNumberContaining(String vehicleNumber);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);
}
