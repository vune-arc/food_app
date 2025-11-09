package iuh.fit.food_delivery_app_backend.controller;

import iuh.fit.food_delivery_app_backend.entity.Voucher;
import iuh.fit.food_delivery_app_backend.enums.DiscountType;
import iuh.fit.food_delivery_app_backend.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/vouchers")
@CrossOrigin(origins = "*")
public class VoucherController {

    @Autowired
    private VoucherService voucherService;

    @GetMapping
    public ResponseEntity<List<Voucher>> getAllVouchers() {
        List<Voucher> vouchers = voucherService.getAllVouchers();
        return ResponseEntity.ok(vouchers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Voucher> getVoucherById(@PathVariable Integer id) {
        return voucherService.getVoucherById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Voucher>> getVouchersByName(@RequestParam String name) {
        List<Voucher> vouchers = voucherService.getVouchersByName(name);
        return ResponseEntity.ok(vouchers);
    }

    @GetMapping("/discount-type/{discountType}")
    public ResponseEntity<List<Voucher>> getVouchersByDiscountType(@PathVariable DiscountType discountType) {
        List<Voucher> vouchers = voucherService.getVouchersByDiscountType(discountType);
        return ResponseEntity.ok(vouchers);
    }

    @GetMapping("/active")
    public ResponseEntity<List<Voucher>> getActiveVouchers() {
        List<Voucher> vouchers = voucherService.getActiveVouchers();
        return ResponseEntity.ok(vouchers);
    }

//    @GetMapping("/valid")
//    public ResponseEntity<List<Voucher>> getValidVouchers(@RequestParam LocalDate date) {
//        List<Voucher> vouchers = voucherService.getValidVouchers(date);
//        return ResponseEntity.ok(vouchers);
//    }

    @GetMapping("/discount/{minDiscount}")
    public ResponseEntity<List<Voucher>> getVouchersByMinDiscount(@PathVariable Double minDiscount) {
        List<Voucher> vouchers = voucherService.getVouchersByMinDiscount(minDiscount);
        return ResponseEntity.ok(vouchers);
    }

    @GetMapping("/search/active")
    public ResponseEntity<List<Voucher>> searchActiveVouchers(@RequestParam String name) {
        List<Voucher> vouchers = voucherService.searchActiveVouchersByName(name);
        return ResponseEntity.ok(vouchers);
    }

    @PostMapping
    public ResponseEntity<Voucher> createVoucher(@RequestBody Voucher voucher) {
        Voucher createdVoucher = voucherService.createVoucher(voucher);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdVoucher);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Voucher> updateVoucher(@PathVariable Integer id, @RequestBody Voucher voucher) {
        try {
            Voucher updatedVoucher = voucherService.updateVoucher(id, voucher);
            return ResponseEntity.ok(updatedVoucher);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Voucher> updateVoucherStatus(@PathVariable Integer id, @RequestParam Boolean isActive) {
        try {
            Voucher updatedVoucher = voucherService.updateVoucherStatus(id, isActive);
            return ResponseEntity.ok(updatedVoucher);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVoucher(@PathVariable Integer id) {
        voucherService.deleteVoucher(id);
        return ResponseEntity.noContent().build();
    }
}