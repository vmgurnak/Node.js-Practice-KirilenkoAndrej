import { createError } from '../helpers/createError.js';

export function validateBody(shema) {
  return function (req, res, next) {
    try {
      const { error } = shema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        throw createError(400, error.message);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}
