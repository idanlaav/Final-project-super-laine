import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth.service';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    public token = "";

    constructor(private router: Router, private jwtHelper: JwtHelperService, private authService: AuthService) {

    }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

            this.token = localStorage.getItem("token");
            
            if (this.token == null) {
                this.router.navigateByUrl("auth");
                return false;
            }
            else if(this.jwtHelper.isTokenExpired(this.token)) {
                this.authService.logout();
                this.router.navigateByUrl("auth");
                alert("You have been logged in for too long, please log in again.");
                return false;
            }
            else{
                return true;
            }

    }

}
