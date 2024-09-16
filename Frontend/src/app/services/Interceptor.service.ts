import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import store from "../redux/store";


@Injectable({
    providedIn: 'root'
})
export class InterceptorService {

    constructor() { }
    public token: string;

    public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        this.token = store.getState().authState.token;
        return next.handle(request.clone({setHeaders: {Authorization: `Basic ${this.token}`}}));
      }

}

