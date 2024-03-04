import { Router } from "express";

// controller
import { favoritesController } from "../../src/api/v1/controllers/favoritesController.js";

const router = Router();

router
    .route("/favorites/:id")
    .put(favoritesController.updateFavorites)
    .all((req, res, next) => {
        res.status(405).json({ message: "Method not allowed" });
    });

export default router;
