import productSchema from '../models/product.model.js';
import { ServiceError } from '../utils/serviceError.js';
import { productErrorCodes } from '../utils/errorCodes/product.errorCodes.js';
import { addProductToUndertaking } from './undertaking.service.js';
import { saveImages } from '../utils/saveImages.util.js';

export const saveProduct = async (product)=>{
    try {
        const url_image = await saveImages(product.image, 'product');
        product.photos = url_image;

        const newProduct = new productSchema(product);
        if (!newProduct)
            throw new ServiceError(
                "Product not created",
                productErrorCodes.PRODUCT_NOT_CREATED
            );
        await newProduct.save();
        await addProductToUndertaking(product.undertaking, newProduct._id);
        return newProduct;
    } catch (e) {
        throw new ServiceError(
            e.message,
            e.code || productErrorCodes.PRODUCT_ERROR
        );
    }
}