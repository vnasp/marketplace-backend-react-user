import request from "supertest";
import app from "../../server.js";
import { credentials_valid, credentials_invalid, generateToken } from "../utils/data.js";

describe("Mi Market Latino", () => {
    it("GET /users : returns code 200 and object", async () => {
        const response = await request(app)
            .get(`/api/v1/users/${credentials_valid.id_user}`)
            .set("Authorization", `Bearer: ${generateToken()}`)
            .send();
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });

    it("POST /login with valid credentials : returns code 200 and object", async () => {
        const response = await request(app)
            .post("/api/v1/login")
            .send(credentials_valid);
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });

    it("POST /login with invalid credentials : returns code 400", async () => {
        const response = await request(app)
            .post("/api/v1/login")
            .send(credentials_invalid);
        
        expect(response.statusCode).toBe(400);
    });
});
