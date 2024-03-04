import { Router } from "express";

// controller
import { favoritesController } from "../../src/api/v1/controllers/favoritesController.js";

// auth
import { auth } from "../../middlewares/auth.js";

/* Los chiquillos importan de la siguiente maenra, para que revisen y queden todos los routes iguales 
import express from 'express';
const router = express.Router();
*/

const router = Router();

// este put sería modificarlo por post y delete
router
    .route("/favorites/:id")
    .put(favoritesController.updateFavorites)
    .all((req, res, next) => {
        res.status(405).json({ message: "Method not allowed" });
    });


// este para agregar favoritos.El id del producto se pasa en el body
router.post('/favorites', auth.checkAuthentication, favoritesController.addFavorite);

// este para obtener los favoritos. El id de usuario viene del auth
router.get('/favorites', auth.checkAuthentication, favoritesController.getFavoritesByAuthUser);

// este para borrar los favoritos. El id es del producto en el path.
router.get('/favorites/{id}', auth.checkAuthentication, favoritesController.deleteFavorite);

export default router;
