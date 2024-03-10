DROP TABLE IF EXISTS order_details;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;
DROP TYPE IF EXISTS category_enum;

CREATE TABLE users (
    id_user SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    phone VARCHAR(255),
    avatar_url VARCHAR(255),
    id_user_google VARCHAR(255),
    date_add TIMESTAMP NOT NULL,
    date_upd TIMESTAMP NOT NULL
);

CREATE TYPE category_enum AS ENUM ('Plantas', 'Manualidades', 'Musica', 'Bienestar');

CREATE TABLE products (
    id_product SERIAL PRIMARY KEY,
    id_user INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10, 0) NOT NULL,
    description TEXT,
    image_url VARCHAR(255) NOT NULL,
    category category_enum NOT NULL,
    date_add TIMESTAMP NOT NULL,
    CONSTRAINT fk_products_users
        FOREIGN KEY(id_user) 
        REFERENCES users(id_user)
        ON DELETE CASCADE
);

CREATE TABLE favorites (
    id_user INT NOT NULL,
    id_product INT NOT NULL,
    CONSTRAINT fk_favorites_user
        FOREIGN KEY(id_user) 
        REFERENCES users(id_user)
        ON DELETE CASCADE,
    CONSTRAINT fk_favorites_products
        FOREIGN KEY(id_product)
        REFERENCES products(id_product)
        ON DELETE CASCADE,
    PRIMARY KEY (id_user, id_product)
);

CREATE TABLE orders (
    id_order SERIAL PRIMARY KEY,
    id_user INT NOT NULL,
    total_price NUMERIC(10, 0) NOT NULL,
    purchase_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_orders_users
        FOREIGN KEY(id_user)
        REFERENCES users(id_user)
        ON DELETE CASCADE
);

CREATE TABLE order_details (
    id_order INT NOT NULL,
    id_product INT NOT NULL,
    unit_price NUMERIC(10, 0) NOT NULL,
    product_quantity INT NOT NULL,
    CONSTRAINT fk_order_details_orders
        FOREIGN KEY(id_order) 
        REFERENCES orders(id_order)
        ON DELETE CASCADE,
    CONSTRAINT fk_order_details_products
        FOREIGN KEY(id_product)
        REFERENCES products(id_product)
        ON DELETE CASCADE,
    PRIMARY KEY (id_order, id_product)
);

/* users */
INSERT INTO users (
    id_user,
    firstname, lastname,
    email, password,
    address, phone,
    avatar_url,
    id_user_google,
    date_add, date_upd)
VALUES (
    1,
    'Jennifer', 'López',
    'jlo@mimarketlatino.com', '$2a$10$DNYPeD41MsTKRkbe3zZtA.Nzd0SPokboIqyXmImlp8U9uqMwTV91G', /*1234*/
    'Los Ángeles, California', '1234567890',
    'https://media.tenor.com/5fZ3ujIk8WkAAAAe/jlo-mi.png',
    NULL,
    CURRENT_TIMESTAMP AT TIME ZONE 'UTC',
    CURRENT_TIMESTAMP AT TIME ZONE 'UTC'
);
SELECT setval('users_id_user_seq', 1);

/* products */
INSERT INTO products (
    id_product,
    id_user,
    name,
    price,
    description,
    image_url,
    category,
    date_add)
VALUES (
    1,
    1,
    'Planta María Juana Kawaii Bordada',
    9990,
    'Lo mejor de cuatro mundos',
    'https://i.pinimg.com/736x/be/d6/3f/bed63fbd3b545cd5e15e18caf1a89885.jpg',
    'Plantas',
    CURRENT_TIMESTAMP AT TIME ZONE 'UTC'
),
(
    2,
    1,
    'Nombre',
    9990,
    'Descripción',
    'http://',
    'Manualidades',
    CURRENT_TIMESTAMP AT TIME ZONE 'UTC'
),
(
    3,
    1,
    'Nombre',
    9990,
    'Descripción',
    'http://',
    'Musica',
    CURRENT_TIMESTAMP AT TIME ZONE 'UTC'
),
(
    4,
    1,
    'Nombre',
    9990,
    'Descripción',
    'http://',
    'Bienestar',
    CURRENT_TIMESTAMP AT TIME ZONE 'UTC'
);
SELECT setval('products_id_product_seq', 4);

/* favorites */
INSERT INTO favorites (id_user, id_product) VALUES (1, 1), (1, 2);

/* orders */
INSERT INTO orders (
    id_order,
    id_user,
    total_price,
    purchase_date
) VALUES (
    1,
    1,
    9990,
    CURRENT_TIMESTAMP AT TIME ZONE 'UTC'
);
SELECT setval('orders_id_order_seq', 1);

/* order_details */
INSERT INTO order_details (
    id_order,
    id_product,
    unit_price,
    product_quantity
) VALUES (
    1,
    1,
    9990,
    1
);
