import express from "express";
import passport from "passport";

// Controller
import { handleGoogleCallback } from "../../src/api/v1/controllers/googleUsersController.js";

const router = express.Router();

// Ir a la página de Google para iniciar sesión o registrarse con Google
router.get("/auth/google/login", passport.authenticate("google", { scope: ["profile", "email"] }));

// Después de iniciar sesión o registrarse con Google, redirigir a ciertas páginas con el JWT creado con el token de Google
router.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), handleGoogleCallback);

// Ruta para registrar con Google
router.post("/auth/google/register", handleGoogleCallback);

export default router;
