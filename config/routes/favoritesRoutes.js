import express from "express";

// controller
import { favoritesController } from "../../src/api/v1/controllers/favoritesController.js";

// auth
import { auth } from "../../middlewares/auth.js";

const router = express.Router();

// Routes
// put
router.put(
    "/favorites",
    auth.checkAuthentication,
    favoritesController.updateFavorites
);

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

// este para borrar los favoritos. El id es del producto en el path.
router.delete(
    "/favorites/{id}",
    auth.checkAuthentication,
    favoritesController.deleteFavorite
);

export default router;
