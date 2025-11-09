package iuh.fit.food_delivery_app_backend.respository;

import iuh.fit.food_delivery_app_backend.entity.FoodOption;
import iuh.fit.food_delivery_app_backend.enums.OptionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodOptionRepository extends JpaRepository<FoodOption, Integer> {
    List<FoodOption> findByOptionType(OptionType optionType);
    List<FoodOption> findByFood_FoodId(int foodId);
    List<FoodOption> findByFood_FoodIdAndOptionType(int foodId, OptionType optionType);
    List<FoodOption> findByOptionNameContainingIgnoreCase(String optionName);
    List<FoodOption> findByAdditionalPriceBetween(Double minPrice, Double maxPrice);
    List<FoodOption> findByFood_FoodIdAndOptionNameIn(int foodId, List<String> names);


}
