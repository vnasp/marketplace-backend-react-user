import { Router } from "express";

// controller
import { updateFavorites } from '../controllers/favoritesController.js';

const router = Router();

router
    .route("/favorites/:id")
    .put(updateFavorites)
    .all((req, res, next) => {
        res.status(405).json({ message: "Method not allowed" });
    });

export default router;
