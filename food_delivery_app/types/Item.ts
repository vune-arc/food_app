export interface Item {
  name: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  description?: string; // optional vì forYouItems có thể không có
}