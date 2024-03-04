import { favoriteModel } from "../models/favoriteModel.js";

// method: POST
const addFavorites = async (req, res) => {
    try {
        const { id_user } = req.auth.id_user;
        const { id_product } = req.body;
        await favoriteModel.addFavorite(id_user, id_product);
        return res.status(201).json({ id_user, id_product });
    } catch (error) {
        throw new Error("Error adding favorite: " + error.message);
    }
};

// method: GET
const getFavoritesByUser = async (req, res) => {
    try {
        const { id_user } = req.auth.id_user;
        const favorites = await favoriteModel.existingFavorite(id_user);
        return res.status(200).json(favorites);
    } catch (error) {
        throw new Error("Error adding favorite: " + error.message);
    }
};

// method: PUT
const updateFavorites = async (req, res) => {
    try {
        const { id_user } = req.params.id;
        const { id_product } = req.body;
        const isFavorite = await favoriteModel.existingFavorite(
            id_user,
            id_product
        );
        if (isFavorite) {
            await favoriteModel.removeFavorite(id_user, id_product);
            return res
                .status(200)
                .json({ message: "Favorited removed successfully" });
        } else {
            await favoriteModel.addFavorite(id_user, id_product);
            return res
                .status(201)
                .json({ message: "Favorite added successfully" });
        }
    } catch (error) {
        throw new Error("Error updating favorite: " + error.message);
    }
};

// method: DELETE
const removeFavorites = async (req, res) => {
    try {
        const { id_user }= req.auth.id_user;
        const { id_product } = req.body;
        await favoriteModel.removeFavorite(id_user, id_product);
        return res.status(201).json({ id_user, id_product });
    } catch (error) {
        throw new Error("Error removing favorite: " + error.message);
    }
};

export const favoritesController = {
    addFavorites,
    getFavoritesByUser,
    updateFavorites,
    removeFavorites,
};
