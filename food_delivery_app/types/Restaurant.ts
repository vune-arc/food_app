import { Combo } from "./Combo";
import { Item } from "./Item";
import { Reviewer } from "./Reviewer";
export interface Restaurant {
  id: number;
  name: string;
  desc: string;
  deliveryTime: string;
  distance: string;
  time: string;
  rating: string;
  priceRange: string;
  reviews: number;
  vouchers: number;
  tags: string[];
  image: string;
  reviewer: Reviewer[];
  forYouItems: Item[];
  menuItems: Item[];
  combos: Combo[];
}