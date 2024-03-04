import { Router } from "express";
import {
    googleAuthController,
    googleAuthCallbackController,
    handleGoogleCallback,
} from "../../src/api/v1/controllers/googleUsersController.js";

import { authenticateWithGoogleToken } from "../../middlewares/googleAuth.js"

const router = Router();

router
    .route("/google")
    .get(googleAuthController)
    .all((req, res, next) => {
        res.status(405).json({ message: "Method not allowed" });
    });

router
    .route("/google/callback")
    .get(authenticateWithGoogleToken, handleGoogleCallback)
    .all((req, res, next) => {
        res.status(405).json({ message: "Method not allowed" });
    });

export default router;
