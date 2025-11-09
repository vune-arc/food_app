import { Restaurant } from "../types/Restaurant";
export const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "Hana Chicken",
    desc: "Fried Chicken",
    deliveryTime: "15 mins",
    distance: "2 km",
    time: "6am - 9pm",
    rating: "4.8",
    priceRange: "$5 - $50",
    reviews: 289,
    vouchers: 2,
    tags: ["Freeship", "Near you"],
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=60",
    reviewer: [
      {
        name: "Jinny Oslin",
        time: "A day ago",
        rating: 4.5,
        comment: "Quick delivery, good dishes. I love the chicken burger.",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      {
        name: "Jin",
        time: "A week ago",
        rating: 5,
        comment: "Fresh ingredients",
        avatar: "https://i.pravatar.cc/150?img=2",
      },
    ],
    forYouItems: [
      {
        name: "Fried Chicken",
        image:
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
        price: 15,
        rating: 4.5,
        reviews: 99,
      },
      {
        name: "Chicken Salad",
        image:
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
        price: 15,
        rating: 4.5,
        reviews: 99,
      },
      {
        name: "Spicy Chicken",
        image:
          "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=400&q=80",
        price: 15,
        rating: 4.5,
        reviews: 99,
      },
      {
        name: "Fried Potatos",
        image:
          "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?auto=format&fit=crop&w=400&q=80",
        price: 15,
        rating: 4.5,
        reviews: 99,
      },
    ],
    menuItems: [
      {
        name: "Sauté Chicken Rice",
        description: "Sauté chicken, Rice",
        image:
          "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=400&q=80",
        price: 15,
        rating: 4.5,
        reviews: 99,
      },
      {
        name: "Chicken Burger",
        description: "Fried chicken, Cheese & Burger",
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80",
        price: 15,
        rating: 4.5,
        reviews: 99,
      },
    ],
    combos: [
      {
        id: 1,
        name: "Combo B",
        description: "Fried Chicken, Chicken Rice & Salad",
        image:
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
        price: 25,
        rating: 4.5,
        reviews: 90,
      },
      {
        id: 2,
        name: "Combo B",
        description: "Fried Chicken (Small) & Potatos",
        image:
          "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=400&q=80",
        price: 19,
        rating: 4.6,
        reviews: 75,
      },
    ],
  },
  {
    id: 2,
    name: "Bamsu Restaurant",
    desc: "Chicken Salad, Sandwich & Desserts",
    deliveryTime: "35 mins",
    distance: "3.5 km",
    time: "7am - 10pm",
    rating: "4.1",
    priceRange: "$8 - $60",
    reviews: 156,
    vouchers: 1,
    tags: ["Freeship", "New"],
    image:
      "https://tse4.mm.bing.net/th/id/OIP.ccuNfmRzyTpCit9YpZTm_AHaEK?pid=Api&P=0&h=220",
    reviewer: [
      {
        name: "Sarah Johnson",
        time: "2 days ago",
        rating: 4.0,
        comment: "Great salads and fresh ingredients. Will order again!",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
      {
        name: "Mike Chen",
        time: "A week ago",
        rating: 4.2,
        comment: "Sandwiches are delicious and well-priced.",
        avatar: "https://i.pravatar.cc/150?img=4",
      },
    ],
    forYouItems: [
      {
        name: "Caesar Salad",
        image:
          "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=400&q=80",
        price: 12,
        rating: 4.3,
        reviews: 67,
      },
      {
        name: "Club Sandwich",
        image:
          "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?auto=format&fit=crop&w=400&q=80",
        price: 14,
        rating: 4.5,
        reviews: 89,
      },
      {
        name: "Chocolate Cake",
        image:
          "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80",
        price: 8,
        rating: 4.7,
        reviews: 45,
      },
      {
        name: "Fruit Smoothie",
        image:
          "https://images.unsplash.com/photo-1638176066669-12e50b8c7e32?auto=format&fit=crop&w=400&q=80",
        price: 6,
        rating: 4.4,
        reviews: 78,
      },
    ],
    menuItems: [
      {
        name: "Grilled Chicken Salad",
        description: "Fresh greens, grilled chicken, dressing",
        image:
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
        price: 16,
        rating: 4.4,
        reviews: 56,
      },
      {
        name: "Turkey Sandwich",
        description: "Turkey, lettuce, tomato, mayo",
        image:
          "https://images.unsplash.com/photo-1567234669003-dce7a7a88821?auto=format&fit=crop&w=400&q=80",
        price: 13,
        rating: 4.2,
        reviews: 34,
      },
    ],
    combos: [
      {
        id: 1,
        name: "Lunch Combo",
        description: "Salad + Sandwich + Drink",
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
        price: 22,
        rating: 4.3,
        reviews: 42,
      },
      {
        id: 2,
        name: "Dessert Combo",
        description: "Cake + Coffee/Tea",
        image:
          "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=400&q=80",
        price: 12,
        rating: 4.6,
        reviews: 38,
      },
    ],
  },
  {
    id: 3,
    name: "Neighbor Milk",
    desc: "Dairy Drinks & Smoothies",
    deliveryTime: "25 mins",
    distance: "1.8 km",
    time: "6am - 11pm",
    rating: "4.1",
    priceRange: "$3 - $25",
    reviews: 203,
    vouchers: 3,
    tags: ["Freeship", "Popular"],
    image:
      "https://tse1.mm.bing.net/th/id/OIP.WqF0ILIs2zv30lthGqH_vgHaGb?pid=Api&P=0&h=220",
    reviewer: [
      {
        name: "Emma Wilson",
        time: "Yesterday",
        rating: 4.8,
        comment: "Best smoothies in town! Always fresh and tasty.",
        avatar: "https://i.pravatar.cc/150?img=5",
      },
      {
        name: "David Kim",
        time: "3 days ago",
        rating: 3.8,
        comment: "Good variety of dairy products. Quick delivery.",
        avatar: "https://i.pravatar.cc/150?img=6",
      },
    ],
    forYouItems: [
      {
        name: "Strawberry Smoothie",
        image:
          "https://images.unsplash.com/photo-1638176066669-12e50b8c7e32?auto=format&fit=crop&w=400&q=80",
        price: 7,
        rating: 4.6,
        reviews: 112,
      },
      {
        name: "Chocolate Milkshake",
        image:
          "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=400&q=80",
        price: 6,
        rating: 4.4,
        reviews: 87,
      },
      {
        name: "Yogurt Parfait",
        image:
          "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80",
        price: 8,
        rating: 4.3,
        reviews: 65,
      },
      {
        name: "Iced Coffee",
        image:
          "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=400&q=80",
        price: 5,
        rating: 4.2,
        reviews: 91,
      },
    ],
    menuItems: [
      {
        name: "Mango Lassi",
        description: "Fresh mango yogurt drink",
        image:
          "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=400&q=80",
        price: 6,
        rating: 4.5,
        reviews: 78,
      },
      {
        name: "Protein Shake",
        description: "Vanilla protein with milk",
        image:
          "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80",
        price: 9,
        rating: 4.1,
        reviews: 45,
      },
    ],
    combos: [
      {
        id: 1,
        name: "Breakfast Combo",
        description: "Smoothie + Yogurt Parfait",
        image:
          "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=400&q=80",
        price: 12,
        rating: 4.4,
        reviews: 56,
      },
      {
        id: 2,
        name: "Energy Combo",
        description: "Protein Shake + Energy Bar",
        image:
          "https://images.unsplash.com/photo-1593095948071-474c0f66033b?auto=format&fit=crop&w=400&q=80",
        price: 15,
        rating: 4.0,
        reviews: 33,
      },
    ],
  },
  {
    id: 4,
    name: "Tokyo Sushi",
    desc: "Authentic Japanese Cuisine",
    deliveryTime: "30 mins",
    distance: "4.2 km",
    time: "11am - 10pm",
    rating: "4.7",
    priceRange: "$12 - $80",
    reviews: 342,
    vouchers: 2,
    tags: ["Freeship", "Partner"],
    image:
      "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=400&q=80",
    reviewer: [
      {
        name: "Kenji Tanaka",
        time: "Yesterday",
        rating: 5.0,
        comment: "Best sushi in the city! Fresh fish and perfect rice.",
        avatar: "https://i.pravatar.cc/150?img=7",
      },
      {
        name: "Lisa Park",
        time: "4 days ago",
        rating: 4.5,
        comment: "Authentic taste, reasonable prices. Love the salmon sushi!",
        avatar: "https://i.pravatar.cc/150?img=8",
      },
    ],
    forYouItems: [
      {
        name: "Salmon Sashimi",
        image:
          "https://images.unsplash.com/photo-1563612116625-3012372fccce?auto=format&fit=crop&w=400&q=80",
        price: 18,
        rating: 4.8,
        reviews: 124,
      },
      {
        name: "Dragon Roll",
        image:
          "https://images.unsplash.com/photo-1563612116625-3012372fccce?auto=format&fit=crop&w=400&q=80",
        price: 22,
        rating: 4.7,
        reviews: 98,
      },
      {
        name: "Tempura Udon",
        image:
          "https://images.unsplash.com/photo-1563245372-f5a8a0a17e04?auto=format&fit=crop&w=400&q=80",
        price: 16,
        rating: 4.5,
        reviews: 76,
      },
      {
        name: "Green Tea Ice Cream",
        image:
          "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80",
        price: 6,
        rating: 4.6,
        reviews: 89,
      },
    ],
    menuItems: [
      {
        name: "Tuna Nigiri",
        description: "Fresh tuna on sushi rice",
        image:
          "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=400&q=80",
        price: 14,
        rating: 4.6,
        reviews: 67,
      },
      {
        name: "Chicken Teriyaki",
        description: "Grilled chicken with teriyaki sauce",
        image:
          "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80",
        price: 15,
        rating: 4.4,
        reviews: 54,
      },
    ],
    combos: [
      {
        id: 1,
        name: "Sushi Lover Combo",
        description: "12 pieces sushi + Miso soup",
        image:
          "https://images.unsplash.com/photo-1563612116625-3012372fccce?auto=format&fit=crop&w=400&q=80",
        price: 35,
        rating: 4.7,
        reviews: 112,
      },
      {
        id: 2,
        name: "Bento Box",
        description: "Main dish + Rice + Salad + Miso soup",
        image:
          "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80",
        price: 28,
        rating: 4.5,
        reviews: 87,
      },
    ],
  },
  {
    id: 5,
    name: "Mama's Pizza",
    desc: "Italian Pizza & Pasta",
    deliveryTime: "20 mins",
    distance: "2.1 km",
    time: "10am - 11pm",
    rating: "4.4",
    priceRange: "$10 - $45",
    reviews: 278,
    vouchers: 1,
    tags: ["Freeship", "Popular"],
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=400&q=80",
    reviewer: [
      {
        name: "Tony Romano",
        time: "2 days ago",
        rating: 4.5,
        comment: "Authentic Italian pizza, crust is perfect!",
        avatar: "https://i.pravatar.cc/150?img=9",
      },
      {
        name: "Maria Garcia",
        time: "A week ago",
        rating: 4.0,
        comment: "Good pasta, generous portions. Family loved it!",
        avatar: "https://i.pravatar.cc/150?img=10",
      },
    ],
    forYouItems: [
      {
        name: "Margherita Pizza",
        image:
          "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=400&q=80",
        price: 16,
        rating: 4.5,
        reviews: 156,
      },
      {
        name: "Pepperoni Pizza",
        image:
          "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=400&q=80",
        price: 18,
        rating: 4.6,
        reviews: 134,
      },
      {
        name: "Carbonara Pasta",
        image:
          "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?auto=format&fit=crop&w=400&q=80",
        price: 14,
        rating: 4.3,
        reviews: 89,
      },
      {
        name: "Garlic Bread",
        image:
          "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=400&q=80",
        price: 6,
        rating: 4.7,
        reviews: 203,
      },
    ],
    menuItems: [
      {
        name: "Quattro Formaggi",
        description: "Four cheese pizza",
        image:
          "https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?auto=format&fit=crop&w=400&q=80",
        price: 19,
        rating: 4.4,
        reviews: 78,
      },
      {
        name: "Lasagna",
        description: "Beef lasagna with cheese",
        image:
          "https://images.unsplash.com/photo-1619895092539-12897c4f6f65?auto=format&fit=crop&w=400&q=80",
        price: 17,
        rating: 4.5,
        reviews: 92,
      },
    ],
    combos: [
      {
        id: 1,
        name: "Family Combo",
        description: "Large Pizza + Pasta + Garlic Bread",
        image:
          "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=400&q=80",
        price: 42,
        rating: 4.5,
        reviews: 67,
      },
      {
        id: 2,
        name: "Student Combo",
        description: "Personal Pizza + Drink",
        image:
          "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=400&q=80",
        price: 15,
        rating: 4.3,
        reviews: 145,
      },
    ],
  },
  {
    id: 6,
    name: "Burger Kingdom",
    desc: "Gourmet Burgers & Fries",
    deliveryTime: "18 mins",
    distance: "1.5 km",
    time: "11am - 12am",
    rating: "4.6",
    priceRange: "$8 - $35",
    reviews: 421,
    vouchers: 3,
    tags: ["Freeship", "Near you"],
    image:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=400&q=80",
    reviewer: [
      {
        name: "Jake Miller",
        time: "Yesterday",
        rating: 5.0,
        comment: "Best burgers ever! Juicy and flavorful.",
        avatar: "https://i.pravatar.cc/150?img=11",
      },
      {
        name: "Sophie Turner",
        time: "3 days ago",
        rating: 4.5,
        comment: "Crispy fries and amazing sauce combinations.",
        avatar: "https://i.pravatar.cc/150?img=12",
      },
    ],
    forYouItems: [
      {
        name: "Classic Cheeseburger",
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80",
        price: 12,
        rating: 4.7,
        reviews: 234,
      },
      {
        name: "Bacon Deluxe",
        image:
          "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=400&q=80",
        price: 15,
        rating: 4.8,
        reviews: 189,
      },
      {
        name: "Truffle Fries",
        image:
          "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=400&q=80",
        price: 8,
        rating: 4.6,
        reviews: 167,
      },
      {
        name: "Chocolate Milkshake",
        image:
          "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=400&q=80",
        price: 7,
        rating: 4.5,
        reviews: 145,
      },
    ],
    menuItems: [
      {
        name: "Veggie Burger",
        description: "Plant-based patty with fresh veggies",
        image:
          "https://images.unsplash.com/photo-1550319106-9a4da6efb6a9?auto=format&fit=crop&w=400&q=80",
        price: 13,
        rating: 4.4,
        reviews: 98,
      },
      {
        name: "Chicken Burger",
        description: "Crispy chicken with special sauce",
        image:
          "https://images.unsplash.com/photo-1606755962773-0c514a2d5b31?auto=format&fit=crop&w=400&q=80",
        price: 14,
        rating: 4.5,
        reviews: 112,
      },
    ],
    combos: [
      {
        id: 1,
        name: "King Combo",
        description: "Burger + Fries + Drink",
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80",
        price: 20,
        rating: 4.6,
        reviews: 278,
      },
      {
        id: 2,
        name: "Double Trouble",
        description: "2 Burgers + Large Fries + 2 Drinks",
        image:
          "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=400&q=80",
        price: 32,
        rating: 4.7,
        reviews: 156,
      },
    ],
  },
  {
    id: 7,
    name: "Pho Vietnam",
    desc: "Traditional Vietnamese Noodles",
    deliveryTime: "22 mins",
    distance: "3.8 km",
    time: "8am - 9pm",
    rating: "4.9",
    priceRange: "$9 - $25",
    reviews: 389,
    vouchers: 2,
    tags: ["Freeship"],
    image:
      "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=400&q=80",
    reviewer: [
      {
        name: "Linh Nguyen",
        time: "Today",
        rating: 5.0,
        comment: "Tastes just like home! Perfect broth and fresh herbs.",
        avatar: "https://i.pravatar.cc/150?img=13",
      },
      {
        name: "Brian Wilson",
        time: "5 days ago",
        rating: 4.8,
        comment:
          "Amazing pho, always consistent quality. My go-to comfort food!",
        avatar: "https://i.pravatar.cc/150?img=14",
      },
    ],
    forYouItems: [
      {
        name: "Beef Pho",
        image:
          "https://images.unsplash.com/photo-1552465011-b4e30bfb9b6d?auto=format&fit=crop&w=400&q=80",
        price: 12,
        rating: 4.9,
        reviews: 287,
      },
      {
        name: "Spring Rolls",
        image:
          "https://images.unsplash.com/photo-1589606663750-1e11bb3d55ff?auto=format&fit=crop&w=400&q=80",
        price: 8,
        rating: 4.7,
        reviews: 156,
      },
      {
        name: "Vietnamese Coffee",
        image:
          "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=400&q=80",
        price: 5,
        rating: 4.8,
        reviews: 134,
      },
      {
        name: "Banh Mi",
        image:
          "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=400&q=80",
        price: 9,
        rating: 4.6,
        reviews: 178,
      },
    ],
    menuItems: [
      {
        name: "Chicken Pho",
        description: "Chicken noodle soup with herbs",
        image:
          "https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=400&q=80",
        price: 11,
        rating: 4.7,
        reviews: 123,
      },
      {
        name: "Bun Cha",
        description: "Grilled pork with rice noodles",
        image:
          "https://images.unsplash.com/photo-1563245372-f5a8a0a17e04?auto=format&fit=crop&w=400&q=80",
        price: 13,
        rating: 4.6,
        reviews: 87,
      },
    ],
    combos: [
      {
        id: 1,
        name: "Pho Combo",
        description: "Pho + Spring Rolls + Drink",
        image:
          "https://images.unsplash.com/photo-1552465011-b4e30bfb9b6d?auto=format&fit=crop&w=400&q=80",
        price: 20,
        rating: 4.8,
        reviews: 198,
      },
      {
        id: 2,
        name: "Lunch Special",
        description: "Banh Mi + Vietnamese Coffee",
        image:
          "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=400&q=80",
        price: 12,
        rating: 4.7,
        reviews: 145,
      },
    ],
  },
];
