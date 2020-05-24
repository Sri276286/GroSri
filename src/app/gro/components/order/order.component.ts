import { Component, OnInit, TemplateRef } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/common/services/toast.service';

@Component({
  selector: 'gro-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class GroOrderComponent implements OnInit {

  current_orders = [];
  past_orders = [];
  constructor(private _service: OrderService,
    private _modalService: NgbModal,
    private _toastService: ToastService) {
  }

  ngOnInit() {
    this._service.getOrders().subscribe((res: any) => {
      if (res && res.orders) {
        this.current_orders = res.orders.filter((order) => {
          return order.orderStatus.toLowerCase() === 'placed';
        });
        console.log('current orders ', this.current_orders);
        this.past_orders = res.orders.filter((order) => {
          return order.orderStatus.toLowerCase() === 'delivered';
        });
        console.log('past orders ', this.past_orders);
      }
    });
  }

  trackOrder(trackTemplate: TemplateRef<any>) {
    this._modalService.open(trackTemplate, { centered: true });
  }

  cancelOrder(cancelTemplate: TemplateRef<any>) {
    this._modalService.open(cancelTemplate, { centered: true });
  }

  cancel(id: string) {
    this._service.cancelOrder(id).subscribe(() => {
      this._modalService.dismissAll();
      // show success snackbar
      this._toastService.show(`Order #${id} cancelled successfully`);
    }, () => {
      this._modalService.dismissAll();
      // show failed snackbar
      this._toastService.show(`Failed to cancel order #${id}`);
    });
  }
}
