import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { CartService } from 'src/app/gro/services/cart.service';
import { CommonService } from 'src/app/gro/services/common.service';

@Component({
  selector: 'gro-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class GroOrderDetailsComponent implements OnInit {

  items = [];
  orderEntity;
  orderDetails;
  storeDetails;
  constructor(public _service: OrderService,
    private _route: ActivatedRoute,
    private _cartService: CartService,
    private _router: Router,
    private _commonService: CommonService) {
  }

  ngOnInit() {
    this._route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      this._service.getOrderById(id).subscribe((res: any) => {
        this.orderEntity = res.order;
        // this.orderDetails = this._commonService.getOrderDetailsFromId(res.orderId);
        console.log('res ', this.orderEntity);
        this.storeDetails = this.orderEntity && this.orderEntity.store;
        console.log('store details ', this.storeDetails);
        this.items = this.orderEntity.orderProductLstDTO;
      });
    });
  }

  reorder() {
    let cartEntity = {
      storeId: this.orderEntity.store && this.orderEntity.store.id,
      total: this.orderEntity.billTotal,
      items: this.orderEntity.orderProductLstDTO
    };
    console.log('itemssss ', cartEntity);
    let cart = localStorage.getItem('cartEntity');
    if (cart) {
      this._cartService.showAlert();
      this._commonService.proceedUpdatingCart$.subscribe((proceed) => {
        if (proceed) {
          this._handleCart(cartEntity);
        }
      });
    } else {
      this._handleCart(cartEntity);
    }
  }

  private _handleCart(cartEntity) {
    // localStorage.setItem('cartEntity', JSON.stringify(cartEntity));
    this._cartService.cartEntity$.next(cartEntity);
    this._cartService.cartQuantity$.next(cartEntity.items.length);
    this._cartService.cartEntityMap.set(this.orderEntity.store.id, cartEntity);
    this._router.navigate(['/cart']);
  }

}
