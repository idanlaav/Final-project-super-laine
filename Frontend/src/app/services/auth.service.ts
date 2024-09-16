import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/user-model';
import { CredentialsModel } from '../models/credentials-model';
import store from '../redux/store';
import { AuthActionType, loginAction, logoutAction, registerAction, usersDetailsAction } from '../redux/auth-state';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }

    public async register(user: UserModel) {
        const addedUser = await firstValueFrom(this.http.post<string>(environment.registerUrl, user));
        return addedUser;
    }

    public async login(credentials: CredentialsModel) {
        const token = await firstValueFrom(this.http.post<string>(environment.loginUrl, credentials));
        store.dispatch(loginAction(token.toString()));
        return token;
    }

    public logout() {
        store.dispatch(logoutAction());
        store.dispatch({ type: AuthActionType.Logout, payload: null });
    }

    public isLoggedIn(): boolean {
        return store.getState().authState.token !== null;
    }

    public async getAllUsersDetails() {
        if (store.getState().authState.usersDetails === undefined) {
            const usersDetails = await firstValueFrom(this.http.get<UserModel[]>(environment.usersDetails));
            store.dispatch(usersDetailsAction(usersDetails));
        }
        return store.getState().authState.usersDetails;
    }
}
