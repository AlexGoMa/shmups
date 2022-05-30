const { generalError, notFoundError } = require("./errors");

describe("Given a notFoundError middleware function", () => {
  describe("When it's invoked", () => {
    test("Then it should call the customError function with an error", () => {
      const customErrorFunction = jest.fn();
      const error = new Error();

      notFoundError(null, null, customErrorFunction);

      expect(customErrorFunction).toHaveBeenCalledWith(error);
    });
  });
});

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
