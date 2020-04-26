import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroComponent } from './gro.component';
import { GroHomeComponent } from './components/home/home.component';
import { GroStoreComponent } from './components/store/store.component';
import { GroCartComponent } from './components/cart/cart.component';
import { GroOrderComponent } from './components/order/order.component';
import { GroOrderDetailsComponent } from './components/order/order-details/order-details.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { LocationComponent } from './components/location/location.component';
import { MenuComponent } from './components/menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { GroStoreDetailComponent } from './components/store/store-details/store-detail.component';
import { CategoryComponent } from './components/category/category.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './components/search/search.component';
import { LocationOnLoadComponent } from './components/location/location-on-load/location-on-load.component';

@NgModule({
  declarations: [
    GroComponent,
    HeaderComponent,
    GroHomeComponent,
    GroStoreComponent,
    GroStoreDetailComponent,
    GroCartComponent,
    GroOrderComponent,
    GroOrderDetailsComponent,
    LoginComponent,
    SignupComponent,
    LocationComponent,
    LocationOnLoadComponent,
    MenuComponent,
    CategoryComponent,
    FooterComponent,
    SearchComponent
  ],
  exports: [
    GroComponent,
    GroHomeComponent,
    GroStoreComponent,
    GroCartComponent,
    GroOrderComponent,
    GroOrderDetailsComponent,
    LoginComponent,
    SignupComponent,
    LocationComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: []
})
export class GroModule { }
