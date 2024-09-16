import { UploadedFile } from "express-fileupload";
import Joi from "joi";

class ProductModel {
    public productId: number;
    public productName: string;
    public categoryId: number;
    public price: number;
    public imageName: string;
    public image: UploadedFile;

    public constructor(product: ProductModel) {
        this.productId = product.productId;
        this.productName = product.productName;
        this.categoryId = product.categoryId;
        this.price = product.price;
        this.imageName = product.imageName;
        this.image = product.image;
    }

    private static postValidationSchema = Joi.object ({
        productId: Joi.forbidden(),
        productName: Joi.string().required().min(2).max(30),
        categoryId: Joi.number().required().min(1),
        price: Joi.number().required().min(1).max(200),
        imageName: Joi.string().optional().min(10).max(65),
        image: Joi.object().optional()
    });

    private static putValidationSchema = Joi.object ({
        productId: Joi.number().required().integer().min(1),
        productName: Joi.string().required().min(2).max(30),
        categoryId: Joi.number().required().min(1),
        price: Joi.number().required().min(1).max(200),
        imageName: Joi.string().optional().min(10).max(65),
        image: Joi.object().optional()
    });

    private static patchValidationSchema = Joi.object ({
        productId: Joi.number().required().integer().min(1),
        productName: Joi.string().optional().min(2).max(30),
        categoryId: Joi.number().optional().min(1),
        price: Joi.number().optional().min(1).max(200),
        imageName: Joi.string().optional().min(10).max(65),
        image: Joi.object().optional()
    });

    public validatePost(): string {
        const result = ProductModel.postValidationSchema.validate(this, {abortEarly: false});
        return result.error?.message;
    }

    public validatePut(): string {
        const result = ProductModel.putValidationSchema.validate(this, {abortEarly: false} );
        return result.error?.message;
    }

    public validatePatch(): string {
        const result = ProductModel.patchValidationSchema.validate(this, {abortEarly: false} );
        return result.error?.message;
    }
}

export default ProductModel;
