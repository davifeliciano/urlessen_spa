import Joi from "joi";

const title = Joi.string().trim().max(64).required();
const description = Joi.string().trim().max(256).required();

const urlCreationSchema = Joi.object({
  description,
  title,
  longUrl: Joi.string().trim().uri().required(),
});

const urlPatchSchema = Joi.object({
  title,
  description,
});

export { urlCreationSchema, urlPatchSchema };
