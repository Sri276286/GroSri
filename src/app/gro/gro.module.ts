import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroComponent } from './gro.component';
import { GroHomeComponent } from './components/home/home.component';
import { GroStoreComponent } from './components/store/store.component';
import { GroCartComponent } from './components/cart/cart.component';
import { GroOrderComponent } from './components/order/order.component';
import { GroOrderDetailsComponent } from './components/order/order-details/order-details.component';
import { LocationComponent } from './components/location/location.component';
import { MenuComponent } from './components/menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { GroStoreDetailComponent } from './components/store/store-details/store-detail.component';
import { CategoryComponent } from './components/category/category.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './components/search/search.component';
import { PageErrorComponent } from './components/page-error/page-error.component';
import { GroContactComponent } from './components/contact/contact.component';
import { CartReplaceDialogComponent } from './components/floating-modal/cart-replace-dialog/replace-dialog.component';
import { GroCategoryStoreComponent } from './components/category/category-stores/category-store.component';
import { SearchStoreComponent } from './components/store/store-details/search-store/search-store.component';
import { StoreListComponent } from './components/store/store-details/store-list/store-list.component';
import { CartBarComponent } from './components/cart/cart-bar/cart-bar.component';
import { FavoriteStoreComponent } from './components/store/favorite-store/favorite-store.component';
import { GroFavoriteComponent } from './components/favorite/favorite.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppToastsComponent } from '../common/components/toasts/toasts.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AddressListComponent } from './components/address/address-list.component';
import { AddressDetailComponent } from './components/address/address-detail/address-detail.component';
import { PageNotFoundComponent } from '../common/components/page-not-found/page-not-found.component';
import { UserComponent } from './components/user/user.component';

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
    LocationComponent,
    MenuComponent,
    CategoryComponent,
    FooterComponent,
    SearchComponent,
    PageErrorComponent,
    GroContactComponent,
    CartReplaceDialogComponent,
    GroCategoryStoreComponent,
    SearchStoreComponent,
    StoreListComponent,
    CartBarComponent,
    FavoriteStoreComponent,
    GroFavoriteComponent,
    AppToastsComponent,
    AddressListComponent,
    AddressDetailComponent,
    PageNotFoundComponent,
    UserComponent
  ],
  exports: [
    GroComponent,
    HeaderComponent,
    GroHomeComponent,
    GroStoreComponent,
    GroStoreDetailComponent,
    GroCartComponent,
    GroOrderComponent,
    GroOrderDetailsComponent,
    LocationComponent,
    MenuComponent,
    CategoryComponent,
    FooterComponent,
    SearchComponent,
    PageErrorComponent,
    GroContactComponent,
    CartReplaceDialogComponent,
    GroCategoryStoreComponent,
    SearchStoreComponent,
    StoreListComponent,
    CartBarComponent,
    FavoriteStoreComponent,
    GroFavoriteComponent,
    AppToastsComponent,
    AddressListComponent,
    AddressDetailComponent,
    PageNotFoundComponent,
    UserComponent
  ],
  entryComponents: [
    CartReplaceDialogComponent,
    LocationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxSpinnerModule,
    NgbModule
  ],
  providers: []
})
export class GroModule { }
