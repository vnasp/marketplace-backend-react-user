// model
import { productModel } from "../models/productModel.js";

// method: GET
const getProducts = async (req, res) => {
    try {
        const products = await productModel.getProductsDB();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// method: GET
const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.getProductDB(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// method: POST
const createProduct = async (req, res) => {
    try {
        // id_user from decoded JWT
        const id_user = req.auth.id_user;

        // include id_user in product object to create product
        const productData = { ...req.body, id_user }; // add id_user from token to product data

        const product = await productModel.createProductDB(productData);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// method: DELETE
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await productModel.deleteProductDB(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({
            message: "Product successfully removed",
            product: deletedProduct,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const productsController = {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
};
