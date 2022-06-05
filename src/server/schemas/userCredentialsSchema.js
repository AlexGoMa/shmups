const { Joi } = require("express-validation");

const userRegisterSchema = {
  body: Joi.object({
    name: Joi.string()
      .max(20)
      .messages({ message: "Name is required" })
      .required(),
    username: Joi.string()
      .max(20)
      .messages({ message: "Username is required" })
      .required(),
    password: Joi.string()
      .max(12)
      .messages({ message: "Password is required" })
      .required(),
  }),
};

const messageRegisterSchema = {
  body: Joi.object({
    text: Joi.string()
      .max(60)
      .messages({ message: "Text is required" })
      .required(),
    category: Joi.string()
      .max(20)
      .messages({ message: "Category is required" })
      .required(),
  }),
};

module.exports = { userRegisterSchema, messageRegisterSchema };
