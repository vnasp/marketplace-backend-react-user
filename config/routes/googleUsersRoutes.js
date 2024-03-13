import express from "express";
import passport from "passport";

// Controller
import {
    googleAuthCallbackController,
    handleGoogleCallback,
} from "../../src/api/v1/controllers/googleUsersController.js";

const router = express.Router();

// Routes

// Ir a la página de Google para iniciar sesión o registrarse con Google
router.get("/google", passport.authenticate('google', { scope: ['profile', 'email'] }));

// Después de iniciar sesión o registrarse con Google, redirigir a ciertas páginas con el JWT creado con el token de Google
router.get("/google/callback", passport.authenticate('google', { failureRedirect: '/login' }), googleAuthCallbackController);

// Manejar la devolución de llamada
router.post("/google/callback", handleGoogleCallback);

export default router;
