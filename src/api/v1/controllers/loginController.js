import Config from "../utils/Config.js";

// bcript
import bcript from "bcryptjs";

// jwt
import jwt from "jsonwebtoken";

// model
import { userModel } from '../models/userModel.js';


const login = async(req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error("Required parameters are missing.");
        }
    
        const user = await userModel.getUser({ email });

        if (!user) {
            res.locals.statusText = { error: "Email and/or password is invalid" };
            //res.locals.statusText = { error: "User not found" };
            return res.status(400).json(res.locals.statusText);
        }
      
        const passwordMatch = bcript.compareSync(password, user.password);

        if (!passwordMatch) {
            res.locals.statusText = { error: "Email and/or password is invalid" };
            //res.locals.statusText = { error: "Password is incorrect" };
            return res.status(400).json(res.locals.statusText);
        }

        const expiresIn      = Number(Config.get("JWT_EXPIRES_IN_SECONDS"));
        const expirationDate = new Date(Date.now() + expiresIn * 1000).toISOString().slice(0, 19).replace('T', ' ');

        const token = jwt.sign({
            id_user : user.id_user,
        }, Config.get("JWT_SECRET"), { expiresIn: expiresIn });
    
        res.locals.statusText = {
            token,
            expiresIn,
            expirationDate
        };
        return res.status(200).json(res.locals.statusText);
    } catch (error) {
        res.locals.statusText = { error: `${error.message}` };
        return res.status(500).json(res.locals.statusText);
    }
};

export const loginController = { login };
