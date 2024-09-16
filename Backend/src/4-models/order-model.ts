import Joi from "joi";

class OrderModel {
    public orderId: number;
    public userId: number;
    public shoppingCartId: number;
    public totalPrice: number;
    public deliveryCity: string;
    public deliveryStreet: string;
    public deliveryDate: string;
    public orderDate: string;
    public creditCard: string;

    public constructor(order: OrderModel) {
        this.orderId = order.orderId;
        this.userId = order.userId;
        this.shoppingCartId = order.shoppingCartId;
        this.totalPrice = order.totalPrice;
        this.deliveryCity = order.deliveryCity;
        this.deliveryStreet = order.deliveryStreet;
        this.deliveryDate = order.deliveryDate;
        this.orderDate = order.orderDate;
        this.creditCard = order.creditCard;
    }

    private static postValidationSchema = Joi.object ({
        orderId: Joi.forbidden(),
        userId: Joi.number().required().min(1),
        shoppingCartId: Joi.number().required().min(1),
        totalPrice: Joi.number().required().min(15),
        deliveryCity: Joi.string().required().min(2).max(5),
        deliveryStreet: Joi.string().required().min(3).max(10),
        deliveryDate: Joi.string().required().min(6).max(15),
        orderDate: Joi.string().optional().min(6).max(15),
        creditCard: Joi.string().required().min(1).max(16),
    });

    private static putValidationSchema = Joi.object ({
        orderId: Joi.number().required().integer().min(1),
        userId: Joi.number().required().min(1),
        shoppingCartId: Joi.number().required().min(1),
        totalPrice: Joi.number().required().min(15),
        deliveryCity: Joi.string().required().min(2).max(5),
        deliveryStreet: Joi.string().required().min(3).max(10),
        deliveryDate: Joi.string().required().min(6).max(15),
        orderDate: Joi.string().required().min(6).max(15),
        creditCard: Joi.string().required().min(1).max(16),
    });

    private static patchValidationSchema = Joi.object ({
        orderId: Joi.number().required().integer().min(1),
        userId: Joi.number().optional().min(1),
        shoppingCartId: Joi.number().optional().min(1),
        totalPrice: Joi.number().optional().min(15),
        deliveryCity: Joi.string().optional().min(2).max(5),
        deliveryStreet: Joi.string().optional().min(3).max(10),
        deliveryDate: Joi.string().optional().min(6).max(15),
        orderDate: Joi.string().optional().min(6).max(15),
        creditCard: Joi.string().optional().min(1).max(16),
    });

    public validatePost(): string {
        const result = OrderModel.postValidationSchema.validate(this, {abortEarly: false});
        return result.error?.message;
    }

    public validatePut(): string {
        const result = OrderModel.putValidationSchema.validate(this, {abortEarly: false} );
        return result.error?.message;
    }

    public validatePatch(): string {
        const result = OrderModel.patchValidationSchema.validate(this, {abortEarly: false} );
        return result.error?.message;
    }
}

export default OrderModel;
