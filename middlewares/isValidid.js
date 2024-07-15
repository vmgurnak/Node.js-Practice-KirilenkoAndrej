import { isValidObjectId } from 'mongoose';
import { createError } from '../helpers/createError.js';

// export const isValidId = (req, res, next) => {
//   const { id } = req.params;
//   if (!isValidObjectId(id)) {
//     return res.status(400).send({ message: `ID ${id} is not valid` });
//   }
//   next();
// };

export const isValidId = (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      throw createError(400, `ID ${id} is not valid`);
    }

    next();
  } catch (error) {
    next(error);
  }
};
