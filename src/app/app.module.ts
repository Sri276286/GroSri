import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GroComponent } from './gro/gro.component';
import { AppRoutingModule } from './app-routing.module';
import { GroHomeComponent } from './gro/home/home.component';
import { GroStoreComponent } from './gro/store/store.component';
import { GroCartComponent } from './gro/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    GroComponent,
    GroHomeComponent,
    GroStoreComponent,
    GroCartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
