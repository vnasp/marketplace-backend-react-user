import { productsModel } from "../models/productsModel.js";

const getProducts = async (req, res) => {
    try {
        const products = await productsModel.getProductsDB();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productsModel.getProductDB(id);
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
        const product = await productsModel.createProductDB(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await productsModel.deleteProductDB(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto eliminado con éxito', product: deletedProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const productsController = { getProducts, getProduct, createProduct, deleteProduct };