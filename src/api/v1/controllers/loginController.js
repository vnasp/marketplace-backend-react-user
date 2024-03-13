import Config from "../utils/Config.js";

// bcript
import bcript from "bcryptjs";

// jwt
import jwt from "jsonwebtoken";

// model
import { userModel } from '../models/userModel.js';


const login = async(req, res) => {
    let error;

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error("Required parameters are missing.");
        }
    
        const user = await userModel.getUser({ email });

        if (!user) {
            //We don't give back a cause in the feedback to avoid giving an attacker details
            //error = { error: "User not found" };
            error = { error: "Email and/or password is invalid" };
            res.locals.statusText = error;
            return res.status(400).json(error);
        }
      
        const passwordMatch = bcript.compareSync(password, user.password);

        if (!passwordMatch) {
            //We don't give back a cause in the feedback to avoid giving an attacker details
            //error = { error: "Password is incorrect" };
            error = { error: "Email and/or password is invalid" };
            res.locals.statusText = error;
            return res.status(400).json(error);
        }

        const expiresIn      = Number(Config.get("JWT_EXPIRES_IN_SECONDS"));
        const expirationDate = new Date(Date.now() + expiresIn * 1000).toISOString().slice(0, 19).replace('T', ' ');

        const token = jwt.sign({
            id_user : user.id_user,
        }, Config.get("JWT_SECRET"), { expiresIn: expiresIn });
    
        const response = {
            token,
            expiresIn,
            expirationDate
        };

        res.locals.statusText = response;
        return res.status(200).json(response);
    } catch (e) {
        error = { error: `${e.message}` };
        res.locals.statusText = error;
        return res.status(500).json(error);
    }
};

export const loginController = { login };
