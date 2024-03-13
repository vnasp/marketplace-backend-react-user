import Config from "../src/api/v1/utils/Config.js";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

const googleClientId = Config.get("GOOGLE_CLIENT_ID");
const jwtSecret = Config.get("JWT_SECRET");

const client = new OAuth2Client(googleClientId);

const authenticateWithGoogleToken = async (req, res, next) => {
    const { token } = req.body;

    // Comprobar si se proporciona un token
    if (!token) {
        return res.status(400).json({ error: "Google token is required" });
    }

    try {
        // Verificar el token con el cliente de Google
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: googleClientId, // Utiliza el ID del cliente de Google desde el archivo .env
        });
        const payload = ticket.getPayload();

        // Generar un token JWT con la información del payload
        const jwtToken = jwt.sign(payload, jwtSecret, {
            expiresIn: "1h",
        });

        // Enviar la respuesta con el token JWT generado
        res.json({ token: jwtToken, isSuccess: true });
    } catch (error) {
        // Manejar errores
        console.error("Error verifying Google token:", error);
        return res
            .status(401)
            .json({
                error: `Authentication failed: ${error.message}`,
                isSuccess: false,
            });
    }
};

export { authenticateWithGoogleToken };
