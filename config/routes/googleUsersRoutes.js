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

// Ruta para iniciar sesión con Google
router.post("/auth/google/login", passport.authenticate('google'), googleAuthCallbackController);

// Ruta para registrar con Google
router.post("/auth/google/register", handleGoogleCallback);

export default router;
