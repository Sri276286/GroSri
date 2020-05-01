import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreDashboardComponent } from './components/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    StoreDashboardComponent
  ],
  exports: [
    StoreDashboardComponent
  ]
})
export class StoreModule { }
