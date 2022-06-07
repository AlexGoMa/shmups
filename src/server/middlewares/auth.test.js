const { auth } = require("./auth");

const mockId = { name: "Luis", username: "Luis", id: 3342134124124 };

jest.mock("jsonwebtoken", () => ({
  ...jest.requireActual("jsonwebtoken"),
  verify: () => mockId,
}));

describe("Given an auth middleware", () => {
  describe("When it receives a request with a valid token", () => {
    const req = {
      headers: {
        authorization: "Bearer ",
      },
    };

    test("Then the 'next' function should be invoked", () => {
      const next = jest.fn();

      auth(req, null, next);

      expect(next).toHaveBeenCalled();
    });

    test("Then it should add user id provided by the token to the request", () => {
      const next = () => {};

      auth(req, null, next);

      expect(req).toHaveProperty("userId", mockId);
    });
  });
});
