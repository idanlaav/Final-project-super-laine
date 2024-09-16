import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './components/admin-area/admin-page/admin-page.component';
import { AuthHomeComponent } from './components/auth-area/auth-home/auth-home.component';
import { AuthGuard } from './components/auth-area/guards/auth.guard';
import { NoAuthGuard } from './components/auth-area/guards/no-auth.guard';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { HomeComponent } from './components/home-area/home/home.component';
import { OrderComponent } from './components/order-area/order/order.component';

const routes: Routes = [
    {path: '', pathMatch : 'full', redirectTo: 'home'},
    {path:'auth', component: AuthHomeComponent, canActivate:[NoAuthGuard]},
    {path:'register', component: RegisterComponent, canActivate:[NoAuthGuard]},
    {path:"home", component: HomeComponent, canActivate:[AuthGuard] },
    {path:"order", component: OrderComponent, canActivate:[AuthGuard] },
    {path:"admin-screen", component: AdminPageComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
