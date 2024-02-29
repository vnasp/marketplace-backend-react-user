CREATE TABLE users (
    id_user SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    phone VARCHAR(20),
    avatar_url VARCHAR(255),
    id_user_google VARCHAR(255),
    date_add TIMESTAMP NOT NULL,
    date_upd TIMESTAMP NOT NULL
);

CREATE TYPE category_enum AS ENUM ('Plantas', 'Manualidades', 'Música', 'Bienestar');

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
    purchase_date TIMESTAMP NOT NULL,
    CONSTRAINT fk_orders_users
        FOREIGN KEY(id_user)
        REFERENCES users(id_user)
        ON DELETE CASCADE
);

CREATE TABLE orders_details (
    id_order INT NOT NULL,
    id_product INT NOT NULL,
    product_quantity INT NOT NULL,
    CONSTRAINT fk_orders_details_orders
        FOREIGN KEY(id_order) 
        REFERENCES orders(id_order)
        ON DELETE CASCADE,
    CONSTRAINT fk_orders_details_products
        FOREIGN KEY(id_product)
        REFERENCES products(id_product)
        ON DELETE CASCADE,
    PRIMARY KEY (id_order, id_product)
);
