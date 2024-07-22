import jwt from 'jsonwebtoken';
import { createError } from '../helpers/createError.js';
import User from '../models/user.js';

export async function auth(req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      throw createError(401, 'Not authorized');
    }
    const [bearer, token] = authorizationHeader.split(' ', 2);
    if (bearer !== 'Bearer' || !token) {
      throw createError(401, 'Not authorized');
    }
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(_id);
    if (user === null || user.token !== token) {
      throw createError(401, 'Not authorized');
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
}
