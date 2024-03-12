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
    favoritesController.addFavorites
);

// getting user's favorites - private
router.get(
    "/favorites/:id_user",
    auth.checkAuthentication,
    favoritesController.getFavoritesByUser
);

// deleting a favorite - private
router.delete(
    "/favorites/:id_user",
    auth.checkAuthentication,
    favoritesController.removeFavorites
);

export default router;
