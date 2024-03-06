import request from "supertest";
import app from "../../server.js";
import { generateToken } from "../utils/data.js";

describe('Products API', () => {

    describe('GET /products', () => {
        it('Should return all products and have a status code of 200', async () => {
            await request(app)
                .get('/api/v1/products')
                .expect(200)
                .then(response => {
                    expect(response.body).toBeInstanceOf(Array);
                });
        });
    });

    describe('GET /products/:id', () => {
        it('Should return a product by id and have a status code of 200', async () => {
            await request(app)
                .get('/api/v1/products/27') // Cambiar el id por uno existente en la base de datos
                .expect(200)
                .then(response => {
                    expect(response.body).toHaveProperty('id_product');
                });
        });

        it('Should return a 404 status code if the product does not exist', async () => {
            await request(app)
                .get('/api/v1/products/9999999') // Cambiar el id por uno que NO exista en la base de datos
                .expect(404)
                .then(response => {
                    expect(response.body).toHaveProperty('message', 'Product not found');
                });
        });
    });

    let createdProductId; // Variable para almacenar el ID del producto creado

    describe('POST /products', () => {
        it('Should create a product and return a status code of 201', async () => {
            const product = {
                "name": "Planta María Juana Kawaii Bordada",
                "price": 30000,
                "description": "Lo mejor de cuatro mundos",
                "image_url": "https://i.pinimg.com/736x/be/d6/3f/bed63fbd3b545cd5e15e18caf1a89885.jpg",
                "category": "Manualidades"
            };

            const response = await request(app)
                .post('/api/v1/products')
                .set('Authorization', `Bearer ${generateToken()}`)
                .send(product)
                .expect(201);

            // Guardamos el ID del producto creado para usarlo después
            createdProductId = response.body.id_product;
        });

        it('Should return a 401 status code if the user is not authenticated', async () => {
            const product = {
                "name": "Planta María Juana Kawaii Bordada",
                "price": 30000,
                "description": "Lo mejor de cuatro mundos",
                "image_url": "https://i.pinimg.com/736x/be/d6/3f/bed63fbd3b545cd5e15e18caf1a89885.jpg",
                "category": "Manualidades"
            };

            await request(app)
                .post('/api/v1/products')
                .send(product)
                .expect(401);
        });
    });

    describe('DELETE /products/:id', () => {
        it('Should delete a product and return a status code of 200', async () => {
            if (!createdProductId) {
                throw new Error('No product ID defined for deletion test');
            }

            await request(app)
                .delete(`/api/v1/products/${createdProductId}`)
                .set('Authorization', `Bearer ${generateToken()}`)
                .expect(200);
        });

        it('Should return a 401 status code if the user is not authenticated', async () => {
            await request(app)
                .delete('/api/v1/products/27') // Cambiar el id por uno existente en la base de datos
                .expect(401);
        });

        it('Should return a 404 status code if the product does not exist', async () => {
            await request(app)
                .delete('/api/v1/products/9999999') // Cambiar el id por uno que NO exista en la base de datos
                .set('Authorization', `Bearer ${generateToken()}`)
                .expect(404);
        });
    });
});