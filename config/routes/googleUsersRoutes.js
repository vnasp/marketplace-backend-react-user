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

// go to google page to logging or register in with google
router.get("/google", googleAuthController);

// after logging or register with google, redirect to certain pages with jwt created with the google token
router.get("/google/callback", authenticateWithGoogleToken, googleAuthCallbackController);

// manage callback 
router.post("/google/callback", handleGoogleCallback);

export default router;
