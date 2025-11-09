package iuh.fit.food_delivery_app_backend.respository;

import iuh.fit.food_delivery_app_backend.entity.Voucher;
import iuh.fit.food_delivery_app_backend.enums.DiscountType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface VoucherRepository extends JpaRepository<Voucher, Integer> {
    List<Voucher> findByNameContainingIgnoreCase(String name);
    List<Voucher> findByDiscountType(DiscountType discountType);
    List<Voucher> findByIsActiveTrue();
    List<Voucher> findByIsActiveTrueAndStartDateLessThanEqualAndEndDateGreaterThanEqual(LocalDate startDate, LocalDate endDate);
    List<Voucher> findByDiscountValueGreaterThanEqual(Double minDiscount);
//    List<Voucher> findByIsActiveTrueAndStartDateLessThanEqualAndEndDateGreaterThanEqual(LocalDate date);
    List<Voucher> findByNameContainingIgnoreCaseAndIsActiveTrue(String name);
}