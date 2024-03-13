import passport from "passport";

// model
import { userModel } from "../models/userModel.js";

// managing callback in case user already exists, otherwise, create a user
const handleGoogleCallback = async (req, res, next) => {
    passport.authenticate("google", async (err, profile) => {
        if (err) {
            return next(err);
        }
        if (!profile) {
            return res.status(401).json({ error: "Authentication failed" });
        }
        try {
            // Buscar si el usuario ya existe en la base de datos
            const existingUser = await userModel.findOne({
                googleId: profile.id,
            });
            if (existingUser) {
                res.locals.statusText = { error: "User already exists" };
                return res.status(400).json(res.locals.statusText);
            } else {
                // El usuario no existe, crear uno nuevo
                const newUser = {
                    firstname: profile.name.givenName,
                    lastname: profile.name.familyName,
                    email: profile.emails[0].value,
                    password: "",
                    address: "",
                    phone: "",
                    avatar_url: profile.photos[0].value,
                    googleId: profile.id,
                };
                const createdUser = await userModel.createUser(newUser);
                // Enviar una respuesta exitosa con el usuario creado
                return res.status(201).json(createdUser);
            }
        } catch (error) {
            console.error("Error creating user:", error);
            return res.status(500).json({ error: "Failed to create user" });
        }
    })(req, res, next);
};

export { handleGoogleCallback };
