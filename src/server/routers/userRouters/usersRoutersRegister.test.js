const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

const connectDB = require("../../../../database");
const app = require("../..");
const User = require("../../../../database/models/User");

let mongoServer;

const newUserData = {
  name: "Marta",
  username: "Marta",
  password: "1234",
};
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await connectDB(mongoServer.getUri());
});

beforeEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoServer.stop();
  await mongoose.connection.close();
});

describe("Given a POST '/register' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should receive the created user object", async () => {
      const { body } = await request(app)
        .post("/user/register")
        .send(newUserData)
        .expect(201);

      expect(body.username).toBe(newUserData.username);
    });
  });

  describe("When it receives a request to register a username already created", () => {
    test("Then it should receive an error with a 409 in json", async () => {
      await request(app).post("/user/register").send(newUserData);

      const { body } = await request(app)
        .post("/user/register")
        .send(newUserData)
        .expect(409);

      const expectedMessage = "User name already exists";

      expect(body.message).toBe(expectedMessage);
    });
  });
});
