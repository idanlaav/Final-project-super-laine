import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialsModel } from 'src/app/models/credentials-model';
import { ShoppingCartModel } from 'src/app/models/shopping-cart-model';
import { AuthService } from 'src/app/services/auth.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { LayoutComponent } from '../../layout-area/layout/layout.component';
import { AuthGuard } from '../guards/auth.guard';

@Component({
    selector: 'app-auth-home',
    templateUrl: './auth-home.component.html',
    styleUrls: ['./auth-home.component.css']
})
export class AuthHomeComponent implements OnInit {

    public userLogin = new CredentialsModel();
    public userId: number;
    public userFullName: string;
    public openShoppingCart: ShoppingCartModel[];
    public closeShoppingCart: ShoppingCartModel[];
    public NewOrOngoingPurchase: string;
    public startShoppingWithNewShoppingCart = new ShoppingCartModel();
    public quantityOfProducts: number;
    public quantityOfOrders: number;
    public productionDate: string;
    public role: string;
    public newMember = false;
    public ok: string;

    constructor(private authService: AuthService, private router: Router, private productsService: ProductsService, private ordersService: OrdersService, private shoppingCartService: ShoppingCartService, private layoutComponent: LayoutComponent, private guard: AuthGuard) { }

    async ngOnInit() {
        const products = await this.productsService.getAllProducts();
        this.quantityOfProducts = products.length;
        const orders = await this.ordersService.getAllOrders();
        this.quantityOfOrders = orders.length;
        if (this.userId) {
            this.closeShoppingCart = await this.shoppingCartService.getAllCloseShoppingCartByUserId(this.userId);
            if (this.openShoppingCart[0]) {
                this.productionDate = this.openShoppingCart[0].productionDate.substring(8, 10) +
                    "-" + this.openShoppingCart[0].productionDate.substring(5, 8) +
                    this.openShoppingCart[0].productionDate.substring(0, 4);
            }
            else if (this.closeShoppingCart[0]) {
                const lastIndex = this.closeShoppingCart.length - 1;
                this.productionDate = this.closeShoppingCart[lastIndex].productionDate.substring(8, 10) +
                    "-" + this.closeShoppingCart[lastIndex].productionDate.substring(5, 8) +
                    this.closeShoppingCart[lastIndex].productionDate.substring(0, 4);
            }
            else {
                this.newMember = true;
            }
        }
    }

    public async login() {
        try {
            await this.authService.login(this.userLogin);
            alert("Successful to logged-in.");
            this.role = localStorage.getItem("role");
            if (this.role == "Admin") {
                this.layoutComponent.role = "Admin";
                this.router.navigateByUrl("admin-screen");
            }
            else {
                this.layoutComponent.userFullName = localStorage.getItem("full name");
                this.userId = await +localStorage.getItem("userId");
                this.openShoppingCart = await this.shoppingCartService.getAllOpenShoppingCartByUserId(this.userId);
                if (this.openShoppingCart.length == 1) {
                    this.NewOrOngoingPurchase = "Resume Shopping";
                }
                else {
                    this.NewOrOngoingPurchase = "Start Shopping";
                }
                this.ngOnInit();
            }
        }
        catch (err: any) {
            alert("Incorrect email or password")
        }
    }

    public async logout() {
        try {
            this.userId = null;
            this.role = null;
            this.NewOrOngoingPurchase = null;
            this.userFullName = null;
            await this.authService.logout();
            alert("Successful to logged-out.");
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    public registerPage() {
        this.router.navigateByUrl("register");
    }

    public async navigateToShoppingPage() {
        try {
            
            if (this.NewOrOngoingPurchase == "Start Shopping") {
                this.startShoppingWithNewShoppingCart.userId = +localStorage.getItem("userId");
                await this.shoppingCartService.addShoppingCart(this.startShoppingWithNewShoppingCart);
                this.router.navigateByUrl("/home");
                this.guard.canActivate(null,null);
                if(localStorage.getItem("token") == null) {
                    this.userId = null;
                    this.userFullName = null;
                    this.NewOrOngoingPurchase = null;
                    this.role = null;
                }
            }
            else {
                this.router.navigateByUrl("/home");
                this.guard.canActivate(null,null);
                if(localStorage.getItem("token") == null) {
                    this.userId = null;
                    this.userFullName = null;
                    this.NewOrOngoingPurchase = null;
                    this.role = null;
                }
            }
        }
        catch (err: any) {
            alert(err.message);
        }
    }

}
