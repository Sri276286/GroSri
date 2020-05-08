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
  itemsEntity;
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
        console.log('res ', res);
        this.orderDetails = this._commonService.getOrderDetailsFromId(res.orderId);
        this.storeDetails = this._commonService.getStoreDetailsFromId(res.storeId);
        console.log('order details ', this.orderDetails);
        console.log('store details ', this.storeDetails);
        this.itemsEntity = res;
        this.items = res.items;
      });
    });
  }

  reorder() {
    let cartEntity = {
      storeId: this.itemsEntity.storeId,
      total: this.itemsEntity.total,
      items: this.itemsEntity.items
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
    localStorage.setItem('cartEntity', JSON.stringify(cartEntity));
    this._cartService.cartEntity$.next(cartEntity);
    this._cartService.cartQuantity$.next(cartEntity.items.length);
    this._cartService.cartEntityMap.set(this.itemsEntity.storeId, cartEntity);
    this._router.navigate(['/cart']);
  }

}
