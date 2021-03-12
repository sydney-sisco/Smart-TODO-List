INSERT INTO users (first_name, last_name, email, password) VALUES
('Hosam', 'Dahrooge', 'hosam_dahrooge@hotmail.com', '$2b$10$VGkYZWBp9IJZpq6Ca28VIuOHHP8Ag0dtkyI4LOTK1GW4of37/ACsS'),
('Connie', 'Ho', 'connie_ho@gmail.com', '$2b$10$VGkYZWBp9IJZpq6Ca28VIuOHHP8Ag0dtkyI4LOTK1GW4of37/ACsS'),
('Sydney', 'Sisco', 'sydney_sisco@yahoo.com', '$2b$10$VGkYZWBp9IJZpq6Ca28VIuOHHP8Ag0dtkyI4LOTK1GW4of37/ACsS');

INSERT INTO categories (name) VALUES
('Watch'),
('Eat'),
('Read'),
('Buy'),
('Uncategorized');

INSERT INTO items (name, user_id, category_id) VALUES
('Mulan', 1, 1),
('Banana', 3, 2),
('Sleep', 2, 5),
('80/20 Principle', 1, 3),
('Socks', 3, 4),
('Finish this module', 2, 5),
('pizza', 3, 2),
('sushi', 3, 2),
('cheese burger', 3, 2),
('breaking bad', 3, 1),
('2 fast 2 furious', 3, 1),
('12 rules for life', 3, 3),
('1984', 3, 3),
('happy potter', 3, 3),
('keyboard', 3, 4);
