import { ShoppingCartModel } from '../models/shopping-cart-model';

// Shopping Cart State: 
export class ShoppingCartState {
    public shoppingCart: ShoppingCartModel[] = [];
}

// Shopping Cart Action Types:
export enum ShoppingCartActionType {
    OpenShoppingCart = "OpenShoppingCart",
    CloseShoppingCart = "CloseShoppingCart",
    AddShoppingCart = "AddShoppingCart",
    UpdateShoppingCart = "UpdateShoppingCart"
}

// Shopping Cart Action: 
export interface ShoppingCartAction {
    type: ShoppingCartActionType;
    payload: any;
}

// Shopping Cart Action Creators: 
export function openShoppingCart(shoppingCart: ShoppingCartModel[]): ShoppingCartAction {
    return { type: ShoppingCartActionType.OpenShoppingCart, payload: shoppingCart };
}
export function closeShoppingCart(shoppingCart: ShoppingCartModel[]): ShoppingCartAction {
    return { type: ShoppingCartActionType.CloseShoppingCart, payload: shoppingCart };
}
export function addShoppingCart(shoppingCart: ShoppingCartModel): ShoppingCartAction {
    return { type: ShoppingCartActionType.AddShoppingCart, payload: shoppingCart };
}
export function updateShoppingCart(shoppingCart: ShoppingCartModel): ShoppingCartAction {
    return { type: ShoppingCartActionType.UpdateShoppingCart, payload: shoppingCart };
}

// Products Reducer:
export function shoppingCartReducer(currentState: ShoppingCartState = new ShoppingCartState(), action: ShoppingCartAction): ShoppingCartState {

    const newState = { ...currentState };

    switch (action.type) {
        case ShoppingCartActionType.OpenShoppingCart:
            newState.shoppingCart = action.payload;
            break;
        case ShoppingCartActionType.CloseShoppingCart:
            newState.shoppingCart = action.payload;
            break;
        case ShoppingCartActionType.AddShoppingCart:
            newState.shoppingCart.push(action.payload);
            break;
        case ShoppingCartActionType.UpdateShoppingCart: {
            const indexToUpdate = newState.shoppingCart.findIndex(s => s.shoppingCartId === action.payload.id);
            if (indexToUpdate >= 0) {
                newState.shoppingCart[indexToUpdate] = action.payload;
            }
            break;
        }
    }

    return newState;
}