import { Component, Input, OnInit } from '@angular/core';
import { TrolleyItemsModel } from 'src/app/models/trolley-items-model';
import store from 'src/app/redux/store';
import { TrolleyItemsService } from 'src/app/services/trolley-items.service';
import { environment } from 'src/environments/environment';
import { HomeComponent } from '../../home-area/home/home.component';

@Component({
    selector: 'app-trolley-item-card',
    templateUrl: './trolley-item-card.component.html',
    styleUrls: ['./trolley-item-card.component.css']
})

export class TrolleyItemCardComponent implements OnInit {

    @Input()
    public trolleyItem: TrolleyItemsModel;
    public allTrolleyItem: TrolleyItemsModel[];
    public imageSource: string;
    public product: any;
    public getTrolleyItemsLength: number;
    public object: any;
    public page = "home";

    constructor(private trolleyItemsService: TrolleyItemsService, private comp: HomeComponent) { }

    async ngOnInit() {
        try {            
            this.allTrolleyItem = store.getState().trolleyItemsState.trolleyItems;
            if (this.trolleyItem.stock == undefined) {
                this.allTrolleyItem = await this.trolleyItemsService.getTrolleyItemsByUserId(+localStorage.getItem("userId"));
                this.getTrolleyItemsLength = this.allTrolleyItem.length - 1;
                this.trolleyItem.imageName = this.allTrolleyItem[this.getTrolleyItemsLength].imageName;
                this.trolleyItem.stock = this.allTrolleyItem[this.getTrolleyItemsLength].stock;
                this.trolleyItem.productName = this.allTrolleyItem[this.getTrolleyItemsLength].productName;
                this.trolleyItem.totalPrice = this.allTrolleyItem[this.getTrolleyItemsLength].totalPrice;
            }        
            this.imageSource = environment.productsUrl + "images/" + this.trolleyItem.imageName;
            this.page = this.comp.page;
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    public async deleteTrolleyItem() {
        try {
            if(!this.trolleyItem.trolleyItemId) {
                this.object = this.trolleyItem;
                this.trolleyItem.trolleyItemId = this.object.insertId;
            }
            const ok = window.confirm("Are you sure?");
            if (!ok) return;
            await this.trolleyItemsService.deleteTrolleyItem(this.trolleyItem.trolleyItemId);
            this.comp.totalPriceCart = (this.comp.totalPriceCart - this.trolleyItem.totalPrice);
            this.comp.currentTrolleyItems = store.getState().trolleyItemsState.trolleyItems;
            await alert("This product has been deleted.");
        }
        catch (err: any) {
            alert(err.message);
        }
    }

}
