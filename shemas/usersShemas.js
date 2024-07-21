import Joi from 'joi';

export const regUserShema = Joi.object({
  name: Joi.string().required().min(2).max(10),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
});

export const logUserShema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});
