import { createError } from './createError.js';

export const isNotProduct = (product) => {
  if (product === null) {
    throw createError(404, 'Product not found');
  }
};
