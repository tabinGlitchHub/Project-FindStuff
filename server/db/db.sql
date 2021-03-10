-- \c to connect
-- \d to view all tables
--\l to view all databases

--CREATE TABLES------------------------------------------------------

--create cart table
CREATE TABLE cart (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    product_id BIGINT NOT NULL references products(id),
    user_id BIGINT NOT NULL references users(user_id)
);

--create users table
CREATE TABLE users (
    user_id BIGSERIAL NOT NULL PRIMARY KEY,
    user_name VARCHAR(12) NOT NULL
);

-- create review table
CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    product_id BIGINT NOT NULL references products(id),
    reviewer_name VARCHAR(12) NOT NULL,
    review_title VARCHAR(25) NOT NULL,
    review_description TEXT,
    rating FLOAT NOT NULL check(rating >= 1 and rating <=5)
);

--INSERT VALUES-----------------------------------------------------------

--insert review 
INSERT INTO reviews(product_id, reviewer_name, review_title, review_description, rating) values(2, 'Forest', 'Very Comfy', 'Very Comfy',4);

--insert user
INSERT INTO users(user_id,user_name) values(1,'admin1');

--insert cart
INSERT INTO cart(product_id, user_id) values(1,1);


--UPDATE/ADD VALUES------------------------------------------------------

--update products
UPDATE users
SET user_name = 'admin2'
WHERE user_id = 2;

--add column
ALTER TABLE cart
ADD product_count INT NOT NULL DEFAULT '1';

--Alter datatype
ALTER TABLE users
ALTER COLUMN user_name VARCHAR(14) NOT NULL;


--delete column-------------------------------------------------------

ALTER TABLE cart
DROP COLUMN product_count;


--delete row----------------------------------------------------------

DELETE FROM cart
WHERE product_id=1;