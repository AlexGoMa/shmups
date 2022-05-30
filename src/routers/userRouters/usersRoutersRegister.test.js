const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

const connectDB = require("../../../database");
const User = require("../../../database/models/User");
const app = require("../../server");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  await connectDB(mongoServer.getUri());
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoServer.stop();
  await mongoose.connection.close();
});

describe("Given a POST '/register' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should receive the created user object", async () => {
      const newUserData = {
        username: "paco",
        password: "1234",
        name: "paco",
      };

      const { body } = await request(app)
        .post("/user/register")
        .send(newUserData)
        .expect(201);

      expect(body.user).toBe(newUserData.name);
    });
  });
});
