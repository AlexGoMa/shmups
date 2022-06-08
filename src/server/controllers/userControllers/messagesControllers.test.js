const {
  getMessages,
  getUserMessages,
  deleteMessage,
} = require("./messagesControllers");
const Message = require("../../../../database/models/Message");
const { mockedMessages } = require("../../mocks/messages/messages");

describe("Given a getMessagesControllers middleware", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  describe("When it's invoked with a request", () => {
    test("Then it should return a response with a 200 status and a message in the body", async () => {
      Message.find = jest.fn().mockResolvedValue(mockedMessages);

      const expectedStatus = 200;

      await getMessages(null, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith({ messages: mockedMessages });
    });
  });

  describe("When it's invoked with a request and the DB is empty", () => {
    test("Then it should return an error 400 and a message 'No messages in the DB", async () => {
      Message.find = jest.fn().mockResolvedValue("");
      const next = jest.fn();

      await getMessages(null, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a deleteMessage middleware ", () => {
  describe("When it's invoked with a request", () => {
    test("Then it should return a response with a 200 status and the object in json", async () => {
      const expectedJson = { message: "Message deleted correctly!" };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(expectedJson),
      };

      const req = { params: { id: "629cbc014bd00090e394e66b" } };
      Message.findByIdAndDelete = jest.fn().mockResolvedValue(expectedJson);

      const expectedStatus = 200;

      await deleteMessage(req, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedJson);
    });
  });

  describe("When it's called with a request and the id doesn't exist in the BD", () => {
    test("Then it should call the next function 'with an error 400' ", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const req = { params: { id: "629cbc014bd00090e394e66b" } };
      const next = jest.fn();

      Message.findByIdAndDelete = jest.fn().mockResolvedValue(false);

      await deleteMessage(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it's invoked with a bad request", () => {
    test("Then it should call the next function 'with an error 500 '", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const next = jest.fn();

      await deleteMessage(null, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a getUserMessages controller", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("When it's invoked with a request", () => {
    test("Then it should return a 200 and messages in the body", async () => {
      const req = { body: { id: "121212" } };

      Message.find = jest.fn(() => ({
        populate: jest.fn().mockResolvedValue(mockedMessages),
      }));

      const expectedStatus = 200;

      await getUserMessages(req, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith({ messages: mockedMessages });
    });
  });
});
