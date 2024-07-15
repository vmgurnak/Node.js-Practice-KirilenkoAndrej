import express from 'express';
import {
  getProducts,
  createProducts,
  deleteProduct,
  updateProduct,
  updateSaleProduct,
} from '../../controllers/productController.js';
import { isValidId } from '../../middlewares/isValidid.js';
import { validateBody } from '../../middlewares/validateBody.js';
import {
  addProductShema,
  saleProductShema,
  updateProductShema,
} from '../../shemas/productsShemas.js';
import { isEmptyBody } from '../../middlewares/isEmptyBody.js';

const productsRouter = express.Router();

productsRouter.get('/', getProducts);
productsRouter.post('/', validateBody(addProductShema), createProducts);
productsRouter.delete('/:id', isValidId, deleteProduct);
productsRouter.patch(
  '/:id',
  isValidId,
  isEmptyBody,
  validateBody(updateProductShema),
  updateProduct
);
productsRouter.patch(
  '/:id/sale',
  isValidId,
  validateBody(saleProductShema),
  updateSaleProduct
);

export default productsRouter;
