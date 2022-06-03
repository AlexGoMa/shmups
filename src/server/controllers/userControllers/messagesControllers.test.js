const getMessages = require("./messagesControllers");
const Message = require("../../../../database/models/Message");
const mockedMessages = require("../../mocks/messages/messages");

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
