import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroHomeComponent } from './gro/home/home.component';
import { GroStoreComponent } from './gro/store/store.component';
import { GroCartComponent } from './gro/cart/cart.component';
import { GroOrderComponent } from './gro/order/order.component';
import { GroOrderDetailsComponent } from './gro/order/order-details/order-details.component';

const routes: Routes = [
  { path: 'home', component: GroHomeComponent },
  { path: 'store/:id', component: GroStoreComponent },
  { path: 'cart', component: GroCartComponent },
  {
    path: 'order', component: GroOrderComponent
  },
  {
    path: 'order/:id', component: GroOrderDetailsComponent
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
