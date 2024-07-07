import { describe, it, expect, beforeEach, vi } from "vitest";
import request from "supertest";
import express from "express";
import Organisation from "../models/organisationModel.js";
const { getOrganisation } = require("../controllers/organisationController.js");

const app = express();
app.use(express.json());

app.get("/organisation/:orgId", (req, res) => {
  req.user = { userId: "12345", email: "test@example.com" };
  getOrganisation(req, res);
});

vi.mock("../models/organisationModel.js");

describe("Organisation Access", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should not allow users to see data from organisations they don't have access to", async () => {
    Organisation.findOne = vi.fn().mockResolvedValue({
      toJSON: () => ({
        orgId: "1",
        name: "Test Org",
        description: "Test Description",
        Users: [
          { userId: "54321", email: "another@example.com" },
          { userId: "12345", email: "test@example.com" },
        ],
      }),
    });

    const response = await request(app).get("/organisation/1");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("Organisation retrieved");
    expect(response.body.data.Users).toHaveLength(2);

    const user = response.body.data.Users.find((u) => u.userId === "12345");
    expect(user).toBeDefined();
    expect(user.password).toBeUndefined();
    expect(user.UserOrganisation).toBeUndefined();
  });

  it("should return an error if the user does not belong to the organisation", async () => {
    Organisation.findOne.mockResolvedValue({
      toJSON: () => ({
        orgId: "1",
        name: "Test Org",
        description: "Test Description",
        Users: [{ userId: "54321", email: "another@example.com" }],
      }),
    });

    const response = await request(app).get("/organisation/1");

    expect(response.status).toBe(400);
    expect(response.body.status).toBe("Bad Request");
    expect(response.body.message).toBe("Client error");
  });

  it("should return an error if the organisation does not exist", async () => {
    Organisation.findOne.mockResolvedValue(null);

    const response = await request(app).get("/organisation/1");

    expect(response.status).toBe(400);
    expect(response.body.status).toBe("Bad Request");
    expect(response.body.message).toBe("Client error");
  });
});
