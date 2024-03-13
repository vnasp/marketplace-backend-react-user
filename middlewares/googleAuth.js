import Config from "../src/api/v1/utils/Config.js";
import { OAuth2Client } from "google-auth-library";
// jwt
import jwt from "jsonwebtoken";

const client = new OAuth2Client(Config.get("GOOGLE_CLIENT_ID"));

const authenticateWithGoogleToken = async (req, res, next) => {
    const { token } = req.body;
    if (!googleToken) {
        return res.status(400).json({ error: "Google token is required" });
    }
    try {
        // verify token with google client
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: Config.get("GOOGLE_CLIENT_ID"),
        });
        const payload = ticket.getPayload();

        // generate jwt with payload information
        const jwtToken = jwt.sign(payload, Config.get("JWT_SECRET"), {
            expiresIn: "1h",
        });
        req.jwtToken = jwtToken;
        res.send({ payload, isSuccess: true });
        next();
    } catch (error) {
        return res
            .status(401)
            .json({ error: `Authentication failed: ${error.message}` })
            .send({ payload: {}, isSuccess: false });
    }
};

export { authenticateWithGoogleToken };
