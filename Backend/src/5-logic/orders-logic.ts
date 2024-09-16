import dal from "../2-utils/dal";
import OrderModel from "../4-models/order-model";
import { ValidationError } from "../4-models/errors-model";


async function getAllOrders(): Promise<OrderModel[]> {
    const sql = `SELECT * FROM orders`;
    const orders = await dal.execute(sql);
    return orders;
}

async function addOrder(order: OrderModel): Promise<OrderModel> {
    const errors = order.validatePost();
    if (errors) {
        throw new ValidationError(errors);
    }
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const myDate = yyyy + '-' + mm + '-' + dd;
    order.orderDate = myDate.toString();
    const sql = "INSERT INTO orders VALUES(DEFAULT, ?, ?, ?, ?, ?, ?, ?)";
    const values = [order.userId, order.shoppingCartId, order.totalPrice, order.deliveryCity, order.deliveryStreet, order.deliveryDate, order.orderDate, order.creditCard];
    const addedOrder = await dal.execute(sql, values);
    return addedOrder;
}


export default {
    getAllOrders,
    addOrder
}