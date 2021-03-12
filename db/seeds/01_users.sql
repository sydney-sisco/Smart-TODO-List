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
('keyboard', 3, 4),
('Pizza', 1, 2),
('Sushi', 1, 2),
('Cheese Burger', 1, 2),
('Breaking Bad', 1, 1),
('2 fast 2 furious', 1, 1),
('12 rules for life', 1, 3),
('Keyboard', 1, 4),
('Adding Dates',1,5),
('Shared Lists',1,5),
('Drag and Drop',1,5),
('More Categories',1,5),
('Future Features:',1,5);


INSERT INTO items (name, user_id, category_id, priority) VALUES
('Finish This Project', 1, 5, true),
('Finish This Project', 2, 5, true),
('Finish This Project', 3, 5, true),
('Demo This Project', 1, 5, true),
('Demo This Project', 2, 5, true),
('Demo This Project', 3, 5, true);


INSERT INTO items (name, user_id, category_id, done) VALUES
('Dark Mode', 1, 5, true),
('Styles', 1, 5, true),
('Login/Logout/Register', 1, 5, true),
('Routes', 1, 5, true),
('Refactor', 1, 5, true),
('Details Card', 1, 5, true),
('Google Search, Google Natural Language, Google Books, Yelp, Amazon, MovieDB API', 1, 5, true),
('Set Priority Feature', 1, 5, true),
('Done Feature', 1, 5, true),
('Change Category Feature', 1, 5, true),
('Edit Name Feature', 1, 5, true),
('Categorize Algorithm', 1, 5, true);


INSERT INTO items (name, user_id, category_id, done) VALUES
('notsosmart.herokuapp.com',1,3,true),
('Our App Link:',1,3,true);

INSERT INTO items (name, user_id, category_id, done) VALUES
('Free APIs are sometimes slow & unreliable',1,4,true),
('Merge Conflicts',1,4,true),
('Working Horizontally Was Tricky',1,4,true),
('Challenges:',1,4,true);

INSERT INTO items (name, user_id, category_id, done, priority) VALUES
('Mulan', 1, 1, true, true),
('Mulan', 1, 1, true, true),
('Mulan', 1, 1, true, true),
('Mulan', 1, 1, true, true),
('Mulan', 1, 1, true, true),
('Mulan', 1, 1, true, true),
('Mulan', 1, 1, true, true),
('Mulan', 1, 1, true, true),
('Mulan', 1, 1, true, true),
('Mulan', 1, 1, true, true),
('Mulan', 1, 1, true, true),
('Mulan', 1, 1, true, true),
('Mulan', 1, 1, true, true),
('Mulan', 1, 1, true, true),
('Mulan', 1, 1, true, true),
('Mulan', 1, 1, true, true),
('Mulan', 1, 1, true, true),
('Mulan', 1, 1, true, true),
('Mulan', 1, 1, true, true),
('Mulan', 1, 1, true, true),
('Mulan', 1, 1, true, true),
('Mulan', 1, 1, true, true),
('Mulan', 1, 1, true, true),
('Mulan', 1, 1, true, true),
('Mulan', 1, 1, true, true),
('Mulan', 1, 1, true, true),
('Mulan', 1, 1, true, true),
('Mulan', 1, 1, true, true),
('Mulan', 1, 1, true, true),
('Mulan', 1, 1, true, true),
('Mulan', 1, 1, true, true),
('Mulan', 1, 1, true, true),
('Mulan', 1, 1, true, true),
('Mulan', 1, 1, true, true),
('Mulan', 1, 1, true, true),
('Mulan', 1, 1, true, true),
('Mulan', 1, 1, true, true),
('Mulan', 1, 1, true, true);
