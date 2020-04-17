import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'gro-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class GroOrderDetailsComponent implements OnInit {

  items = [];
  constructor(public _service: OrderService,
    private _route: ActivatedRoute) {
    console.log('order details');
    console.log('route ', this._route.snapshot.params);
    const id = this._route.snapshot.params.id;
    const order = this._service.getOrderById(id);
    console.log('order ', order);
    this.items = order.items;
  }

  ngOnInit() {
  }
}
