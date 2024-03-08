import { OAuth2Client } from "google-auth-library";

// jwt
import jwt from "jsonwebtoken";

// dotenv
import "dotenv/config";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const authenticateWithGoogleToken = async (req, res, next) => {
    const { token } = req.body;
    if (!googleToken) {
        return res.status(400).json({ error: "Google token is required" });
    }
    try {
        // verify token with google client
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();

        // generate jwt with payload information
        const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, {
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
