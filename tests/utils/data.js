import "dotenv/config";
import jwt from "jsonwebtoken";
import { faker } from "@faker-js/faker";

//login
const credentialsValid = {
    id_user  : 1,
    email    : "jlo@mimarketlatino.com",
    password : "1234"
};

const credentialsInvalid = {
    email    : faker.internet.email(),
    password : faker.internet.password()
};

//users
const userNew = {
    email     : faker.internet.email(),
    password  : faker.internet.password(),
    firstname : faker.person.firstName(),
    lastname  : faker.person.lastName()
};

const userEdit = {
    phone: faker.phone.number()
};

const userGoogle = {
    email    : "mimarketlatino@gmail.com",
    password : "migentelatino"
};

//categories
const categories = ['Plantas', 'Manualidades', 'Música', 'Bienestar'];

//products
const productValid = {
    id_product: 1
};
const productInvalid = {
    id_product: -1
};

const productNew = {
    id_user     : 1,
    name        : faker.commerce.product(),
    price       : Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000,
    description : faker.commerce.productDescription(),
    image_url   : faker.internet.url(),
    category    : categories[Math.floor(Math.random() * categories.length)]
};

const generateToken = () => {
    return jwt.sign({ id_user: credentialsValid.id_user }, process.env.JWT_SECRET || "az_AZ", {
        expiresIn : "1m"
    });
};

export { 
    credentialsValid, credentialsInvalid, 
    userNew, userEdit, userGoogle,
    productValid, productInvalid, productNew,
    generateToken
};
