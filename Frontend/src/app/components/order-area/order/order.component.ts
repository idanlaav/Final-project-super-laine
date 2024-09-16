import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderModel } from 'src/app/models/order-model';
import { ProductModel } from 'src/app/models/product-model';
import { ShoppingCartModel } from 'src/app/models/shopping-cart-model';
import { TrolleyItemsModel } from 'src/app/models/trolley-items-model';
import store from 'src/app/redux/store';
import { AuthService } from 'src/app/services/auth.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { TrolleyItemsService } from 'src/app/services/trolley-items.service';


@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {

    public currentTrolleyItems: TrolleyItemsModel[] = [];
    public userId: number;
    public totalPriceCart = 0;
    public page = "home";
    public orderData = new OrderModel;
    public date = new Date;
    public shoppingCart: ShoppingCartModel[];
    public cities: any;
    public userLoggedInCity: string;
    public userLoggedInStreet: string;
    public myCity = false;
    public myCityId: number;
    public printDisplay = false;
    public allOrders: OrderModel[];
    public searchValue: string;
    public productsWithLowerCaseNames: any;
    public displayMySearch: TrolleyItemsModel[];


    constructor(private authService: AuthService, private trolleyItemsService: TrolleyItemsService, private ordersService: OrdersService, private shoppingCartService: ShoppingCartService, private router: Router) { }

    async ngOnInit() {
        this.userId = +localStorage.getItem("userId");
        this.cities = store.getState().authState.cities;
        this.currentTrolleyItems = await this.trolleyItemsService.getTrolleyItemsByUserId(this.userId);
        let itemsPrice = await this.currentTrolleyItems.map((t: any) => t.totalPrice);
        for (let index = 0; index < itemsPrice.length; index++) {
            this.totalPriceCart += itemsPrice[index];
        }
        this.userLoggedInCity = localStorage.getItem("city");
        this.userLoggedInStreet = localStorage.getItem("street");
        this.displayMySearch = this.currentTrolleyItems;
    }

    public backToHomePage() {
        this.router.navigateByUrl("home");
    }

    public async addOrder() {
        this.allOrders = await this.ordersService.getAllOrders();
        const sum = this.allOrders.filter(o => o.deliveryDate.substring(0, 10) == this.orderData.deliveryDate);
        if (sum.length >= 3) {
            alert("The amount of deliveries on this day has reached its maximum, please choose another day for delivery.");
        }
        else {
            this.printDisplay = await true;
            this.orderData.userId = this.userId;
            this.orderData.shoppingCartId = this.currentTrolleyItems[0].shoppingCartId;
            this.orderData.totalPrice = this.totalPriceCart;
            await this.ordersService.addOrder(this.orderData);
            this.shoppingCart = await this.shoppingCartService.getAllOpenShoppingCartByUserId(this.userId);
            this.shoppingCart[0].status = "close";
            await this.shoppingCartService.updateShoppingCart(this.shoppingCart[0]);
            if (confirm("Download")) {
                print();
                this.router.navigateByUrl("home");
            }
            else {
                this.router.navigateByUrl("home");
            }
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

    public async findMyCityFromList() {
        this.myCity = true;
        this.myCityId = this.cities.findIndex((c: string) => c == this.userLoggedInCity);
    }

    public search(searchValue: string) {
        this.searchValue = searchValue;
        if (this.searchValue != "") {
            this.productsWithLowerCaseNames = this.currentTrolleyItems.map(item => Object.fromEntries(Object.entries(item).map(([key, value]) =>
                [key, typeof value == 'string' ? value.toLowerCase() : value])));
            let result = this.productsWithLowerCaseNames.filter((item: ProductModel) => item.productName.includes(this.searchValue.toLocaleLowerCase()));
            result.forEach((product: { chosen: boolean; }) => {
                product.chosen = true;
            });

            for (let index = 0; index < result.length; index++) {
                result[index].productName = this.transform(result[index].productName, this.searchValue);
                let startSentence = result[index].productName.split('<mark>');
                let firstValueFound = startSentence[1].split("</mark>");
                if(startSentence[2] != null && startSentence[3] == null) { // Checking how many letters are marked
                    let secondValueFound = startSentence[2]?.split("</mark>");

                    result[index].beginningOfASentence = startSentence[0];
                    result[index].firstLetterIsMarked = firstValueFound[0];
                    result[index].continueASentenceAfterFirstMarking = firstValueFound[1];
                    result[index].secondLetterIsMarked = secondValueFound[0];
                    result[index].continueASentenceAfterSecondMarking = secondValueFound[1];
                }
                else if(startSentence[3] != null && startSentence[4] == null) { // Checking how many letters are marked
                    let secondValueFound = startSentence[2]?.split("</mark>");
                    let thirdValueFound = startSentence[3]?.split("</mark>");

                    result[index].beginningOfASentence = startSentence[0];
                    result[index].firstLetterIsMarked = firstValueFound[0];
                    result[index].continueASentenceAfterFirstMarking = firstValueFound[1];
                    result[index].secondLetterIsMarked = secondValueFound[0];
                    result[index].continueASentenceAfterSecondMarking = secondValueFound[1];
                    result[index].thirdLetterIsMarked = thirdValueFound[0];
                    result[index].continueASentenceAfterThirdMarking = thirdValueFound[1];
                }
                else if(startSentence[4] != null && startSentence[5] == null) { // Checking how many letters are marked
                    let secondValueFound = startSentence[2]?.split("</mark>");
                    let thirdValueFound = startSentence[3]?.split("</mark>");
                    let fourthValueFound = startSentence[4]?.split("</mark>");

                    result[index].beginningOfASentence = startSentence[0];
                    result[index].firstLetterIsMarked = firstValueFound[0];
                    result[index].continueASentenceAfterFirstMarking = firstValueFound[1];
                    result[index].secondLetterIsMarked = secondValueFound[0];
                    result[index].continueASentenceAfterSecondMarking = secondValueFound[1];
                    result[index].thirdLetterIsMarked = thirdValueFound[0];
                    result[index].continueASentenceAfterThirdMarking = thirdValueFound[1];
                    result[index].fourthLetterIsMarked = fourthValueFound[0];
                    result[index].continueASentenceAfterFourthMarking = fourthValueFound[1];
                }
                else if(startSentence[5] != null) { // Checking how many letters are marked
                    let secondValueFound = startSentence[2]?.split("</mark>");
                    let thirdValueFound = startSentence[3]?.split("</mark>");
                    let fourthValueFound = startSentence[4]?.split("</mark>");
                    let fifthValueFound= startSentence[5]?.split("</mark>");

                    result[index].beginningOfASentence = startSentence[0];
                    result[index].firstLetterIsMarked = firstValueFound[0];
                    result[index].continueASentenceAfterFirstMarking = firstValueFound[1];
                    result[index].secondLetterIsMarked = secondValueFound[0];
                    result[index].continueASentenceAfterSecondMarking = secondValueFound[1];
                    result[index].thirdLetterIsMarked = thirdValueFound[0];
                    result[index].continueASentenceAfterThirdMarking = thirdValueFound[1];
                    result[index].fourthLetterIsMarked = fourthValueFound[0];
                    result[index].continueASentenceAfterFourthMarking = fourthValueFound[1];
                    result[index].fifthLetterIsMarked = fifthValueFound[0];
                    result[index].continueASentenceAfterFifthMarking = fifthValueFound[1];
                }
                else { // Checking how many letters are marked
                    result[index].beginningOfASentence = startSentence[0];
                    result[index].firstLetterIsMarked = firstValueFound[0];
                    result[index].continueASentenceAfterFirstMarking = firstValueFound[1];
                }
            }
            this.displayMySearch = result;
        }
        else {
            this.displayMySearch = this.currentTrolleyItems;
        }
    }

    public transform(wholeText: string, searchQuery: string): string {
        if (!searchQuery) {
            return wholeText;
        }
        const re = new RegExp(searchQuery, 'gi');
        return wholeText.replace(re, `<mark>$&</mark>`);
    }

}
