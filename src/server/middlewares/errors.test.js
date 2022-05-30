const generalError = require("./errors");

describe("Given a generalError middleware function", () => {
  describe("When it's invoked with an empty error", () => {
    test("Then it should call the response status method with an error 500", () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const expectedError = 500;
      const error = {};

      generalError(error, null, res, null);

      expect(res.status).toHaveBeenCalledWith(expectedError);
    });
  });
});
