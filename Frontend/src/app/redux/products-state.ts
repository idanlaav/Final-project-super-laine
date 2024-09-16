import { ProductModel } from 'src/app/models/product-model';

// Products State: 
export class ProductsState {
    public products: ProductModel[] = [];
}

// Product Action Types:
export enum ProductActionType {
    FetchProducts = "FetchProducts",
    AddProduct = "AddProduct",
    UpdateProduct = "UpdateProduct",
}

// Product Action: 
export interface ProductAction {
    type: ProductActionType;
    payload: any;
}

// Product Action Creators: 
export function fetchProductsAction(products: ProductModel[]): ProductAction {
    return { type: ProductActionType.FetchProducts, payload: products };
}
export function addProductAction(product: ProductModel): ProductAction {
    return { type: ProductActionType.AddProduct, payload: product };
}
export function updateProductAction(product: ProductModel): ProductAction {
    return { type: ProductActionType.UpdateProduct, payload: product };
}

// Products Reducer:
export function productsReducer(currentState: ProductsState = new ProductsState(), action: ProductAction): ProductsState {

    const newState = { ...currentState };

    switch (action.type) {
        case ProductActionType.FetchProducts: // Here payload is all products (ProductModel[])
            newState.products = action.payload;
            break;
        case ProductActionType.AddProduct: // Here payload is the added product (ProductModel)
            newState.products.push(action.payload);
            break;
        case ProductActionType.UpdateProduct: { // Here payload is the updated product (ProductModel)
            const indexToUpdate = newState.products.findIndex(p => p.productId === action.payload.productId);
            if (indexToUpdate >= 0) {
                newState.products[indexToUpdate] = action.payload;
            }
            break;
        }
    }

    return newState;
    
}