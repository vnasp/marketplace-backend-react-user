import express from "express";

// controller
import {
    googleAuthController,
    googleAuthCallbackController,
    handleGoogleCallback,
} from "../../src/api/v1/controllers/googleUsersController.js";

// google auth
import { authenticateWithGoogleToken } from "../../middlewares/googleAuth.js"

const router = express.Router();

// routes

// GET login with google
router.get("/google", googleAuthController);

// GET callback
router.get("/google/callback", authenticateWithGoogleToken, googleAuthCallbackController);

// POST manage callback
router.post("/google/callback", handleGoogleCallback);

export default router;
