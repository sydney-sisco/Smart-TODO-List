INSERT INTO users (first_name, last_name, email, password) VALUES
('Hosam', 'Dahrooge', 'hosam_dahrooge@hotmail.com', 'password'),
('Connie', 'Ho', 'connie_ho@gmail.com', 'password'),
('Sydney', 'Sisco', 'sydney_sisco@yahoo.com', 'password');

INSERT INTO categories (name) VALUES
('Watch'),
('Eat'),
('Read'),
('Buy'),
('Uncatergorized');

INSERT INTO items (name, user_id, category_id) VALUES
('Mulan', 1, 1),
('Banana', 3, 2),
('Sleep', 2, 5),
('80/20 Principle', 1, 3),
('Socks', 3, 4),
('Finish this module', 2, 5);
