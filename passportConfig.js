import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20"; 
import { userModel } from "./src/api/v1/models/userModel.js";

passport.use(
    "google",
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const user = await userModel.findOne({ googleId: profile.id });
                if (!user) {
                    return done(null, false, {
                        message: "Usuario no registrado",
                    });
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

// Serialización y deserialización del usuario
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

export default passport;
