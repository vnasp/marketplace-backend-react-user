import "dotenv/config";
import jwt from "jsonwebtoken";
import { faker } from "@faker-js/faker";

const credentialsValid = {
    id_user  : 1,
    email    : "jlo@mimarketlatino.com",
    password : "1234"
};

const credentialsInvalid = {
    email    : faker.internet.email(),
    password : faker.internet.password()
};

const userNew = {
    email     : faker.internet.email(),
    password  : faker.internet.password(),
    firstname : faker.person.firstName(),
    lastname  : faker.person.lastName()
};

const userEdit = {
    phone: faker.phone.number()
};

const generateToken = () => {
    return jwt.sign({ id_user: credentialsValid.id_user }, process.env.JWT_SECRET || "az_AZ", {
        expiresIn : "1m"
    });
};

export { 
    credentialsValid, credentialsInvalid, 
    userNew, userEdit,
    generateToken
};
