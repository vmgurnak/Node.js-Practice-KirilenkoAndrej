import Joi from 'joi';

export const addProductShema = Joi.object({
  name: Joi.string().required().min(2).max(10),
  price: Joi.number().required(),
});

export const updateProductShema = Joi.object({
  name: Joi.string().min(2).max(10),
  price: Joi.number(),
});

export const saleProductShema = Joi.object({
  sale: Joi.number().required().min(0).max(100),
});
