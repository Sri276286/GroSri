import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroHomeComponent } from './gro/components/home/home.component';
import { GroCartComponent } from './gro/components/cart/cart.component';
import { GroOrderComponent } from './gro/components/order/order.component';
import { GroOrderDetailsComponent } from './gro/components/order/order-details/order-details.component';
import { AuthGuard } from './guards/auth.guard';
import { SignupComponent } from './gro/components/signup/signup.component';
import { LoginComponent } from './gro/components/login/login.component';
import { GroStoreDetailComponent } from './gro/components/store/store-details/store-detail.component';

const routes: Routes = [
  { path: 'home', component: GroHomeComponent },
  { path: 'store/:id', component: GroStoreDetailComponent },
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
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
