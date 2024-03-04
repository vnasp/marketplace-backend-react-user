import pool from "../../../../config/database/connection.js";

const getProductsDB = async () => {
    const { rows } = await pool.query('SELECT * FROM products');
    return rows;
};

const getProductDB = async (id) => {
    const { rows } = await pool.query('SELECT * FROM products WHERE id_product = $1', [id]);
    return rows[0];
};

const createProductDB = async (product) => {
    const { id_user, name, price, description, image_url, category } = product;
    const { rows } = await pool.query('INSERT INTO products (id_user, name, price, description, image_url, category, date_add) VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP) RETURNING *', [id_user, name, price, description, image_url, category]);
    return rows[0];
};

const deleteProductDB = async (id) => {
    const { rows } = await pool.query('DELETE FROM products WHERE id_product = $1 RETURNING *', [id]);
    return rows[0];
};

export const productModel = { getProductsDB, getProductDB, createProductDB, deleteProductDB };

/*
::createProduct()

request
{
  "product": {
    "name": "Planta María Juana Kawaii Bordada",
    "price": 30000,
    "description": "Lo mejor de cuatro mundos",
    "image_url": "https://i.pinimg.com/736x/be/d6/3f/bed63fbd3b545cd5e15e18caf1a89885.jpg",
    "category": "manualidades",
    "date_add": "2024-02-14T16:00:00.000Z"
  }
}

response
{
  "name": "Planta María Juana Kawaii Bordada",
  "price": 30000,
  "description": "Lo mejor de cuatro mundos",
  "image_url": "https://i.pinimg.com/736x/be/d6/3f/bed63fbd3b545cd5e15e18caf1a89885.jpg",
  "category": "manualidades",
  "date_add": "2024-02-14T16:00:00.000Z"
}
*/


/*
::getProduct()
::getProducts()

request
id_product id_user

response [] || {}
{
  "name": "Planta María Juana Kawaii Bordada",
  "price": 30000,
  "description": "Lo mejor de cuatro mundos",
  "image_url": "https://i.pinimg.com/736x/be/d6/3f/bed63fbd3b545cd5e15e18caf1a89885.jpg",
  "category": "manualidades",
  "date_add": "2024-02-14T16:00:00.000Z"
}
*/

/*
::deleteProduct()

request
id_product id_user

response
{
  "name": "Planta María Juana Kawaii Bordada",
  "price": 30000,
  "description": "Lo mejor de cuatro mundos",
  "image_url": "https://i.pinimg.com/736x/be/d6/3f/bed63fbd3b545cd5e15e18caf1a89885.jpg",
  "category": "manualidades",
  "date_add": "2024-02-14T16:00:00.000Z"
}
*/
