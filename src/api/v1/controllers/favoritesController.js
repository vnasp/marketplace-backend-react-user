import { favoriteModel } from "../models/favoriteModel.js";

const updateFavorites = async (req, res) => {
    try {
        const { id_user } = req.params.id;
        const { id_product } = req.body;
        const isFavorite = await favoriteModel.existingFavorite(id_user, id_product);
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

export const favoritesController = { updateFavorites };
