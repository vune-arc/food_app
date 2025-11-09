-- Insert Categories
INSERT INTO categories (name) VALUES 
('Rice'),
('Healthy'),
('Drink'),
('Fastfood'),
('Snack'),
('Milk');

-- Insert Customers
INSERT INTO customers (username, password, email, phone, avatar) VALUES 
('john_doe', 'password123', 'john.doe@email.com', '+84123456789','https://png.pngtree.com/background/20230528/original/pngtree-cute-puppy-wallpapers-picture-image_2774290.jpg'),
('jane_smith', 'pass1234', 'jane.smith@email.com', '+84123456780','https://cdn.pixabay.com/photo/2024/01/31/03/11/ai-generated-8543144_1280.jpg'),
('mike_wilson', 'mikepass', 'mike.wilson@email.com', '+84123456781','https://png.pngtree.com/background/20230611/original/pngtree-cute-cuteness-wallpaper-picture-image_3136869.jpg'),
('sarah_chen', 'sarah123', 'sarah.chen@email.com', '+84123456782','https://tse2.mm.bing.net/th/id/OIP.PWtPrm8qjARggfG_-mcuvgHaHa?pid=Api&P=0&h=220'),
('tom_nguyen', 'tom123', 'tom.nguyen@email.com', '+84123456783','https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face');

-- Insert Drivers
INSERT INTO drivers (username, password, phone, email, location, rating_total, vehicle_number) VALUES 
('john_cooper', 'driver123', '+84123888888', 'john.cooper@delivery.com', 'District 1, HCMC', 4.8, '59A-123.45'),
('mike_johnson', 'mikedriver', '+84123888889', 'mike.johnson@delivery.com', 'District 3, HCMC', 4.5, '59A-678.90'),
('lisa_tran', 'lisadriver', '+84123888890', 'lisa.tran@delivery.com', 'District 7, HCMC', 4.7, '59A-111.22'),
('david_nguyen', 'daviddriver', '+84123888891', 'david.nguyen@delivery.com', 'Binh Thanh District, HCMC', 4.6, '59A-333.44'),
('anna_le', 'annadriver', '+84123888892', 'anna.le@delivery.com', 'Tan Binh District, HCMC', 4.9, '59A-555.66');

