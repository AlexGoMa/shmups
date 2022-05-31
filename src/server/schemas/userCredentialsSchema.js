const { Joi } = require("express-validation");

const credentialsRegisterSchema = {
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

module.exports = credentialsRegisterSchema;
