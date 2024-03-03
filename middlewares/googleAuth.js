import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const authenticateWithGoogleToken = async (req, res, next) => {
    const { googleToken } = req.body;
    if (!googleToken) {
        return res.status(400).json({ error: "Google token is required" });
    }
    try {
        // verify token with google client
        const ticket = await client.verifyIdToken({
            idToken: googleToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();

        // generate jwt with payload information
        const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        req.jwtToken = jwtToken;
        next();
    } catch (error) {
        return res
            .status(401)
            .json({ error: `Authentication failed: ${error.message}` });
    }
};

export { authenticateWithGoogleToken };
