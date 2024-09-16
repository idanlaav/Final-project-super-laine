import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthGuard } from '../components/auth-area/guards/auth.guard';
import { OrderModel } from '../models/order-model';
import { addOrder, fetchOrderAction } from '../redux/orders-state';
import store from '../redux/store';


@Injectable({
    providedIn: 'root'
})
export class OrdersService {

    constructor(private http: HttpClient, private authGard: AuthGuard) { }

    // Get all orders: 
    public async getAllOrders() {
        if (store.getState().ordersState.orders.length === 0) {
            const orders = await firstValueFrom(this.http.get<OrderModel[]>(environment.orderUrl));
            store.dispatch(fetchOrderAction(orders));
        }
        return store.getState().ordersState.orders;
    }

    // Add order:
    public async addOrder(order: OrderModel) {
        const permission = this.authGard.canActivate(null, null);
        if (permission) {
            const addedOrder = await firstValueFrom(this.http.post<OrderModel>(environment.orderUrl, order));
            return addedOrder;
        }
        else {
            return null;
        }
    }

}


