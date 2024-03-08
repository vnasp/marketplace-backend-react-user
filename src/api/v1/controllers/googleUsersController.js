import passport from "passport";

// model
import { userModel } from "../models/userModel.js";

// authentication with scopes
const googleAuthController = passport.authenticate("google", {
    scope: ["profile", "email"],
});

// callback to redirect in case of failure and success
const googleAuthCallbackController = passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/",
});
// for future deployment, successRedirect should by to profile

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
            const userExists = await userModel.getUser({ email: profile.emails[0]?.value });
            if (userExists) {
                res.locals.statusText = { error: "User already exists" };
                return res.status(400).json(res.locals.statusText);
            }
            res.locals.statusText =  await createUser({
                firstname      : profile.name.givenName,
                lastname       : profile.name.familyName,
                email          : profile.emails[0].value,
                password       : "",
                address        : "",
                phone          : "",
                avatar_url     : profile.photos[0].value,
                id_user_google : profile.id,
            });
            return res.status(201).json(res.locals.statusText);
        } catch (error) {
            res.locals.statusText = { error: `${error.message}` };
            return res.status(500).json(res.locals.statusText);
        }
    })(req, res, next);
};

export {
    googleAuthController,
    googleAuthCallbackController,
    handleGoogleCallback,
};
