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


// el auth es el que han usado los chiquillos, de ahí obtienen el id del usuario, sin necesidad de pasar el id en la URL
// este para agregar favoritos
router.post('/favorites', auth.checkAuthentication, favoritesController.addFavorite);

// este para obtener los favoritos
router.get('/favorites', auth.checkAuthentication, favoritesController.getFavoritesByAuthUser);

// este para borrar los favoritos
router.get('/favorites', auth.checkAuthentication, favoritesController.deleteFavorite);

export default router;
