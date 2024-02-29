import pool from "../../../../config/database/connection.js";
import bcript from "bcryptjs";

/*
request
id_user | email

response
{
  "firstname": "Amanda",
  "lastname": "Fuentes",
  "email": "amanda.fuentes@example.com",
  "password": "password",
  "address": "Avenida del Sol 1258",
  "phone": "56912345678",
  "avatar": "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg",
  "id_user_google": 1,
  "date_add": "2024-02-14T16:00:00.000Z",
  "date_upd": "2024-02-14T16:00:00.000Z"
}
 */
const getUser = async ({ email }) => {
    if (!email) {
        throw new Error("Email is required");
    }

    const user = await getUsers({ email });

    return user ? user[0] : false;
};

const getUsers = async ({ email }) => {
    try {
        const where = []
        const values = [];

        let sql = `
            SELECT 
                id_user,
                email,
                password
            FROM
                users`;

        if (email) {
            where.push(`email = $${values.length + 1}`);
            values.push(email);
        }

        if (where.length) {
            sql += ` WHERE ${where.join(" AND ")}`;
        }

        const users = await pool.query(sql, values);
        
        return users.rows;
    } catch (error) {
        throw new Error(error.message);
    }
};

/*
request
{
  "user": {
    "firstname": "Amanda",
    "lastname": "Fuentes",
    "email": "amanda.fuentes@example.com",
    "password": "password",
    "address": "Avenida del Sol 1258",
    "phone": "56912345678",
    "avatar": "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg",
    "id_user_google": 1,
    "date_add": "2024-02-14T16:00:00.000Z",
    "date_upd": "2024-02-14T16:00:00.000Z"
  }
}

response
{
  "firstname": "Amanda",
  "lastname": "Fuentes",
  "email": "amanda.fuentes@example.com",
  "password": "password",
  "address": "Avenida del Sol 1258",
  "phone": "56912345678",
  "avatar": "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg",
  "id_user_google": 1,
  "date_add": "2024-02-14T16:00:00.000Z",
  "date_upd": "2024-02-14T16:00:00.000Z"
}
*/
const createUser = async ({ email, password }) => {
    if (!email || !password) {
        throw new Error("Required parameters are missing");
    }

    try {
        const sql = "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *";

        const result = await pool.query(sql, [
            email,
            bcript.hashSync(password)
        ]);

        return result.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

/*
::editUser()

request
id_user

response
{
  "firstname": "Amanda",
  "lastname": "Fuentes",
  "email": "amanda.fuentes@example.com",
  "password": "password",
  "address": "Avenida del Sol 1258",
  "phone": "56912345678",
  "avatar": "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg",
  "id_user_google": 1,
  "date_add": "2024-02-14T16:00:00.000Z",
  "date_upd": "2024-02-14T16:00:00.000Z"
}
*/

export const usersModel = { getUser, getUsers, createUser };
