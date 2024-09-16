import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from 'src/app/models/product-model';
import { ShoppingCartModel } from 'src/app/models/shopping-cart-model';
import store from 'src/app/redux/store';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { TrolleyItemsService } from 'src/app/services/trolley-items.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public sidebarCss = "sidebarClose";
    public navLinkCss = "ulWithoutSidebar";
    public currentUserId: number;
    public currentTrolleyItems: any;
    public status: string;
    public displayUserSelect: ProductModel[];
    public products: ProductModel[];
    public FruitsAndVegetables: ProductModel[];
    public PastriesAndBreads: ProductModel[];
    public MeatAndChickenAndFish: ProductModel[];
    public DairyProductsAndEggs: ProductModel[];
    public Drinks: ProductModel[];
    public CleaningProducts: ProductModel[];
    public openShoppingCart: ShoppingCartModel[];
    public closeShoppingCart: ShoppingCartModel[];
    public newShoppingCart = new ShoppingCartModel;
    public totalPriceCart = 0;
    public productsWithLowerCaseNames: any;
    public categoryId: number;
    public noProductsFound: string;
    public page: string;
    public cardFormPopupAlreadyOpen: string;

    constructor(private authService: AuthService, private productsService: ProductsService, private shoppingCartService: ShoppingCartService, private trolleyItemsService: TrolleyItemsService, private router: Router) { }

    async ngOnInit() {
        try {
            this.page = "home";
            if(!this.products) {
                this.products = await this.productsService.getAllProducts();
                this.displayUserSelect = this.products;
            }
            this.currentUserId = +localStorage.getItem("userId");
            this.openShoppingCart = await this.shoppingCartService.getAllOpenShoppingCartByUserId(this.currentUserId);
            this.closeShoppingCart = await this.shoppingCartService.getAllCloseShoppingCartByUserId(this.currentUserId);
            if (this.openShoppingCart.length == 0 && !this.closeShoppingCart[0]) {
                this.newShoppingCart.userId = this.currentUserId;
                await this.shoppingCartService.addShoppingCart(this.newShoppingCart);
                this.openShoppingCart = await this.shoppingCartService.getAllOpenShoppingCartByUserId(this.currentUserId);
                this.status = this.openShoppingCart[0].status;
            }
            else if (this.openShoppingCart.length != 0) {
                this.status = this.openShoppingCart[0].status;
            }
            if (this.openShoppingCart.length == 0 && this.closeShoppingCart[0]) {
                this.status = "close";
            }
            if (this.openShoppingCart[0]) {
                this.totalPriceCart = 0;
                this.currentTrolleyItems = await this.trolleyItemsService.getTrolleyItemsByUserId(this.currentUserId);
                let allPrices = await this.currentTrolleyItems.map((t: any) => t.totalPrice);
                for (let index = 0; index < allPrices.length; index++) {
                    this.totalPriceCart += allPrices[index];
                }
            }
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    public async logout() {
        try {
            await this.authService.logout();
            this.router.navigateByUrl("/auth");
            alert("Successful to logged-out.");
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    public openAndCloseNav() {
        if (this.sidebarCss == "sidebarOpen") {
            this.sidebarCss = "sidebarClose";
            this.navLinkCss = "ulWithoutSidebar";
        }
        else {
            this.sidebarCss = "sidebarOpen";
            this.navLinkCss = "ulWithSidebar";
        }
    }

    public async getAllProductsFromAllCategories() {
        try {
            this.noProductsFound = "";
            this.displayUserSelect = this.products;
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    public async getAllFruitsAndVegetables() {
        try {
            this.noProductsFound = "";
            this.categoryId = 1;
            this.FruitsAndVegetables = await this.productsService.getProductByCategory(this.categoryId);
            this.displayUserSelect = this.FruitsAndVegetables;
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    public async getAllPastriesAndBreads() {
        try {
            this.noProductsFound = "";
            this.categoryId = 2;
            this.PastriesAndBreads = await this.productsService.getProductByCategory(this.categoryId);
            this.displayUserSelect = this.PastriesAndBreads;
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    public async getAllMeatAndChickenAndFish() {
        try {
            this.noProductsFound = "";
            this.categoryId = 3;
            this.MeatAndChickenAndFish = await this.productsService.getProductByCategory(this.categoryId);
            this.displayUserSelect = this.MeatAndChickenAndFish;
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    public async getAllDairyProductsAndEggs() {
        try {
            this.noProductsFound = "";
            this.categoryId = 4;
            this.DairyProductsAndEggs = await this.productsService.getProductByCategory(this.categoryId);
            this.displayUserSelect = this.DairyProductsAndEggs;
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    public async getAllDrinks() {
        try {
            this.noProductsFound = "";
            this.categoryId = 5;
            this.Drinks = await this.productsService.getProductByCategory(this.categoryId);
            this.displayUserSelect = this.Drinks;
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    public async getAllCleaningProducts() {
        try {
            this.noProductsFound = "";
            this.categoryId = 6;
            this.CleaningProducts = await this.productsService.getProductByCategory(this.categoryId);
            this.displayUserSelect = this.CleaningProducts;
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    public searchProducts(event: any) {
        this.cardFormPopupAlreadyOpen = null;
        this.noProductsFound = "";
        let mySearch = event.target.value; 
        this.displayUserSelect.forEach(product => {
            product.chosen = false;
        })
        if (mySearch){
            this.productsWithLowerCaseNames = this.products.map(p => Object.fromEntries(Object.entries(p).map(([key, value]) => 
            [key, typeof value == 'string' ? value.toLowerCase() : value])));
            let result = this.productsWithLowerCaseNames.filter((item: ProductModel) => item.productName.includes(mySearch.toLocaleLowerCase()));
            result.forEach((product: { chosen: boolean; }) => {
                product.chosen = true;
            });
            if(result.length == 0) {
                this.noProductsFound = "no";
                event.target.value = "";
            }
            else {
                this.displayUserSelect = result;
                event.target.value = "";
            }
        }
        else{
            this.noProductsFound = "";
            this.displayUserSelect = store.getState().productsState.products;
        }

    }

    public async deleteAllItemsFromCart() {
        try {
            const ok = window.confirm("Are you sure?");
            if (!ok) return;
            this.currentTrolleyItems = store.getState().trolleyItemsState.trolleyItems;
            for (let index = 0; index < this.currentTrolleyItems.length; index++) {
                this.trolleyItemsService.deleteTrolleyItem(this.currentTrolleyItems[index].trolleyItemId);
            }
            this.totalPriceCart = await 0;
            await alert("The shopping cart has been successfully deleted.");
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    public moveToOrderPage() {
        if(this.totalPriceCart < 15) {
            alert("Minimum order $15.");
        }
        else {
            this.router.navigateByUrl("/order");
        }
    }


}
