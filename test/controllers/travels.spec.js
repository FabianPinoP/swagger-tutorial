import request from "supertest";
import app from "../../server.js";
import { generateToken } from "../utils.js/login.js";
import { faker } from "@faker-js/faker";
import { createTravel } from "../../src/api/v1/models/travelModel.js";

describe("travels controller", () => {
  describe("GET /api/v1/travels with valid params", () => {
    const token = generateToken();
    it("should return all travels", async () => {
      const response = await request(app)
        .get("/api/v1/travels")
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
    });

    it("the response with travels key", async () => {
      const response = await request(app)
        .get("/api/v1/travels")
        .set("Authorization", `Bearer ${token}`);
      expect(response.body).toHaveProperty("travels");
    });

    it("is instance of array", async () => {
      const response = await request(app)
        .get("/api/v1/travels")
        .set("Authorization", `Bearer ${token}`);
      const { travels } = response.body;
      expect(travels).toBeInstanceOf(Array);
    });
  });

  describe("GET /api/v1/travels with invalid params", () => {
    it("return 401 with invalid token", async () => {
      const token = faker.string.alphanumeric();
      const response = await request(app)
        .get("/api/v1/travels")
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(401);
    });

    it("return message with invalid token", async () => {
      const token = faker.string.alphanumeric();
      const response = await request(app)
        .get("/api/v1/travels")
        .set("Authorization", `Bearer ${token}`);
      expect(response.body.error).toBe("el token no es valido");
    });

    it("return 401 with token empty", async () => {
      const token = null;
      const response = await request(app)
        .get("/api/v1/travels")
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(401);
    });

    it("return message", async () => {
      const response = await request(app).get("/api/v1/travels");
      expect(response.body.error).toBe("el token debe estar presente");
    });
  });

  describe("POST /api/v1/travels create travels with valid params", () => {
    const payload = {
      travel: {
        destino: faker.location.country(),
        presupuesto: faker.commerce.price({ min: 100, max: 200, dec: 0 }),
      },
    };
    it("return 201 ", async () => {
      const response = await request(app).post("/api/v1/travels").send(payload);
      expect(response.statusCode).toBe(201);
    });

    it("return travel", async () => {
      const response = await request(app).post("/api/v1/travels").send(payload);
      expect(response.body).toHaveProperty("travel");
    });

    it("return instance of object", async () => {
      const response = await request(app).post("/api/v1/travels").send(payload);
      const { travel } = response.body;
      expect(travel).toBeInstanceOf(Object);
    });
  });

  describe("POST /api/v1/travels create travels with invalid params", () => {
    const payload = {
      travel: {
        destino: faker.location.country(),
        presupuesto: faker.commerce.price(), // invalid type
      },
    };
    it("return 400 with invalid type price", async () => {
      const response = await request(app).post("/api/v1/travels").send(payload);
      expect(response.statusCode).toBe(400);
    });

    it("return message", async () => {
      const response = await request(app).post("/api/v1/travels").send(payload);
      expect(response.body.error).toBe("el tipo de dato no corresponde");
    });
  });

  describe("PUT /api/v1/travels update travels with valid params", () => {
    let existingTravelId;
    beforeEach(async () => {
      const payload = {
        travel: {
          destino: faker.location.country(),
          presupuesto: faker.commerce.price({ min: 100, max: 200, dec: 0 }),
        },
      };
      const travel = await createTravel(payload.travel); // asumiendo que existe un travel con id 6 de lo contrario deberiamos crear uno antes con beforeEach
      existingTravelId = travel.id;
    });
    const data = {
      travel: {
        destino: faker.location.country(),
        presupuesto: faker.commerce.price({ min: 100, max: 200, dec: 0 }),
      },
    };
    it("return 200", async () => {
      const response = await request(app)
        .put(`/api/v1/travels/${existingTravelId}`)
        .send(data);
      expect(response.statusCode).toBe(200);
    });

    it("return travel", async () => {
      const response = await request(app)
        .put(`/api/v1/travels/${existingTravelId}`)
        .send(data);
      expect(response.body).toHaveProperty("travel");
    });

    it("return instance of object", async () => {
      const response = await request(app)
        .put(`/api/v1/travels/${existingTravelId}`)
        .send(data);
      const { travel } = response.body;
      expect(travel).toBeInstanceOf(Object);
    });

    it("return object with id eq existingTravelId", async () => {
      const response = await request(app)
        .put(`/api/v1/travels/${existingTravelId}`)
        .send(data);
      const { travel } = response.body;
      expect(travel.id).toEqual(existingTravelId);
    });
  });
});
