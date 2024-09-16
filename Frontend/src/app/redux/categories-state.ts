import { CategoryModel } from "../models/category-model";

// Categories State: 
export class CategoriesState {
    public categories: CategoryModel[] = [];
}

// Category Action Types:
export enum CategoryActionType {
    FetchCategories = "FetchCategories",
}

// Category Action: 
export interface CategoryAction {
    type: CategoryActionType;
    payload: any;
}

// Category Action Creators: 
export function fetchCategoryAction(categories: CategoryModel[]): CategoryAction {
    return { type: CategoryActionType.FetchCategories, payload: categories };
}

// Categories Reducer:
export function categoriesReducer(currentState: CategoriesState = new CategoriesState(), action: CategoryAction): CategoriesState {

    const newState = { ...currentState };

    switch (action.type) {
        case CategoryActionType.FetchCategories:
        newState.categories = action.payload;
        break;
    }

    return newState;
}