import request from "supertest";
import app from "../server";
import { credentials_valid, credentials_invalid, generateToken } from "./utils/data.js";

describe("Mi Market Latino", () => {
    it("GET /users : returns code 200 and array", async () => {
        const response = await request(app)
            .get("/users")
            .send();
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it("POST /login with valid credentials : returns object", async () => {
        const response = await request(app)
            .post("/login")
            .send(credentials_valid);
        
        expect(response.body).toBeInstanceOf(Object);
    });

    it("POST /login with invalid credentials : returns code 400", async () => {
        const response = await request(app)
            .post("/login")
            .send(credentials_invalid);
        
        expect(response.statusCode).toBe(400);
    });
});