-- Insert Restaurants
INSERT INTO restaurants (name, description, rating, price_range, image, location, open_time, close_time, delivery_time_min, delivery_time_max, ATTRIBUTE, category_id) VALUES 
('Hana Chicken', 'Authentic Korean-style fried chicken with crispy texture and delicious sauces', 4.5, '$5 - $50', 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=500&h=300&fit=crop', '201 Nguyen Trai, District 1, HCMC', '06:00:00', '21:00:00', 15, 20, 'Popular,Best Seller',4),
('Bamsu Restaurant', 'Healthy chicken salads, fresh sandwiches and delicious desserts', 4.1, '$8 - $35', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop', '45 Le Loi, District 1, HCMC', '07:00:00', '22:00:00', 25, 35, 'Healthy,Vegetarian Options',4),
('Neighbor Milk', 'Fresh dairy drinks, smoothies and bubble tea with premium ingredients', 4.3, '$3 - $20', 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&h=300&fit=crop', '123 Pasteur, District 3, HCMC', '08:00:00', '23:00:00', 20, 30, 'Dairy Free Options',4),
('BFresh Coffee', 'Specialty coffee and refreshing beverages in cozy atmosphere', 4.5, '$4 - $25', 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500&h=300&fit=crop', '78 Dong Khoi, District 1, HCMC', '06:30:00', '22:30:00', 15, 25, 'WiFi Available',3),
('Vinamilk Store', 'Fresh milk and dairy products from Vietnam leading brand', 4.6, '$2 - $15', 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&h=300&fit=crop', '56 Nguyen Hue, District 1, HCMC',  '07:00:00', '21:00:00', 10, 20, 'Fresh,Daily Products',1),
('Rice Paradise', 'Traditional Vietnamese rice dishes with authentic flavors', 4.4, '$4 - $20', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&h=300&fit=crop', '89 Hai Ba Trung, District 1, HCMC', '06:00:00', '20:00:00', 20, 30, 'Traditional,Authentic',2);

INSERT INTO restaurant_tags (restaurant_id, tag) VALUES
-- Hana Chicken
(1, 'FREESHIP'),
(1, 'POPULAR'),

-- Bamsu Restaurant
(2, 'FREESHIP'),
(2, 'HEALTHY'),

-- Neighbor Milk
(3, 'DRINKS'),
(3, 'FREESHIP'),

-- BFresh Coffee
(4, 'NEAR_YOU'),
(4, 'COFFEE'),

-- Vinamilk Store
(5, 'NEAR_YOU'),
(5, 'DRINKS'),
(5, 'HEALTHY'),

-- Rice Paradise
(6, 'FREESHIP'),
(6, 'POPULAR');

-- Insert Foods for Hana Chicken
INSERT INTO foods (name, image, description, rating_total, price, available, category_id, restaurant_id, percent_sale) VALUES 
('Fried Chicken', 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=300&fit=crop', 'Crispy fried wings and thigh with secret recipe batter', 4.5, 15.00, TRUE, 4, 1, 0.2),
('Chicken Salad', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop', 'Fresh mixed greens with grilled chicken and house dressing', 4.3, 10.00, TRUE, 2, 1, 0.3),
('Spicy Chicken', 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop', 'Korean-style spicy fried chicken with gochujang sauce', 4.6, 18.00, TRUE, 4, 1, 0.1),
('Fried Potatoes', 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop', 'Crispy golden fries with special seasoning', 4.2, 5.00, TRUE, 5, 1, 0.25);

-- Insert Foods for Bamsu Restaurant
INSERT INTO foods (name, image, description, rating_total, price, available, category_id, restaurant_id, percent_sale) VALUES 
('Chicken Caesar Salad', 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop', 'Classic Caesar salad with grilled chicken and parmesan', 4.4, 12.00, TRUE, 2, 2, 0.13),
('Grilled Chicken Sandwich', 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400&h=300&fit=crop', 'Whole wheat bread with grilled chicken and fresh veggies', 4.2, 8.00, TRUE, 4, 2, 0.2),
('Crunchy Fried Chicken Balls', 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop', 'Crispy chicken balls served with sweet chili sauce', 4.1, 10.00, TRUE, 4, 2, 0.2),
('Chocolate Brownie', 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop', 'Warm chocolate brownie with vanilla ice cream', 4.5, 6.00, TRUE, 5, 2, 0.1);

-- Insert Foods for Neighbor Milk
INSERT INTO foods (name, image, description, rating_total, price, available, category_id, restaurant_id, percent_sale) VALUES 
('Fresh Milk', 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=300&fit=crop', '100% pure fresh milk from organic farms', 4.7, 3.50, TRUE, 6, 3, 0.15),
('Strawberry Smoothie', 'https://images.unsplash.com/photo-1579586337278-3f436f5b8567?w=400&h=300&fit=crop', 'Refreshing smoothie with fresh strawberries and yogurt', 4.5, 5.00, TRUE, 3, 3, 0.1),
('Bubble Milk Tea', 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=400&h=300&fit=crop', 'Classic milk tea with chewy tapioca pearls', 4.6, 4.50, TRUE, 6, 3, 0.2),
('Yogurt Parfait', 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop', 'Layers of yogurt, granola and fresh fruits', 4.4, 6.00, TRUE, 6, 3, 0.12);

-- Insert Foods for BFresh Coffee
INSERT INTO foods (name, image, description, rating_total, price, available, category_id, restaurant_id, percent_sale) VALUES 
('Vietnamese Coffee', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop', 'Strong traditional Vietnamese coffee with condensed milk', 4.8, 4.00, TRUE, 3, 4, 0.1),
('Matcha Latte', 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&h=300&fit=crop', 'Creamy matcha green tea with steamed milk', 4.5, 5.50, TRUE, 3, 4, 0.15),
('Iced Americano', 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop', 'Chilled black coffee with ice cubes', 4.3, 3.50, TRUE, 3, 4, 0.08),
('Croissant', 'https://images.unsplash.com/photo-1555507038-44d78bf15c8a?w=400&h=300&fit=crop', 'Buttery French croissant, perfect with coffee', 4.6, 2.50, TRUE, 5, 4, 0.2);

-- Insert Foods for Vinamilk Store
INSERT INTO foods (name, image, description, rating_total, price, available, category_id, restaurant_id, percent_sale) VALUES 
('Vinamilk Fresh Milk', 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=300&fit=crop', 'Pure fresh milk, pasteurized and homogenized', 4.7, 2.50, TRUE, 6, 5, 0.1),
('Strawberry Yogurt', 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop', 'Creamy yogurt with real strawberry pieces', 4.6, 1.80, TRUE, 6, 5, 0.15),
('Chocolate Milk', 'https://images.unsplash.com/photo-1571575173700-afb9492e6a50?w=400&h=300&fit=crop', 'Rich chocolate flavored milk drink', 4.5, 2.20, TRUE, 6, 5, 0.12),
('Condensed Milk', 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop', 'Sweetened condensed milk for coffee and desserts', 4.4, 3.00, TRUE, 6, 5, 0.08);

-- Insert Foods for Rice Paradise
INSERT INTO foods (name, image, description, rating_total, price, available, category_id, restaurant_id, percent_sale) VALUES 
('Com Tam Suon Nuong', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop', 'Broken rice with grilled pork chop and egg', 4.8, 8.00, TRUE, 1, 6, 0.2),
('Com Ga', 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop', 'Vietnamese chicken rice with ginger fish sauce', 4.6, 7.50, TRUE, 1, 6, 0.15),
('Com Chay', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop', 'Vegetarian rice with assorted vegetables and tofu', 4.3, 6.00, TRUE, 1, 6, 0.1),
('Com Suon Bo', 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop', 'Rice with beef ribs in special marinade', 4.7, 9.00, TRUE, 1, 6, 0.18);

-- Insert Food Options for Fried Chicken
INSERT INTO food_options (option_type, option_name, additional_price, food_id) VALUES 
('SIZE', 'S', 0.00, 1),
('SIZE', 'M', 5.00, 1),
('SIZE', 'L', 10.00, 1),
('TOPPING', 'Corn', 2.00, 1),
('TOPPING', 'Cheese Cheddar', 5.00, 1),
('TOPPING', 'Salted Egg', 10.00, 1),
('SPICINESS', 'No', 0.00, 1),
('SPICINESS', 'Hot', 0.00, 1),
('SPICINESS', 'Very Hot', 0.00, 1);

-- Insert Food Options for Chicken Salad
INSERT INTO food_options (option_type, option_name, additional_price, food_id) VALUES 
('SIZE', 'S', 0.00, 2),
('SIZE', 'M', 2.00, 2),
('SIZE', 'L', 4.00, 2),
('SAUCE', 'Roasted Sesame', 0.00, 2),
('SAUCE', 'Caesar', 0.50, 2),
('SAUCE', 'Honey Mustard', 0.50, 2),
('SPICINESS', 'No', 0.00, 2),
('SPICINESS', 'Mild', 0.00, 2);

-- Insert Food Options for Fresh Milk
INSERT INTO food_options (option_type, option_name, additional_price, food_id) VALUES 
('SIZE', '250ml', 0.00, 9),
('SIZE', '500ml', 1.50, 9),
('SIZE', '1L', 2.50, 9),
('TEMPERATURE', 'Cold', 0.00, 9),
('TEMPERATURE', 'Warm', 0.50, 9),
('SWEETNESS', 'Less Sugar', 0.00, 9),
('SWEETNESS', 'Normal', 0.00, 9),
('SWEETNESS', 'Extra Sugar', 0.30, 9);

-- Insert Food Options for Com Tam Suon Nuong
INSERT INTO food_options (option_type, option_name, additional_price, food_id) VALUES 
('SIZE', 'S', 0.00, 1),
('SIZE', 'M', 5.00, 1),
('SIZE', 'L', 10.00, 1),
('TOPPING', 'Corn', 2.00, 1),
('TOPPING', 'Cheese Cheddar', 5.00, 1),
('TOPPING', 'Salted Egg', 10.00, 1),
('SPICINESS', 'No', 0.00, 1),
('SPICINESS', 'Hot', 0.00, 1),
('SPICINESS', 'Very Hot', 0.00, 1),
('SAUCE', 'Roasted Sesame', 0.00, 2),
('SAUCE', 'Caesar', 0.50, 2),
('SAUCE', 'Honey Mustard', 0.50, 2);

-- Insert Vouchers
INSERT INTO vouchers (name, description, start_date, end_date, is_active, discount_type, discount_value) VALUES 
('FREESHIP', 'Free delivery for all orders', '2024-01-01', '2024-12-31', TRUE, 'FREESHIP', 0.00),
('WELCOME10', '10% off for first order', '2024-01-01', '2024-12-31', TRUE, 'PERCENTAGE', 10.00),
('EWALLET30', '30% off for bill over $50 with E-wallet', '2024-01-01', '2024-12-31', TRUE, 'PERCENTAGE', 30.00),
('HAPPYMEAL', '$5 off for orders above $25', '2024-01-01', '2024-12-31', TRUE, 'FIXED_AMOUNT', 5.00),
('MILKLOVER', '15% off on all milk products', '2024-01-01', '2024-12-31', TRUE, 'PERCENTAGE', 15.00),
('RICEDAY', '20% off on rice dishes every Monday', '2024-01-01', '2024-12-31', TRUE, 'PERCENTAGE', 20.00);

-- Insert Orders
INSERT INTO orders (order_date, total_amount, status, delivery_fee, promotion_discount, payment_method, customer_id, driver_id, restaurant_id, voucher_id) VALUES 
('2024-01-15 18:30:00', 47.00, 'DELIVERED', 2.00, 5.00, 'E-wallet', 1, 1, 1, 4),
('2024-01-16 12:15:00', 22.00, 'DELIVERING', 0.00, 0.00, 'Credit Card', 2, 2, 2, 1),
('2024-01-16 19:45:00', 35.50, 'PREPARING', 1.50, 3.00, 'E-wallet', 3, 3, 1, NULL),
('2024-01-17 08:20:00', 15.80, 'DELIVERED', 1.00, 2.37, 'E-wallet', 4, 4, 5, 5),
('2024-01-17 13:45:00', 24.50, 'DELIVERING', 0.00, 4.90, 'Cash', 5, 5, 6, 6);

-- Insert Order Details
INSERT INTO order_details (quantity, unit_price, order_id, food_id) VALUES 
(1, 32.00, 1, 1), -- Fried Chicken L size with toppings
(1, 10.00, 1, 2), -- Chicken Salad M size
(1, 15.00, 2, 5), -- Chicken Caesar Salad
(1, 8.00, 2, 6), -- Grilled Chicken Sandwich
(2, 18.00, 3, 3), -- 2 Spicy Chicken
(1, 5.00, 3, 4), -- Fried Potatoes
(2, 2.50, 4, 13), -- 2 Vinamilk Fresh Milk
(1, 1.80, 4, 14), -- Strawberry Yogurt
(1, 8.00, 5, 17), -- Com Tam Suon Nuong
(1, 7.50, 5, 18); -- Com Ga

-- Insert Comments/Reviews
INSERT INTO comments (title, date_comment, rating, type, customer_id, food_id, restaurant_id, driver_id) VALUES 
('Amazing Chicken!', '2024-01-15', 5.0, 'FOOD', 1, 1, 1, NULL),
('Quick Delivery', '2024-01-15', 4.5, 'DRIVER', 1, NULL, NULL, 1),
('Fresh and Healthy', '2024-01-16', 4.0, 'FOOD', 2, 5, 2, NULL),
('Great Service', '2024-01-16', 5.0, 'RESTAURANT', 2, NULL, 2, NULL),
('Very Spicy but Good!', '2024-01-16', 4.5, 'FOOD', 3, 3, 1, NULL),
('Friendly Driver', '2024-01-16', 4.5, 'DRIVER', 3, NULL, NULL, 3),
('Fresh Milk Everyday!', '2024-01-17', 5.0, 'FOOD', 4, 13, 5, NULL),
('Best Rice in Town', '2024-01-17', 4.8, 'FOOD', 5, 17, 6, NULL),
('Excellent Service', '2024-01-17', 5.0, 'DRIVER', 4, NULL, NULL, 4),
('Will Order Again', '2024-01-17', 4.7, 'RESTAURANT', 5, NULL, 6, NULL);