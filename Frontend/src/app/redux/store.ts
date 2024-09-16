import { combineReducers, createStore } from "redux";
import { authReducer } from "./auth-state";
import { categoriesReducer } from "./categories-state";
import { ordersReducer } from "./orders-state";
import { productsReducer } from "./products-state";
import { shoppingCartReducer } from "./shopping-cart-state";
import { trolleyItemsReducer } from "./trolley-items-state";


const reducers = combineReducers({
    authState: authReducer,
    categoriesState: categoriesReducer,
    ordersState: ordersReducer,
    productsState: productsReducer,
    shoppingCartState: shoppingCartReducer,
    trolleyItemsState: trolleyItemsReducer
});

const store = createStore(reducers);

export default store;