import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroHomeComponent } from './gro/components/home/home.component';
import { GroStoreComponent } from './gro/components/store/store.component';
import { GroCartComponent } from './gro/components/cart/cart.component';
import { GroOrderComponent } from './gro/components/order/order.component';
import { GroOrderDetailsComponent } from './gro/components/order/order-details/order-details.component';

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
