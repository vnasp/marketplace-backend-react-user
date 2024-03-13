import Config from "../src/api/v1/utils/Config.js";
// jwt
import jwt from "jsonwebtoken";

const checkAuthentication = (req, res, next) => {
    try {
        //validate headers
        const token = req.headers.authorization?.split(" ")[1];
        
        if (!token) {
            res.locals.statusText = { error: "Token is required" };
            return res.status(401).json(res.locals.statusText);
        }

        //validate token
        req.auth = jwt.verify(token, Config.get("JWT_SECRET"));
        next();
    } catch (error) {
        res.locals.statusText = { error: `Token is invalid: ${error.message}` };
        return res.status(401).send(res.locals.statusText);
    }
};

export const auth = { checkAuthentication };
