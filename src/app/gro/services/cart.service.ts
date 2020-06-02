import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { ApiConfig } from 'src/app/config/api.config';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartReplaceDialogComponent } from '../components/floating-modal/cart-replace-dialog/replace-dialog.component';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartQuantity$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  cartEntity$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public cartEntityMap = new Map();
  public cartEntity = {
    storeId: null,
    total: 0,
    orderProducts: []
  };
  private cartQuantity = 0;
  private storeCartDetails;

  constructor(private _http: HttpClient,
    private _modalService: NgbModal,
    private _commonService: CommonService) {
  }

  /**
   * API to load cart details
   */
  getCartItems() {
    const isLoggedIn = this._commonService.isLogin();
    if (isLoggedIn) {
      return this._http.get(`${ApiConfig.commonCartAndOrderURL}/IN_CART`)
        .pipe(map((res: any) => {
          console.log('res cart ', res);
          const cart = res && res.orders && res.orders.length && res.orders[0];
          console.log('cart ', cart);
          this.storeCartDetails = cart;
          if (cart && cart.billTotal && cart.orderProducts) {
            this.cartEntityMap.set(cart.store.id, cart);
            this.manageCart(cart.orderProducts.length, cart);
          } else {
            // show error
          }
          return cart;
        }, () => {
          // show error
          return throwError(`Failed to get details`);
        }));
    } else {
      let cart = this.getCart();
      if (cart) {
        return of(cart).pipe(map(() => {
          this.cartEntityMap.set(cart.storeId, cart);
          this.manageCart(cart.orderProducts.length, cart);
        }))
      } else {
        return throwError('Cannot fetch details');
      }
    }
  }

  /**
   * Push to BE when item is added or removed
   * @param item
   */
  postToCart(item) {
    const entity = {
      storeInventoryProductUnitId: item.storeInventoryProductUnitId,
      quantity: item.quantity,
      customerId: "1"
    };
    console.log('eeeeeeee ', entity);
    this._http.put(ApiConfig.cartUpdateURL, entity).subscribe(() => {
      this.updateCart(item);
    });
  }

  /**
   * API call to clear items in cart
   */
  clearCart() {
    const id = this.storeCartDetails && this.storeCartDetails.id;
    return this._http.delete(`${ApiConfig.orderURL}/${id}/delete`);
  }

  resetCart() {
    this.cartEntity$.next(null);
    this.cartQuantity$.next(0);
    this.cartEntityMap = new Map();
    this.cartEntity = {
      storeId: null,
      total: 0,
      orderProducts: []
    };
    this.cartQuantity = 0;
    localStorage.removeItem('cartEntity');
  }

  addItems(item) {
    item.quantity++;
    const isLoggedIn = this._commonService.isLogin();
    console.log('is logged in ', isLoggedIn);
    if (isLoggedIn) {
      this.postToCart(item);
    } else {
      this.updateCart(item);
    }
  }

  removeItems(item) {
    item.quantity--;
    const isLoggedIn = this._commonService.isLogin();
    if (isLoggedIn) {
      this.postToCart(item);
    } else {
      this.updateCart(item);
    }
  }

  private updateCart(item) {
    console.log('cartEntity ', JSON.stringify(this.cartEntity));
    console.log('item ', item);
    // check if already items presnt in cart (same or different store)
    let cartEntityFromMap = this.checkCartByStoreId(item.storeId);
    console.log('checkCartWithStore ', JSON.stringify(cartEntityFromMap));
    if (cartEntityFromMap) {
      this.cartEntity = cartEntityFromMap;
      this.handleCartEntity(item);
    } else {
      // check if any store are in cart
      let cartMapLength = this.cartEntityMap.size;
      console.log('cart map length ', cartMapLength);
      if (cartMapLength) {
        this._commonService.canProceedUpdatingCart = false;
        // show an alert to proceed
        this.showAlert();
        this._commonService.proceedUpdatingCart$.subscribe((proceed) => {
          if (proceed) {
            this.handleCartEntity(item);
          }
        });
      } else {
        // directly add items
        this.handleCartEntity(item);
      }
    }
  }

  private checkCartByStoreId(id: string) {
    return this.cartEntityMap.get(id);
  }

  private handleCartEntity(item) {
    console.log('item handle ', item);
    console.log('cart eeeeee ', JSON.stringify(this.cartEntity));
    let isItemInCart = this.cartEntity && this.cartEntity.orderProducts.find(t => t.storeInventoryProductUnitId === item.storeInventoryProductUnitId);
    let itemIndex = isItemInCart && this.cartEntity && this.cartEntity.orderProducts.indexOf(isItemInCart);
    console.log('item index ', itemIndex);
    console.log('isItemInCart ', isItemInCart);
    if (!isItemInCart) {
      this.cartEntity.orderProducts = [...this.cartEntity.orderProducts, item];
      console.log('here ', this.cartEntity.orderProducts);
      this.cartEntity.total += item.price;
      this.cartQuantity++;
    } else {
      if (item && item.quantity) {
        this.cartEntity.orderProducts[itemIndex] = item;
        this.cartEntity.total += item.price;
      } else {
        this.cartEntity.orderProducts.splice(itemIndex, 1);
        this.cartEntity.total -= item.price;
        this.cartQuantity--;
      }
    }
    // Add store id
    this.cartEntity.storeId = item.storeId;
    // Map cart with id
    this.cartEntityMap.set(item.storeId, this.cartEntity);
    // save in local storage
    const isLoggedIn = this._commonService.isLogin();
    if (!isLoggedIn) {
      this.setInLocalStorage();
    }
    console.log('cart entity end ', JSON.stringify(this.cartEntity));
    this.manageCart(this.cartQuantity, this.cartEntity);
  }

  private getRequiredItem(item) {
    console.log('item => ', item);
    return {
      "storeInventoryProductId": item.storeInventoryProductId,
      "quantity": item.quantity || 0,
      "mrp": item.mrp,
      "price": item.price,
      "weight": item.weight,
      "unit": item.unit,
      "productImgUrl": item.productImgUrl,
      "itemShortDescription": item.itemShortDescription,
      "brandName": item.brandName,
      "max_quantity": item.max_quantity,
      "available_quantity": item.available_quantity
    };
  }

  placeOrder() {
    const obj = {
      "orderAddress": {
        "flatNo": 35,
        "country": "India",
        "state": "TN",
        "pincode": "600091",
        "street": "kamarajar street",
        "city": "chennai",
        "area": "porur"
      },
      "orderStatus": "PLACED"
    };
    return this._http.put(ApiConfig.placeOrderURL, obj);
  }

  getFromLocalStorage() {
    let cart = this.getCart();
    console.log('cart ', cart);
    if (cart && cart.orderProducts && cart.orderProducts.length) {
      cart.orderProducts = this.mapCart(cart.orderProducts);
      this.postToCart(cart);
    }
  }

  setInLocalStorage() {
    localStorage.setItem(`cartEntity`, JSON.stringify(this.cartEntity));
  }

  private getCart() {
    let cartEntity = localStorage.getItem('cartEntity');
    let cart = cartEntity ? JSON.parse(cartEntity) : null;
    return cart;
  }

  private mapCart(cart) {
    return cart.map(t => this.getRequiredItem(t));
  }

  private manageCart(cartQuantity: number, cartEntity: any) {
    this.cartEntity$.next(cartEntity);
    this.cartQuantity$.next(cartQuantity);
  }

  public showAlert() {
    this._modalService.open(CartReplaceDialogComponent);
  }

}
