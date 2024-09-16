import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TrolleyItemsModel } from '../models/trolley-items-model';
import { addTrolleyItem, deleteTrolleyItem, fetchTrolleyItems } from '../redux/trolley-items-state';
import store from '../redux/store';
import { AuthGuard } from '../components/auth-area/guards/auth.guard';


@Injectable({
    providedIn: 'root'
})
export class TrolleyItemsService {

    constructor(private http: HttpClient, private authGard: AuthGuard) { }

    // Get all trolley items by shopping id cart: 
    public async getTrolleyItemsByUserId(userId: number) {
        const permission = this.authGard.canActivate(null, null);
        if (permission) {
            const trolleyItems = await firstValueFrom(this.http.get<TrolleyItemsModel[]>(environment.trolleyItemUrl + userId));
            store.dispatch(fetchTrolleyItems(trolleyItems));
            return store.getState().trolleyItemsState.trolleyItems;
        }
        else{
            return null;
        }
    }

    // Add trolley item:
    public async addTrolleyItem(trolleyItem: TrolleyItemsModel) {
        const permission = this.authGard.canActivate(null, null);
        if (permission) {
            const addedTrolleyItem = await firstValueFrom(this.http.post<TrolleyItemsModel>(environment.trolleyItemUrl, trolleyItem))
            store.dispatch(addTrolleyItem(addedTrolleyItem));
            return addedTrolleyItem;
        }
        else {
            return null;
        }
    }

    // Delete trolley item: 
    public async deleteTrolleyItem(trolleyItemId: number) {
        const permission = this.authGard.canActivate(null, null);
        if (permission) {
            await firstValueFrom(this.http.delete(environment.trolleyItemUrl + trolleyItemId));
            store.dispatch(deleteTrolleyItem(trolleyItemId));
        }
    }

}


