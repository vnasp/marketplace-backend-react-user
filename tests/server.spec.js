import request from "supertest";
import server from "../server";
import { credentials_valid, credentials_invalid, generateToken } from "./utils/data.js";

describe("Mi Market Latino", () => {
    it("GET /users : returns code 200 and object", async () => {
        const response = await request(server)
            .get("/users")
            .set("Authorization", `Bearer: ${generateToken()}`)
            .send();
        
        expect(response.statusCode).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
    });

    it("POST /login with valid credentials : returns code 201 and object", async () => {
        const response = await request(server)
            .post("/login")
            .send(credentials_valid);
        
        expect(response.statusCode).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
    });

    it("POST /login with invalid credentials : returns code 400", async () => {
        const response = await request(server)
            .post("/login")
            .send(credentials_invalid);
        
        expect(response.statusCode).toBe(400);
    });
});
