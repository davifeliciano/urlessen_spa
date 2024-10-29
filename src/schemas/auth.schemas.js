import Joi from "joi";

const messages = {
  username:
    '"username" must have between 2 and 32 characters (letters, numbers, dots, - and _ are allowed)',
  password:
    '"password" must have at least 12 characters, at least one letter, one number and one special character',
};

const nameSchema = Joi.string().trim().max(255).required();

const usernameSchema = Joi.string()
  .pattern(/^[\w.-_]{3,32}$/)
  .message(messages.username)
  .required();

const passwordSchema = Joi.string()
  .pattern(/^(?=.+[A-Za-z])(?=.+\d)(?=.+[^a-zA-Z\d]).{12,}$/)
  .message(messages.password)
  .required();

const loginSchema = Joi.object({
  username: usernameSchema,
  password: passwordSchema,
});

const signUpSchema = Joi.object({
  username: usernameSchema,
  password: passwordSchema,
  passwordCheck: Joi.valid(Joi.ref("password")).messages({
    "any.only": "The passwords do not match",
  }),
});

export { nameSchema, signUpSchema, loginSchema };
