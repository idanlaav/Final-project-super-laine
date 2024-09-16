import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryModel } from 'src/app/models/category-model';
import { ProductModel } from 'src/app/models/product-model';
import store from 'src/app/redux/store';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';
import { LayoutComponent } from '../../layout-area/layout/layout.component';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

    public sidebarCss = "sidebarClose";
    public navLinkCss = "ulWithoutSidebar";
    public displayUserSelect: ProductModel[];
    public products: ProductModel[];
    public formNewProduct = false;
    public formUpdateProduct = false;
    public newProductData = new ProductModel();
    public ProductSelectedByUser = new ProductModel;
    public productSelectedData: ProductModel;
    public imageSource: string;
    public categoryIdOfProductSelected: number;
    public categories: CategoryModel[];

    @ViewChild("imageFile")
    public imageFileRef: ElementRef<HTMLInputElement>;
    public productsWithLowerCaseNames: any;
    public noProductsFound: string;
    public searchValue: string;

    constructor(private authService: AuthService, private productsService: ProductsService, private categoriesService: CategoriesService, private router: Router, private layoutComponent: LayoutComponent) { }

    async ngOnInit() {
        try {
            this.products = await this.productsService.getAllProducts();
            this.displayUserSelect = this.products;
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    public async logout() {
        try {
            this.layoutComponent.role = "User";
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
            this.products = await this.productsService.getAllProducts();
            this.displayUserSelect = this.products;
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    public async getAllFruitsAndVegetables() {
        try {
            this.noProductsFound = "";
            const categoryId = 1;
            this.displayUserSelect = await this.productsService.getProductByCategory(categoryId);
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    public async getAllPastriesAndBreads() {
        try {
            this.noProductsFound = "";
            const categoryId = 2;
            this.displayUserSelect = await this.productsService.getProductByCategory(categoryId);
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    public async getAllMeatAndChickenAndFish() {
        try {
            this.noProductsFound = "";
            const categoryId = 3;
            this.displayUserSelect = await this.productsService.getProductByCategory(categoryId);
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    public async getAllDairyProductsAndEggs() {
        try {
            this.noProductsFound = "";
            const categoryId = 4;
            this.displayUserSelect = await this.productsService.getProductByCategory(categoryId);
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    public async getAllDrinks() {
        try {
            this.noProductsFound = "";
            const categoryId = 5;
            this.displayUserSelect = await this.productsService.getProductByCategory(categoryId);
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    public async getAllCleaningProducts() {
        try {
            this.noProductsFound = "";
            const categoryId = 6;
            this.displayUserSelect = await this.productsService.getProductByCategory(categoryId);
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    public searchProducts(event: any) {   
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
                this.displayUserSelect = result;
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

    public async openFormToAddProduct() {
        if (this.sidebarCss == "sidebarClose") {
            this.sidebarCss = "sidebarOpen";
            this.navLinkCss = "ulWithSidebar";
        }
        this.categories = await this.categoriesService.getAllCategories();
        this.formUpdateProduct = false;
        this.formNewProduct = true;
    }

    public async addProduct() {
        this.newProductData.image = this.imageFileRef.nativeElement.files[0];
        await this.productsService.addProduct(this.newProductData);
        alert("Product has been added successfully.");
        this.formNewProduct = false;
        this.newProductData = new ProductModel();
    }

    public async openFormToUpdateProduct() {
        if (this.sidebarCss == "sidebarClose") {
            this.sidebarCss = "sidebarOpen";
            this.navLinkCss = "ulWithSidebar";
        }
        this.categories = await this.categoriesService.getAllCategories();
        this.productSelectedData = JSON.parse(JSON.stringify(await this.productsService.getOneProductById(this.ProductSelectedByUser.productId)));
        this.imageSource = environment.productsUrl + "images/" + (this.productSelectedData?.imageName || "Super Market another photo.jpeg");
        this.formNewProduct = false;
        this.formUpdateProduct = true;
        this.categoryIdOfProductSelected = this.ProductSelectedByUser.categoryId;
    }

    public async updateProduct() {
        if(this.imageFileRef.nativeElement.files[0]) {
            this.productSelectedData.image = this.imageFileRef.nativeElement.files[0];
        }
        else {
            this.productSelectedData.imageName = (this.ProductSelectedByUser.imageName || "Super Market another photo.jpeg");
        }        
        await this.productsService.updateProduct(this.productSelectedData);
        alert("Product has been updated successfully.")
        this.formUpdateProduct = false;
        if(this.categoryIdOfProductSelected != this.productSelectedData.categoryId) {
            const categoryId = this.categoryIdOfProductSelected;
            this.displayUserSelect = await this.productsService.getProductByCategory(categoryId);
        }
    }



}
