import "dotenv/config";
import jwt from "jsonwebtoken";
import { faker } from "@faker-js/faker";

const credentials_valid = {
    id_user  : 1,
    email    : "jlo@mimarketlatino.com",
    password : "1234"
};

const credentials_invalid = {
    email    : faker.internet.email()+"!",
    password : faker.internet.password()
};

const generateToken = () => {
    return jwt.sign({ id_user: credentials_valid.id_user }, process.env.JWT_SECRET || "az_AZ", {
        expiresIn : "1m"
    });
};

export { credentials_valid, credentials_invalid, generateToken };
