import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'gro-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class GroOrderComponent implements OnInit {

  current_orders = [];
  past_orders = [];
  constructor(public _service: OrderService) {
  }

  ngOnInit() {
    this._service.getOrders().subscribe((res: any) => {
      if (res && res.orders) {
        this.current_orders = res.orders.filter((order) => {
          return order.status.toLowerCase() === 'placed';
        });
        this.past_orders = res.orders.filter((order) => {
          return order.status.toLowerCase() === 'delivered';
        });
      }
    });
  }
}
