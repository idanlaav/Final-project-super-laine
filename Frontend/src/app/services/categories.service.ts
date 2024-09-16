import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthGuard } from '../components/auth-area/guards/auth.guard';
import { CategoryModel } from '../models/category-model';
import { fetchCategoryAction } from '../redux/categories-state';
import store from '../redux/store';


@Injectable({
    providedIn: 'root'
})
export class CategoriesService {

    constructor(private http: HttpClient, private authGard: AuthGuard) { }

    // Get all categories: 
    public async getAllCategories() {
        const permission = this.authGard.canActivate(null, null);
        if (permission) {
            if (store.getState().categoriesState.categories.length === 0) {
                const categories = await firstValueFrom(this.http.get<CategoryModel[]>(environment.categoriesUrl));
                store.dispatch(fetchCategoryAction(categories));
            }
            return store.getState().categoriesState.categories;
        }
        else {
            return null;
        }
    }

}


