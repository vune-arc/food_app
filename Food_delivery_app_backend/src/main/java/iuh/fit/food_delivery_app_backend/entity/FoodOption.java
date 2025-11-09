package iuh.fit.food_delivery_app_backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import iuh.fit.food_delivery_app_backend.enums.OptionType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "FoodOptions")
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FoodOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Enumerated(EnumType.STRING)
    private OptionType optionType;

    private String optionName;
    private Double additionalPrice;

    @ManyToOne
    @JoinColumn(name = "foodId")
    @JsonIgnore
    private Food food;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public OptionType getOptionType() {
        return optionType;
    }

    public void setOptionType(OptionType optionType) {
        this.optionType = optionType;
    }

    public String getOptionName() {
        return optionName;
    }

    public void setOptionName(String optionName) {
        this.optionName = optionName;
    }

    public Double getAdditionalPrice() {
        return additionalPrice;
    }

    public void setAdditionalPrice(Double additionalPrice) {
        this.additionalPrice = additionalPrice;
    }

    public Food getFood() {
        return food;
    }

    public void setFood(Food food) {
        this.food = food;
    }
}

