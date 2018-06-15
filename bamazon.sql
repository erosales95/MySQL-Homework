SET SQL_SAFE_UPDATES=0;
DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(20) NOT NULL,
    department_name VARCHAR(20),
    price INTEGER(10),
    stock_quantity INTEGER(20),
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Basketball", "sports", 25, 15), 
("Football", "sports", 20, 16),
("Soccer Ball", "sports", 15, 10),
("t-shirt", "clothing", 20, 30),
("shorts", "clothing", 15, 25),
("Shin Guards", "clothing", 10, 10),
("Sweatband", "clothing", 5, 0),
("Fishing Pole", "outdoors", 10, 10),
("Tent", "outdoors", 70, 5),
("Cornhole Set", "outdoors", 50, 6),
("Skateboard", "outdoors", 10, 100);
	