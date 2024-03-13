import express from "express";

// controller
import { favoritesController } from "../../src/api/v1/controllers/favoritesController.js";

// auth
import { auth } from "../../middlewares/auth.js";

const router = express.Router();

// routes
// adding favorite - private
router.post(
    "/favorites/:id_user",
    auth.checkAuthentication,
    favoritesController.addFavorite
);

// getting user's favorites - private
router.get(
    "/favorites/:id_user",
    auth.checkAuthentication,
    favoritesController.getFavorites
);

// deleting a favorite - private
router.delete(
    "/favorites/:id_user",
    auth.checkAuthentication,
    favoritesController.deleteFavorite
);

export default router;
