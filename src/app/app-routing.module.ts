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
import { StoreDashboardComponent } from './store/components/dashboard/dashboard.component';
import { ViewOrderComponent } from './store/components/view-order/view-order.component';
import { GroCategoryStoreComponent } from './gro/components/category/category-stores/category-store.component';
import { FavoriteStoreComponent } from './gro/components/store/favorite-store/favorite-store.component';
import { AddressListComponent } from './gro/components/address/address-list.component';
import { AddressDetailComponent } from './gro/components/address/address-detail/address-detail.component';

const routes: Routes = [
  { path: 'home', component: GroHomeComponent },
  { path: 'address', component: AddressListComponent },
  { path: 'address/:id', component: AddressDetailComponent },
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
    path: 'store-dashboard', component: StoreDashboardComponent
  },
  {
    path: 'store-view-order', component: ViewOrderComponent
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
