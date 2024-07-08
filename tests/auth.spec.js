import { describe, it, expect, beforeEach, beforeAll, afterAll } from "vitest";
import request from "supertest";
import app from "../app.js";
import User from "../models/userModel.js";
import Organisation from "../models/organisationModel.js";
import sequelize from "../sync.js";

beforeAll(async () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Database connected!");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Auth Controller E2E", () => {
  beforeEach(async () => {
    await User.destroy({ where: {} });
    await Organisation.destroy({ where: {} });
  });

  describe("Register", () => {
    it("should register user successfully with default organisation", async () => {
      const response = await request(app).post("/api/auth/register").send({
        firstName: "Steve",
        lastName: "Doe",
        email: "steve.doe@example.com",
        password: "password",
        phone: "1234567890",
      });

      expect(response.status).toBe(201);
      expect(response.body.status).toBe("success");
      expect(response.body.message).toBe("Registration successful");
      expect(response.body.data.accessToken).toBeDefined();
      expect(response.body.data.user.email).toBe("steve.doe@example.com");
      expect(response.body.data.user.phone).toBe("1234567890");
      expect(response.body.data.user.firstName).toBe("Steve");
      expect(response.body.data.user.lastName).toBe("Doe");
      expect(response.body.data.user.password).toBeUndefined();

      const org = await Organisation.findOne({
        where: { name: "Steve's Organisation" },
      });
      expect(org).toBeDefined();
    });

    it("should fail if required fields are missing", async () => {
      const response = await request(app).post("/api/auth/register").send({
        lastName: "Doe",
        email: "john.doe@example.com",
      });

      expect(response.status).toBe(422);
      expect(response.body.errors).toEqual(
        expect.arrayContaining([
          { field: "password", message: "Password missing" },
          { field: "firstName", message: "firstName missing" },
          { field: "phone", message: "phone missing" },
        ])
      );
    });

    it("should fail if there is a duplicate email", async () => {
      await User.create({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: "password",
        phone: "1234567890",
      });

      const response = await request(app).post("/api/auth/register").send({
        firstName: "Jane",
        lastName: "Smith",
        email: "john.doe@example.com",
        password: "password",
        phone: "0987654321",
      });

      expect(response.status).toBe(404);
      expect(response.body.status).toBe("Bad request");
      expect(response.body.message).toBe("Registration unsuccessful");
      expect(response.body.statusCode).toBe(400);
    });
  });

  describe("Login", () => {
    it("should log the user in successfully", async () => {
      const mockUser = await User.create({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: "password",
        phone: "1234567890",
      });

      const response = await request(app).post("/api/auth/login").send({
        email: "john.doe@example.com",
        password: "password",
      });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.message).toBe("Login successful");
      expect(response.body.data.accessToken).toBeDefined();
      expect(response.body.data.user.email).toBe("john.doe@example.com");
    });

    it("should fail with invalid credentials", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: "john.doe@example.com",
        password: "wrongpassword",
      });

      expect(response.status).toBe(401);
      expect(response.body.status).toBe("Bad request");
      expect(response.body.message).toBe("Authentication failed");
      expect(response.body.statusCode).toBe(401);
    });
  });
});
