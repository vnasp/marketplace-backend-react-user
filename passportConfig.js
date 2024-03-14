import Config from "./src/api/v1/utils/Config.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { userModel } from "./src/api/v1/models/userModel.js";

passport.use(
    "google",
    new GoogleStrategy(
        {
            clientID: Config.get("GOOGLE_CLIENT_ID"),
            clientSecret: Config.get("GOOGLE_CLIENT_SECRET"),
            callbackURL: "/auth/google/callback"
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const user = await userModel.getUser({
                    id_user_google: profile.id,
                });
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

// Serialización del usuario
passport.serializeUser((user, done) => {
  done(null, user.id_user);
});

// Deserialización del usuario
passport.deserializeUser(async (id, done) => {
  try {
      const user = await userModel.getUser({ id_user: id });
      done(null, user);
  } catch (error) {
      done(error);
  }
});

export default passport;
