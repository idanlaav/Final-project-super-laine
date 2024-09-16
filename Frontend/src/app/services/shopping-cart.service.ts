import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ShoppingCartModel } from '../models/shopping-cart-model';
import { addShoppingCart, closeShoppingCart, openShoppingCart, updateShoppingCart } from '../redux/shopping-cart-state';
import store from '../redux/store';
import { AuthGuard } from '../components/auth-area/guards/auth.guard';


@Injectable({
    providedIn: 'root'
})
export class ShoppingCartService {

    constructor(private http: HttpClient, private authGard: AuthGuard) { }

    // Get all open shopping cart by shopping id cart: 
    public async getAllOpenShoppingCartByUserId(userId: number) {
        const permission = this.authGard.canActivate(null, null);
        if (permission) {
            const shoppingCart = await firstValueFrom(this.http.get<ShoppingCartModel[]>(environment.openShoppingCartUrl + userId));
            store.dispatch(openShoppingCart(shoppingCart));
            return store.getState().shoppingCartState.shoppingCart;
        }
        else {
            return null;
        }
    }

    // Get all close shopping cart by shopping id cart: 
    public async getAllCloseShoppingCartByUserId(userId: number) {
        const permission = this.authGard.canActivate(null, null);
        if (permission) {
            const shoppingCart = await firstValueFrom(this.http.get<ShoppingCartModel[]>(environment.closeShoppingCartUrl + userId));
            store.dispatch(closeShoppingCart(shoppingCart));
            return store.getState().shoppingCartState.shoppingCart;
        }
        else {
            return null;
        }
    }

    // Add shopping cart:
    public async addShoppingCart(shoppingCart: ShoppingCartModel) {
        const permission = this.authGard.canActivate(null, null);
        if (permission) {
            const addedShoppingCart = await firstValueFrom(this.http.post<ShoppingCartModel>(environment.shoppingCartUrl, shoppingCart))
            store.dispatch(addShoppingCart(addedShoppingCart));
            return addedShoppingCart;
        }
        else {
            return null;
        }
    }


    // Update shopping cart: 
    public async updateShoppingCart(shoppingCart: ShoppingCartModel) {
        const permission = this.authGard.canActivate(null, null);
        if (permission) {
            const formData = new FormData();
            formData.append("userId", shoppingCart.userId.toString());
            formData.append("productionDate", shoppingCart.productionDate);
            formData.append("status", shoppingCart.status);
            const updatedShoppingCart = await firstValueFrom(this.http.put<ShoppingCartModel>(environment.shoppingCartUrl + shoppingCart.shoppingCartId, formData));
            store.dispatch(updateShoppingCart(updatedShoppingCart));
            return updatedShoppingCart;
        }
        else {
            return null;
        }
    }

}


