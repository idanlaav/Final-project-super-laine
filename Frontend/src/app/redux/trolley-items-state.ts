import { TrolleyItemsModel } from '../models/trolley-items-model';

// Trolley Items State: 
export class TrolleyItemsState {
    public trolleyItems: TrolleyItemsModel[] = [];
}

// Trolley Item Action Types:
export enum TrolleyItemActionType {
    FetchTrolleyItems = "FetchTrolleyItems",
    AddTrolleyItem = "AddTrolleyItem",
    DeleteTrolleyItem = "DeleteTrolleyItem"
}

// Trolley Item Action: 
export interface TrolleyItemAction {
    type: TrolleyItemActionType;
    payload: any;
}

// Trolley Item Action Creators: 
export function fetchTrolleyItems(trolleyItems: TrolleyItemsModel[]): TrolleyItemAction {
    return { type: TrolleyItemActionType.FetchTrolleyItems, payload: trolleyItems };
}
export function addTrolleyItem(trolleyItem: TrolleyItemsModel): TrolleyItemAction {
    return { type: TrolleyItemActionType.AddTrolleyItem, payload: trolleyItem };
}
export function deleteTrolleyItem(trolleyItemId: number): TrolleyItemAction {
    return { type: TrolleyItemActionType.DeleteTrolleyItem, payload: trolleyItemId };
}


// Trolley Items Reducer:
export function trolleyItemsReducer(currentState: TrolleyItemsState = new TrolleyItemsState(), action: TrolleyItemAction): TrolleyItemsState {

    const newState = { ...currentState };

    switch (action.type) {
        case TrolleyItemActionType.FetchTrolleyItems:
            newState.trolleyItems = action.payload;
            break;
        case TrolleyItemActionType.AddTrolleyItem:
            newState.trolleyItems.push(action.payload);
            break;
        case TrolleyItemActionType.DeleteTrolleyItem: {
            const indexToDelete = newState.trolleyItems.findIndex(t => t.trolleyItemId === action.payload);
            if (indexToDelete >= 0) {
                newState.trolleyItems.splice(indexToDelete, 1);
            }
            break;
        }
    }

    return newState;
}