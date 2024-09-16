import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthGuard } from '../components/auth-area/guards/auth.guard';
import { ProductModel } from '../models/product-model';
import { addProductAction, fetchProductsAction, updateProductAction } from '../redux/products-state';
import store from '../redux/store';


@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    constructor(private http: HttpClient, private authGard: AuthGuard) { }

    // Get all products: 
    public async getAllProducts() {
        const products = await firstValueFrom(this.http.get<ProductModel[]>(environment.productsUrl));
        store.dispatch(fetchProductsAction(products));
        return store.getState().productsState.products;
    }

    // Get products by category: 
    public async getProductByCategory(categoryId: number) {
        const permission = this.authGard.canActivate(null, null);
        if (permission) {
            const products = await firstValueFrom(this.http.get<ProductModel[]>(environment.productsByCategoryIdUrl + categoryId));
            store.dispatch(fetchProductsAction(products));
            return store.getState().productsState.products;
        }
        else {
            return null;
        }
    }

    // Get one product: 
    public async getOneProductById(productId: number) {
        const permission = this.authGard.canActivate(null, null);
        if (permission) {
            if (store.getState().productsState.products.length === 0) {
                const products = await firstValueFrom(this.http.get<ProductModel[]>(environment.productsUrl));
                store.dispatch(fetchProductsAction(products));
            }
            const product = store.getState().productsState.products.find(p => p.productId === productId);
            return product;
        }
        else {
            return null;
        }
    }

    // Add product: 
    public async addProduct(product: ProductModel): Promise<void> {
        const permission = this.authGard.canActivate(null, null);
        if (permission) {
            const formData = new FormData();
            formData.append("productName", product.productName);
            formData.append("categoryId", product.categoryId.toString());
            formData.append("price", product.price.toString());
            formData.append("image", product.image);
            const addedProduct = await firstValueFrom(this.http.post<ProductModel>(environment.productsUrl, formData));
            store.dispatch(addProductAction(addedProduct));
        }
    }

    // Update product: 
    public async updateProduct(product: ProductModel): Promise<void> {
        const permission = this.authGard.canActivate(null, null);
        if (permission) {
            const formData = new FormData();
            formData.append("productName", product.productName);
            formData.append("categoryId", product.categoryId.toString());
            formData.append("price", product.price.toString());
            formData.append("image", product.image);
            if (!product.image) {
                formData.append("imageName", product.imageName);
            }
            const updatedProduct = await firstValueFrom(this.http.put<ProductModel>(environment.productsUrl + product.productId, formData));
            store.dispatch(updateProductAction(updatedProduct));
        }

    }

}


