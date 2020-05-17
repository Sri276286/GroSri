import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { ApiConfig } from 'src/app/config/api.config';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartReplaceDialogComponent } from '../components/floating-modal/cart-replace-dialog/replace-dialog.component';
import { CommonService } from './common.service';
import { LoginService } from 'src/app/common/services/login.service';

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
    items: []
  };
  private cartQuantity = 0;

  constructor(private _http: HttpClient,
    private _modalService: NgbModal,
    private _commonService: CommonService) {
  }

  /**
   * Push to BE when item is added or removed
   * @param item
   */
  postToCart(item) {
    const entity = {
      "storeInventoryProductUnitId": item.storeId,
      "quantity": item.quantity
    };
    this._http.put(ApiConfig.cartUpdateURL, entity).subscribe();
  }

  resetCart() {
    this.cartEntity$.next(null);
    this.cartQuantity$.next(0);
    this.cartEntityMap = new Map();
    this.cartEntity = {
      storeId: null,
      total: 0,
      items: []
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
    console.log('item ', item);
    // check if already items presnt in cart (same or different store)
    let cartEntityFromMap = this.checkCartByStoreId(item.storeDetailsId);
    console.log('checkCartWithStore ', cartEntityFromMap);
    console.log('cartEntity ', this.cartEntity);
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
    let isItemInCart = this.cartEntity && this.cartEntity.items.find(t => t.id === item.id);
    let itemIndex = isItemInCart && this.cartEntity && this.cartEntity.items.indexOf(isItemInCart);
    console.log('item index ', itemIndex);
    console.log('isItemInCart ', isItemInCart);
    if (!isItemInCart) {
      this.cartEntity.items = [...this.cartEntity.items, item];
      console.log('here ', this.cartEntity.items);
      this.cartEntity.total += item.price;
      this.cartQuantity++;
    } else {
      if (item && item.quantity) {
        this.cartEntity.items[itemIndex] = item;
        this.cartEntity.total += item.price;
      } else {
        this.cartEntity.items.splice(itemIndex, 1);
        this.cartEntity.total -= item.price;
        this.cartQuantity--;
      }
    }
    console.log('cart entity ', this.cartEntity);
    // Add store id
    this.cartEntity.storeId = item.storeDetailsId;
    // Map cart with id
    this.cartEntityMap.set(item.storeDetailsId, this.cartEntity);
    // save in local storage
    this.setInLocalStorage();

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

  placeOrder(order) {
    return this._http.post('/api/order', order);
  }

  getFromLocalStorage() {
    let cart = this.getCart();
    console.log('cart ', cart);
    if (cart && cart.items && cart.items.length) {
      cart.items = this.mapCart(cart.items);
      this.postToCart(cart);
    }
  }

  getCartItems() {
    const isLoggedIn = this._commonService.isLogin();
    if (isLoggedIn) {
      return this._http.get(ApiConfig.cartURL)
        .pipe(map((res: any) => {
          if (res && res.total && res.items) {
            this.cartEntityMap.set(res.storeId, res);
            localStorage.setItem(`cartEntity`, JSON.stringify(res));
            this.manageCart(res.items.length, res);
          } else {
            // show error
          }
        }, () => {
          // show error
        }));
    } else {
      let cart = this.getCart();
      if (cart) {
        return of(cart).pipe(map(() => {
          this.cartEntityMap.set(cart.storeId, cart);
          this.manageCart(cart.items.length, cart);
        }))
      }
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
