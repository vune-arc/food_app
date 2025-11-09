package iuh.fit.food_delivery_app_backend.service;

import iuh.fit.food_delivery_app_backend.entity.FoodOption;
import iuh.fit.food_delivery_app_backend.enums.OptionType;
import iuh.fit.food_delivery_app_backend.respository.FoodOptionRepository;
import iuh.fit.food_delivery_app_backend.respository.FoodRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class FoodOptionService {

    @Autowired
    private FoodOptionRepository foodOptionRepository;

    @Autowired
    private FoodRepository foodRepository;

    public List<FoodOption> getAllFoodOptions() {
        return foodOptionRepository.findAll();
    }

    public Optional<FoodOption> getFoodOptionById(Integer id) {
        return foodOptionRepository.findById(id);
    }

    public List<FoodOption> getFoodOptionsByType(OptionType optionType) {
        return foodOptionRepository.findByOptionType(optionType);
    }

    public List<FoodOption> getFoodOptionsByFood(Integer foodId) {
        return foodOptionRepository.findByFood_FoodId(foodId);
    }

    public List<FoodOption> getFoodOptionsByFoodAndType(Integer foodId, OptionType optionType) {
        return foodOptionRepository.findByFood_FoodIdAndOptionType(foodId, optionType);
    }

    public List<FoodOption> searchFoodOptionsByName(String optionName) {
        return foodOptionRepository.findByOptionNameContainingIgnoreCase(optionName);
    }

    public List<FoodOption> getFoodOptionsByPriceRange(Double minPrice, Double maxPrice) {
        return foodOptionRepository.findByAdditionalPriceBetween(minPrice, maxPrice);
    }

    public FoodOption createFoodOption(FoodOption foodOption) {
        if (foodOption.getFood() != null && !foodRepository.existsById(foodOption.getFood().getFoodId())) {
            throw new RuntimeException("Food not found");
        }
        return foodOptionRepository.save(foodOption);
    }

    public FoodOption updateFoodOption(Integer id, FoodOption foodOptionDetails) {
        return foodOptionRepository.findById(id)
                .map(foodOption -> {
                    foodOption.setOptionType(foodOptionDetails.getOptionType());
                    foodOption.setOptionName(foodOptionDetails.getOptionName());
                    foodOption.setAdditionalPrice(foodOptionDetails.getAdditionalPrice());
                    return foodOptionRepository.save(foodOption);
                })
                .orElseThrow(() -> new RuntimeException("FoodOption not found with id: " + id));
    }

    public void deleteFoodOption(Integer id) {
        foodOptionRepository.deleteById(id);
    }

    public void deleteFoodOptionsByFood(Integer foodId) {
        List<FoodOption> options = foodOptionRepository.findByFood_FoodId(foodId);
        foodOptionRepository.deleteAll(options);
    }
}
