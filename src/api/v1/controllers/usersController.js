import {userModel} from '../models/userModel.js';

const createUser = async(req, res) => {
    try {
        const { email } = req.body;
        const userExists = await userModel.getUser({ email });

        if (userExists) {
            res.locals.statusText = { error: "User already exists" };
            return res.status(400).json(res.locals.statusText);
        }

        res.locals.statusText = await userModel.createUser(req.body);
        return res.status(201).json(res.locals.statusText);
    } catch (error) {
        res.locals.statusText = { error: `${error.message}` };
        return res.status(500).json(res.locals.statusText);
    }
};

const getUser = async(req, res) => {
    try {
        const { id_user } = req.auth;

        const user = await userModel.getUser({ id_user });
        res.locals.statusText = user;
        return res.status(200).json(res.locals.statusText);
    } catch (error) {
        res.locals.statusText = { error: `${error.message}` };
        return res.status(500).json(res.locals.statusText);
    }
};

const editUser = async(req, res) => {
    try {
        const { id_user } = req.auth;
        const { email } = req.body;

        if (email && await userModel.getUser({ email, id_user_diff : id_user })) {
            res.locals.statusText = { error: "Email is already in use." };
            return res.status(400).json(res.locals.statusText);
        }

        const editUser = await userModel.editUser({...req.body, id_user, date_upd: "CURRENT_TIMESTAMP" });

        if (!editUser) {
            res.locals.statusText = { error: `User could not be updated.` };
            return res.status(500).json(res.locals.statusText);
        }

        return res.status(200).json(editUser);
    } catch (error) {
        res.locals.statusText = { error: `${error.message}` };
        return res.status(500).json(res.locals.statusText);
    }
};

export const usersController = { getUser, createUser, editUser };
