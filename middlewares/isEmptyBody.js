import { createError } from '../helpers/createError.js';

export function isEmptyBody(req, res, next) {
  try {
    if (Object.keys(req.body).length === 0) {
      throw createError(400, 'Body must have at least one field');
    }
    next();
  } catch (error) {
    next(error);
  }
}
