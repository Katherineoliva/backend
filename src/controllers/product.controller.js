import { saveProduct } from "../services/product.service.js";
import createHttpError from "http-errors";
import { productErrorCodes } from "../utils/errorCodes/product.errorCodes.js";

export const createProductController = async (req, res, next) => {
  try {
    const product = req.body;
    const newProduct = await saveProduct(product);
    res.status(201).json(newProduct);
  } catch (e) {
    switch (e.code) {
      case productErrorCodes.PRODUCT_ERROR:
        next(createHttpError(500, "Product not created"));
        break;
      default:
        next(e);
    }
    console.log(e)
  }
};
