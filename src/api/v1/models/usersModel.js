import pool from "../../database/connection.js";
import bcript from "bcryptjs";

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

export const usersModel = { getUser, getUsers, createUser };
