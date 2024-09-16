import Joi from "joi";

class TrolleyItemModel {
    public trolleyItemId: number;
    public productId: number;
    public stock: number;
    public totalPrice: number;
    public shoppingCartId: number;
    public productName: string;
    public imageName: string;
    public image: File;
    public userId: number;
    public status: string;

    public constructor(trolleyItem: TrolleyItemModel) {
        this.trolleyItemId = trolleyItem.trolleyItemId;
        this.productId = trolleyItem.productId;
        this.stock = trolleyItem.stock;
        this.totalPrice = trolleyItem.totalPrice;
        this.shoppingCartId = trolleyItem.shoppingCartId;
        this.productName = trolleyItem.productName;
        this.imageName = trolleyItem.imageName;
        this.image = trolleyItem.image;
        this.userId = trolleyItem.userId;
        this.status = trolleyItem.status;
    }

    private static postValidationSchema = Joi.object ({
        trolleyItemId: Joi.forbidden(),
        productId: Joi.number().required().min(1),
        stock: Joi.number().required().min(1).max(11),
        totalPrice: Joi.number().required().min(1),
        shoppingCartId: Joi.number().required().min(1),
        productName: Joi.number().optional().min(2).max(50),
        imageName: Joi.string().optional().min(10).max(65),
        image: Joi.object().optional(),
        userId: Joi.number().optional().min(1),
        status: Joi.string().optional().min(4).max(5)
    });

    private static putValidationSchema = Joi.object ({
        trolleyItemId: Joi.number().required().integer().min(1),
        productId: Joi.number().required().min(1),
        stock: Joi.number().required().min(1).max(11),
        totalPrice: Joi.number().required().min(1),
        shoppingCartId: Joi.number().required().min(1),
        productName: Joi.number().optional().min(2).max(50),
        imageName: Joi.string().optional().min(10).max(65),
        image: Joi.object().optional(),
        userId: Joi.number().optional().min(1),
        status: Joi.string().optional().min(4).max(5)
    });

    private static patchValidationSchema = Joi.object ({
        trolleyItemId: Joi.number().required().integer().min(1),
        productId: Joi.number().optional().min(1),
        stock: Joi.number().optional().min(1).max(11),
        totalPrice: Joi.number().optional().min(1),
        shoppingCartId: Joi.number().optional().min(1),
        productName: Joi.number().optional().min(2).max(50),
        imageName: Joi.string().optional().min(10).max(65),
        image: Joi.object().optional(),
        userId: Joi.number().optional().min(1),
        status: Joi.string().optional().min(4).max(5)
    });

    public validatePost(): string {
        const result = TrolleyItemModel.postValidationSchema.validate(this, {abortEarly: false});
        return result.error?.message;
    }

    public validatePut(): string {
        const result = TrolleyItemModel.putValidationSchema.validate(this, {abortEarly: false} );
        return result.error?.message;
    }

    public validatePatch(): string {
        const result = TrolleyItemModel.patchValidationSchema.validate(this, {abortEarly: false} );
        return result.error?.message;
    }
}

export default TrolleyItemModel;
