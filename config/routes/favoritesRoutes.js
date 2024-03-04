import express from "express";

// controller
import { favoritesController } from "../../src/api/v1/controllers/favoritesController.js";

// auth
import { auth } from "../../middlewares/auth.js";

const router = express.Router();

// Routes
// post and delete
router.post("/favorites/:id", favoritesController.updateFavorites)
router.delete("/favorites/:id", favoritesController.deleteFavorite)

// este para agregar favoritos.El id del producto se pasa en el body
router.post(
    "/favorites",
    auth.checkAuthentication,
    favoritesController.addFavorite
);

// este para obtener los favoritos. El id de usuario viene del auth
router.get(
    "/favorites",
    auth.checkAuthentication,
    favoritesController.getFavoritesByAuthUser
);

export default router;
