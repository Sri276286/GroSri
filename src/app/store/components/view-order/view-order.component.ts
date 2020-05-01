import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'store-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {

  isActive: boolean = true;
  isActiveg: boolean = true;


  constructor() { }

  ngOnInit(): void {
  }

  setEdit(){
    console.error("th"+this.isActive);
    this.isActive =!this.isActive;
    console.error(this.isActive);
  }

}
