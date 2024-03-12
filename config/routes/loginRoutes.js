import express from "express";

// controller
import { loginController } from "../../src/api/v1/controllers/loginController.js";

const router = express.Router();

// routes
// logging in - public
router.post("/login", loginController.login);

export default router;
