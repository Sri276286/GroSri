import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'gro-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class GroOrderDetailsComponent implements OnInit {

  items = [];
  constructor(public _service: OrderService,
    private _route: ActivatedRoute) {
    const id = this._route.snapshot.params.id;
    const order = this._service.getOrderById(id);
    this.items = order.items;
  }

  ngOnInit() {
  }
}
