import express from "express";

// controller
import { favoritesController } from "../../src/api/v1/controllers/favoritesController.js";

// auth
import { auth } from "../../middlewares/auth.js";

const router = express.Router();

// routes

// POST
router.post(
    "/favorites/:id_user",
    auth.checkAuthentication,
    favoritesController.addFavorites
);

// GET
router.get(
    "/favorites/:id_user",
    auth.checkAuthentication,
    favoritesController.getFavoritesByUser
);

// PUT
router.put(
    "/favorites/:id_user",
    auth.checkAuthentication,
    favoritesController.updateFavorites
);

// DELETE
router.delete(
    "/favorites/:id_user",
    auth.checkAuthentication,
    favoritesController.removeFavorites
);

export default router;
