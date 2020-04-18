import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'gro-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class GroOrderComponent implements OnInit {

  orders = [];
  constructor(public _service: OrderService) {
    this._service.fetchOrders();
  }

  ngOnInit() {
  }
}
