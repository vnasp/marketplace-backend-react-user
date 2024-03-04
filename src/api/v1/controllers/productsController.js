import { productModel } from "../models/productModel.js";

const getProducts = async (req, res) => {
    try {
        const products = await productModel.getProductsDB();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.getProductDB(id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
        // Obtiene id_user desde el JWT decodificado
        const id_user = req.auth.id_user;

        // Incluye id_user en el objeto del producto a crear
        const productData = { ...req.body, id_user }; // Agrega el id_user extraído del token a los datos del producto

        const product = await productModel.createProductDB(productData);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await productModel.deleteProductDB(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto eliminado con éxito', product: deletedProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const productsController = { getProducts, getProduct, createProduct, deleteProduct };