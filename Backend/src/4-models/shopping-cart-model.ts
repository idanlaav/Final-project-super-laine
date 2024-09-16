import Joi from "joi";

class ShoppingCartModel {
    public shoppingCartId: number;
    public userId: number;
    public productionDate: string;
    public status: string;

    public constructor(shoppingCart: ShoppingCartModel) {
        this.shoppingCartId = shoppingCart.shoppingCartId;
        this.userId = shoppingCart.userId;
        this.productionDate = shoppingCart.productionDate;
        this.status = shoppingCart.status;
    }

    private static postValidationSchema = Joi.object ({
        shoppingCartId: Joi.forbidden(),
        userId: Joi.number().required().min(1),
        productionDate: Joi.string().required().min(6).max(15),
        status: Joi.string().optional().min(4).max(5),
    });

    private static putValidationSchema = Joi.object ({
        shoppingCartId: Joi.number().required().integer().min(1),
        userId: Joi.number().required().min(1),
        productionDate: Joi.string().required().min(6).max(25),
        status: Joi.string().optional().min(4).max(5),
    });

    private static patchValidationSchema = Joi.object ({
        shoppingCartId: Joi.number().required().integer().min(1),
        userId: Joi.number().optional().min(1),
        productionDate: Joi.string().optional().min(6).max(25),
        status: Joi.string().optional().min(4).max(5),
    });

    public validatePost(): string {
        const result = ShoppingCartModel.postValidationSchema.validate(this, {abortEarly: false});
        return result.error?.message;
    }

    public validatePut(): string {
        const result = ShoppingCartModel.putValidationSchema.validate(this, {abortEarly: false} );
        return result.error?.message;
    }

    public validatePatch(): string {
        const result = ShoppingCartModel.patchValidationSchema.validate(this, {abortEarly: false} );
        return result.error?.message;
    }
}

export default ShoppingCartModel;
