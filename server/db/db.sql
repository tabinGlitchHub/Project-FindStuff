-- \c to connect
-- \d to view all databases

-- create review table
CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    product_id BIGINT NOT NULL references products(id),
    reviewer_name VARCHAR(12) NOT NULL,
    review_title VARCHAR(25) NOT NULL,
    review_description TEXT,
    rating FLOAT NOT NULL check(rating >= 1 and rating <=5)
);

--insert review 
INSERT INTO reviews(product_id, reviewer_name, review_title, review_description, rating) values(2, 'Forest', 'Very Comfy', 'Very Comfy',4);