import {usersModel} from '../models/usersModel.js';

const createUser = async(req, res) => {
    try {
        const { email } = req.body;
        const userExists = await usersModel.getUser({ email });

        if (userExists) {
            res.locals.statusText = { error: "User already exists", message: "User already exists" };
            return res.status(400).json(res.locals.statusText);
        }

        res.locals.statusText = await usersModel.createUser(req.body);
        return res.status(200).json(res.locals.statusText);
    } catch (error) {
        res.locals.statusText = { error: `Error: ${error.message}`, message: `Error: ${error.message}`};
        return res.status(500).json(res.locals.statusText);
    }
};

const getUser = async(req, res) => {
    try {
        const { email } = req.auth;
        const user = await usersModel.getUser({ email });
        res.locals.statusText = [ user ];
        return res.status(200).json(res.locals.statusText);
    } catch (error) {
        res.locals.statusText = { error: `Error: ${error.message}`, message: `Error: ${error.message}`};
        return res.status(500).json(res.locals.statusText);
    }
};

const updateUser = async(req,res) => {}


export const usersController = { getUser, createUser, updateUser };
