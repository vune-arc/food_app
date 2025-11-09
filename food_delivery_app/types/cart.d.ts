// types/cart.ts

export interface FoodOption {
  id: number;
  optionType: string; // "SIZE", "TOPPING", "SPICINESS", ...
  optionName: string;
  additionalPrice: number;
}

export interface CartItemOption {
  id: number;
  foodOption: FoodOption;
}

export interface Food {
  foodId: number;
  name: string;
  image: string;
  description?: string;
  ratingTotal?: number;
  price: number;
  available?: boolean;
  percentSale?: number;
}

export interface CartItem {
  cartItemId: number;
  quantity: number;
  subTotal: number;
  food: Food;
  options: CartItemOption[]; // 👈 thêm vào đây
}

export interface Cart {
  cartId: number;
  totalPrice: number;
  cartItems: CartItem[];
}
