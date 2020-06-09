import { Component, OnInit, TemplateRef } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/common/services/toast.service';
import { OrderConstants } from '../../constants/order.constants';

@Component({
  selector: 'gro-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class GroOrderComponent implements OnInit {

  current_orders = [];
  past_orders = [];
  currentRate = 0;
  canReview: boolean = false;
  placedStatus = OrderConstants.PLACED;
  deliveredStatus = OrderConstants.DELIVERED;
  cancelledStatus = OrderConstants.CUSTOMER_CANCELLED;
  storeCancelledStatus = OrderConstants.STORE_CANCELLED;
  isStoreRated: boolean = false;
  constructor(private _service: OrderService,
    private _modalService: NgbModal,
    private _toastService: ToastService) {
  }

  ngOnInit() {
    this.getOrders();
  }

  /**
   * Get All orders except in cart
   */
  getOrders() {
    this._service.getOrders().subscribe((res: any) => {
      if (res && res.orders) {
        this.current_orders = res.orders.filter((order) => {
          return order.orderStatus === OrderConstants.PLACED;
        });
        this.past_orders = res.orders.filter((order) => {
          const status = (order.orderStatus === OrderConstants.DELIVERED)
            || (order.orderStatus === OrderConstants.CUSTOMER_CANCELLED)
            || (order.orderStatus === OrderConstants.STORE_CANCELLED);
          console.log('status ', status);
          return status;
        });
        console.log('placed orders ', this.current_orders);
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
      this.getOrders();
      this._modalService.dismissAll();
      // show success snackbar
      this._toastService.show(`Order #${id} cancelled successfully`);
    }, () => {
      this._modalService.dismissAll();
      // show failed snackbar
      this._toastService.show(`Failed to cancel order #${id}`);
    });
  }

  rateStore(ratingTemplate: TemplateRef<any>) {
    this._modalService.open(ratingTemplate, { centered: true });
  }

  rateDelivery(ratingTemplate: TemplateRef<any>) {
    this._modalService.open(ratingTemplate, { centered: true });
  }

  onRateChange(rate) {
    this.canReview = true;
  }
}
