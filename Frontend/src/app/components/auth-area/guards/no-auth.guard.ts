import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

    public token = "";

    constructor(private _router: Router) {

    }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        this.token = localStorage.getItem("token");
            
        if (this.token != null) {
            this._router.navigateByUrl("home");
            return false;
        }
        else {
            return true;
        }

    }

}
