package iuh.fit.food_delivery_app_backend.service;

import iuh.fit.food_delivery_app_backend.entity.Voucher;
import iuh.fit.food_delivery_app_backend.enums.DiscountType;
import iuh.fit.food_delivery_app_backend.respository.VoucherRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class VoucherService {

    @Autowired
    private VoucherRepository voucherRepository;

    public List<Voucher> getAllVouchers() {
        return voucherRepository.findAll();
    }

    public Optional<Voucher> getVoucherById(Integer id) {
        return voucherRepository.findById(id);
    }

    public List<Voucher> getVouchersByName(String name) {
        return voucherRepository.findByNameContainingIgnoreCase(name);
    }

    public List<Voucher> getVouchersByDiscountType(DiscountType discountType) {
        return voucherRepository.findByDiscountType(discountType);
    }

    public List<Voucher> getActiveVouchers() {
        return voucherRepository.findByIsActiveTrue();
    }

//    public List<Voucher> getValidVouchers(LocalDate date) {
//        return voucherRepository.findByIsActiveTrueAndStartDateLessThanEqualAndEndDateGreaterThanEqual(date, date);
//    }


    public List<Voucher> getVouchersByMinDiscount(Double minDiscount) {
        return voucherRepository.findByDiscountValueGreaterThanEqual(minDiscount);
    }

    public List<Voucher> searchActiveVouchersByName(String name) {
        return voucherRepository.findByNameContainingIgnoreCaseAndIsActiveTrue(name);
    }

    public Voucher createVoucher(Voucher voucher) {
        return voucherRepository.save(voucher);
    }

    public Voucher updateVoucher(Integer id, Voucher voucherDetails) {
        return voucherRepository.findById(id)
                .map(voucher -> {
                    voucher.setName(voucherDetails.getName());
                    voucher.setDescription(voucherDetails.getDescription());
                    voucher.setStartDate(voucherDetails.getStartDate());
                    voucher.setEndDate(voucherDetails.getEndDate());
                    voucher.setIsActive(voucherDetails.getIsActive());
                    voucher.setDiscountType(voucherDetails.getDiscountType());
                    voucher.setDiscountValue(voucherDetails.getDiscountValue());
                    return voucherRepository.save(voucher);
                })
                .orElseThrow(() -> new RuntimeException("Voucher not found with id: " + id));
    }

    public Voucher updateVoucherStatus(Integer id, Boolean isActive) {
        return voucherRepository.findById(id)
                .map(voucher -> {
                    voucher.setIsActive(isActive);
                    return voucherRepository.save(voucher);
                })
                .orElseThrow(() -> new RuntimeException("Voucher not found with id: " + id));
    }

    public void deleteVoucher(Integer id) {
        voucherRepository.deleteById(id);
    }
}
