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

afterAll(async () => {
  await User.deleteMany({});
  await mongoServer.stop();
  await mongoose.connection.close();
});

describe("Given a post user/login endpoint ", () => {
  describe("When it receives a request with a correct username and password", () => {
    test("Then it should receive a token", async () => {
      await request(app).post("/user/register").send(newUserData).expect(201);

      const { body } = await request(app)
        .post("/user/login")
        .send(newUserData)
        .expect(200);

      expect(body).toHaveProperty("token");
    });
  });

  describe("When it receives a request with a non existent username", () => {
    test("Then it should return an error 403", async () => {
      const wrongUsername = {
        name: "Luis",
        username: "Luis",
        password: "1234",
      };

      const { body } = await request(app)
        .post("/user/login")
        .send(wrongUsername)
        .expect(403);

      expect(body).toHaveProperty("message");
    });
  });

  describe("When it receibes a request with a wrong password", () => {
    test("Then it should return an error 403", async () => {
      const wrongPassword = {
        name: "Marta",
        username: "Marta",
        password: "5678",
      };

      await request(app).post("/user/login").send(wrongPassword).expect(403);
    });
  });
});
