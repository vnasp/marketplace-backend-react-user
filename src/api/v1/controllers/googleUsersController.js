import passport from "passport";

import { userModel } from "../models/userModel.js";

const googleAuthController = passport.authenticate("google", {
    scope: ["profile", "email"],
});

const googleAuthCallbackController = passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/",
});
// for future deployment, check if the successRedirect changes

const handleGoogleCallback = async (req, res, next) => {
    passport.authenticate("google", async (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ error: "Authentication failed" });
        }
        try {
            const registeredUser = await userModel.registerOrLoginWithGoogle(
                user
            );
            return res.status(200).json({ user: registeredUser });
        } catch (error) {
            return res
                .status(500)
                .json({
                    error:
                        "Error registering or logging in with Google: " +
                        error.message,
                });
        }
    })(req, res, next);
};

export {
    googleAuthController,
    googleAuthCallbackController,
    handleGoogleCallback,
};
