import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product-model';
import { ShoppingCartModel } from 'src/app/models/shopping-cart-model';
import { TrolleyItemsModel } from 'src/app/models/trolley-items-model';
import { ProductsService } from 'src/app/services/products.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { TrolleyItemsService } from 'src/app/services/trolley-items.service';
import { environment } from 'src/environments/environment';
import { AdminPageComponent } from '../../admin-area/admin-page/admin-page.component';
import { HomeComponent } from '../../home-area/home/home.component';


@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

    @Input()
    public product: ProductModel;
    public imageSource: string;
    public formPopupCss = "formPopupClose";
    public openAndClosePopup = 0;
    public stock = 1;
    public trolleyItem = new TrolleyItemsModel;
    public newShoppingCart = new ShoppingCartModel;
    public currentUserId: number;
    public shoppingCart: ShoppingCartModel[];
    public trolleyItemsLength: TrolleyItemsModel[];
    public role: string;
    public formAlreadyOpen: string;

    constructor(private shoppingCartService: ShoppingCartService, private trolleyItemsService: TrolleyItemsService, private comp: HomeComponent, private adminPage: AdminPageComponent) { }
        
        ngOnInit(): void {
        this.formAlreadyOpen = this.comp.cardFormPopupAlreadyOpen;
        this.imageSource = environment.productsUrl + "images/" + this.product.imageName;
        this.role = localStorage.getItem("role");   
    }

    public async openForm() {
        if(this.comp.cardFormPopupAlreadyOpen == undefined) {
            this.comp.cardFormPopupAlreadyOpen = "open";
            this.formPopupCss = await "formPopupOpen";
            this.openAndClosePopup = await 1;
        }
    }

    public async closeForm() {
        this.comp.cardFormPopupAlreadyOpen = null;
        this.formPopupCss = "formPopupClose";
        this.openAndClosePopup = 0;
    }

    public async addNewItem() {
        try {
        this.comp.cardFormPopupAlreadyOpen = null;
        this.closeForm();
            this.currentUserId = +localStorage.getItem("userId");
            if (!this.comp.openShoppingCart[0]) {
                this.newShoppingCart.userId = this.currentUserId;
                await this.shoppingCartService.addShoppingCart(this.newShoppingCart);
            }
            this.shoppingCart = await this.shoppingCartService.getAllOpenShoppingCartByUserId(this.currentUserId);
            this.trolleyItem.productId = this.product.productId;
            this.trolleyItem.stock = this.stock;
            this.trolleyItem.totalPrice = this.stock * this.product.price;
            this.trolleyItem.shoppingCartId = this.shoppingCart[0].shoppingCartId;
            await this.trolleyItemsService.addTrolleyItem(this.trolleyItem);
            await this.comp.ngOnInit();
            this.stock = 1;
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    public openSidebar() {
        this.adminPage.openFormToUpdateProduct();
        this.adminPage.ProductSelectedByUser = this.product;
    }
}

