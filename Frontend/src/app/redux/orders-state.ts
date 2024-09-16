import { OrderModel } from '../models/order-model';

// Orders State: 
export class OrdersState {
    public orders: OrderModel[] = [];
}

// Order Action Types:
export enum OrderActionType {
    FetchOrders = "FetchOrders",
    AddOrder = "AddOrder"
}

// Order Action: 
export interface OrderAction {
    type: OrderActionType;
    payload: any;
}

// Order Action Creators: 
export function fetchOrderAction(order: OrderModel[]): OrderAction {
    return { type: OrderActionType.FetchOrders, payload: order };
}
export function addOrder(order: OrderModel): OrderAction {
    return { type: OrderActionType.AddOrder, payload: order };
}


// Orders Reducer:
export function ordersReducer(currentState: OrdersState = new OrdersState(), action: OrderAction): OrdersState {

    const newState = { ...currentState };

    switch (action.type) {
        case OrderActionType.FetchOrders: 
            newState.orders = action.payload;
            break;
        case OrderActionType.AddOrder: 
            newState.orders.push(action.payload);
            break;
    }

    return newState;
}