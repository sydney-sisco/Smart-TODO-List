INSERT INTO users (first_name, last_name, email, password)
VALUES ('Hosam', 'Dahrooge', 'hosam_dahrooge@hotmail.com', 'password'),
VALUES ('Connie', 'Ho', 'connie_ho@gmail.com', 'password'),
VALUES ('Sydney', 'Sisco', 'sydney_sisco@yahoo.com', 'password');

INSERT INTO categories (name)
VALUES ('Watch'),
VALUES ('Eat'),
VALUES ('Read'),
VALUES ('Buy'),
VALUES ('Uncatergorized');

INSERT INTO items (name, user_id, category_id)
VALUES ('Mulan', 1, 1),
VALUES ('Banana', 3, 2),
VALUES ('Sleep', 2, 5),
VALUES ('80/20 Principle', 1, 3),
VALUES ('Socks', 3, 4),
VALUES ('Finish this module', 2, 5);
