import { createError } from '../helpers/createError.js';
import product from '../models/product.js';
import Product from '../models/product.js';

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    next(error);
  }
};

export const createProducts = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).send(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteProduct = await Product.findByIdAndDelete(id);
    if (deleteProduct === null) {
      throw createError(404, 'Product not found');
    }

    res.status(200).send(deleteProduct);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updateProduct === null) {
      throw createError(404, 'Product not found');
    }
    res.status(200).send(updateProduct);
  } catch (error) {
    next(error);
  }
};

export const updateSaleProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateSaleProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      projection: { sale: 1 },
    });
    if (updateProduct === null) {
      throw createError(404, 'Product not found');
    }
    res.status(200).send(updateSaleProduct);
  } catch (error) {
    next(error);
  }
};
