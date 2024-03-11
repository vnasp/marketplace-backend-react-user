import { favoriteModel } from "../models/favoriteModel.js";

// method: POST
const addFavorites = async (req, res) => {
    try {
        const { id_user } = req.auth;
        const { id_product } = req.body;
        await favoriteModel.addFavorite(id_user, id_product);
        return res.status(201).json({ id_user, id_product });
    } catch (error) {
        res.locals.statusText = { error: `${error.message}` };
        return res.status(500).json(res.locals.statusText);
    }
};

// method: GET
const getFavoritesByUser = async (req, res) => {
    try {
        const { id_user } = req.auth;
        const favorites = await favoriteModel.getFavoriteByUser(id_user);
        return res.status(200).json(favorites);
    } catch (error) {
        res.locals.statusText = { error: `${error.message}` };
        return res.status(500).json(res.locals.statusText);
    }
};

// method: DELETE
const removeFavorites = async (req, res) => {
    try {
        const { id_user } = req.auth;
        const { id_product } = req.body;
        await favoriteModel.removeFavorite(id_user, id_product);
        return res
            .status(204)
            .json({ message: "Favorite removed successfully" });
    } catch (error) {
        res.locals.statusText = { error: `${error.message}` };
        return res.status(500).json(res.locals.statusText);
    }
};

export const favoritesController = {
    addFavorites,
    getFavoritesByUser,
    removeFavorites,
};
