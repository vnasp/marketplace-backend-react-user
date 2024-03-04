import express from "express";

// controller
import { favoritesController } from "../../src/api/v1/controllers/favoritesController.js";

// auth
import { auth } from "../../middlewares/auth.js";

const router = express.Router();

// routes

// POST
router.post(
    "/favorites",
    auth.checkAuthentication,
    favoritesController.addFavorites
);

// GET
router.get(
    "/favorites",
    auth.checkAuthentication,
    favoritesController.getFavoritesByUser
);

// PUT
router.put("/favorites/:id", favoritesController.updateFavorites);

// DELETE
router.delete(
    "/favorites/:id",
    auth.checkAuthentication,
    favoritesController.removeFavorites
);

export default router;
