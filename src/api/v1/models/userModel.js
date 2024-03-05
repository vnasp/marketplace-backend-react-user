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
const getUser = async ({ id_user, email, id_user_diff }) => {
    if (!id_user && !email) {
        throw new Error("Required parameters are missing.");
    }

    const user = await getUsers({ id_user, email, id_user_diff });

    return user ? user[0] : false;
};

const getUsers = async ({ id_user, email, id_user_diff }) => {
    try {
        const where = [];
        const values = [];

        let sql = `
            SELECT 
                users.id_user,
                users.firstname,
                users.lastname,
                users.email,
                users.password,
                users.address,
                users.phone,
                users.avatar_url,
                users.id_user_google,
                users.date_add,
                users.date_upd
            FROM
                users`;

        if (id_user) {
            where.push(`(users.id_user = $${values.length + 1})`);
            values.push(id_user);
        }

        if (email) {
            where.push(`(users.email = $${values.length + 1})`);
            values.push(email);
        }

        if (id_user_diff) {
            where.push(`(users.id_user != $${values.length + 1})`);
            values.push(id_user_diff);
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
const createUser = async ({
    firstname,
    lastname,
    email,
    password,
    address,
    phone,
    avatar_url,
    id_user_google,
}) => {
    if (!firstname || !lastname || !email || !password) {
        throw new Error("Required parameters are missing.");
    }

    try {
        const sql = `
            INSERT INTO users 
                (firstname, lastname,
                 email, password,
                 address, phone,
                 avatar_url,
                 id_user_google,
                 date_add, date_upd) 
            VALUES
                ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP AT TIME ZONE 'UTC', CURRENT_TIMESTAMP AT TIME ZONE 'UTC') 
            RETURNING *`;

        const result = await pool.query(sql, [
            firstname,
            lastname,
            email,
            bcript.hashSync(password),
            address,
            phone,
            avatar_url,
            id_user_google || null,
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

const editUser = async ({
    id_user,
    firstname,
    lastname,
    email,
    password,
    address,
    phone,
    avatar_url,
    id_user_google,
    date_upd,
}) => {
    if (!id_user) {
        throw new Error("Required parameters are missing.");
    }

    try {
        const set = [];
        const values = [id_user];
        const where = [`(users.id_user = $1)`];

        if (firstname) {
            set.push(`firstname = $${values.length + 1}`);
            values.push(firstname);
        }

        if (lastname) {
            set.push(`lastname = $${values.length + 1}`);
            values.push(lastname);
        }

        if (email) {
            set.push(`email = $${values.length + 1}`);
            values.push(email);
        }

        if (password) {
            set.push(`password = $${values.length + 1}`);
            values.push(bcript.hashSync(password));
        }

        if (address) {
            set.push(`address = $${values.length + 1}`);
            values.push(address);
        }

        if (phone) {
            set.push(`phone = $${values.length + 1}`);
            values.push(phone);
        }

        if (avatar_url) {
            set.push(`avatar_url = $${values.length + 1}`);
            values.push(avatar_url);
        }

        if (id_user_google) {
            set.push(`id_user_google = $${values.length + 1}`);
            values.push(id_user_google);
        }

        if (date_upd) {
            set.push(`date_upd = CURRENT_TIMESTAMP AT TIME ZONE 'UTC'`);
        }

        if (!set.length || !where.length) {
            throw new Error("Required parameters are missing.");
        }

        const sql = `
            UPDATE
                users
            SET
                ${set.join(", ")}
            
            WHERE ${where.join(" AND ")}

            RETURNING *`;

        const result = await pool.query(sql, values);
        return result.rows[0];
    } catch (error) {
        throw new Error(error);
    }
};

export const userModel = { getUser, getUsers, createUser, editUser };
