import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroHomeComponent } from './gro/components/home/home.component';
import { GroCartComponent } from './gro/components/cart/cart.component';
import { GroOrderComponent } from './gro/components/order/order.component';
import { GroOrderDetailsComponent } from './gro/components/order/order-details/order-details.component';
import { AuthGuard } from './common/guards/auth.guard';
import { SignupComponent } from './common/components/signup/signup.component';
import { LoginComponent } from './common/components/login/login.component';
import { GroStoreDetailComponent } from './gro/components/store/store-details/store-detail.component';
import { GroCategoryStoreComponent } from './gro/components/category/category-stores/category-store.component';
import { FavoriteStoreComponent } from './gro/components/store/favorite-store/favorite-store.component';
import { AddressListComponent } from './gro/components/address/address-list.component';
import { AddressDetailComponent } from './gro/components/address/address-detail/address-detail.component';
import { PageNotFoundComponent } from './common/components/page-not-found/page-not-found.component';
import { UserComponent } from './gro/components/user/user.component';
import { ForgotPwdComponent } from './common/components/forgot-pwd/forgot-pwd.component';

const routes: Routes = [
  { path: 'home', component: GroHomeComponent },
  { path: 'address', component: AddressListComponent, canActivate: [AuthGuard] },
  { path: 'address/:id', component: AddressDetailComponent, canActivate: [AuthGuard] },
  { path: 'category/:id', component: GroCategoryStoreComponent },
  { path: 'store/:id', component: GroStoreDetailComponent },
  { path: 'fav-stores', component: FavoriteStoreComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: GroCartComponent },
  {
    path: 'order', component: GroOrderComponent, canActivate: [AuthGuard]
  },
  {
    path: 'order/:id', component: GroOrderDetailsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: 'forgot_password', component: ForgotPwdComponent
  },
  {
    path: 'user', component: UserComponent, canActivate: [AuthGuard]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
