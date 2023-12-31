import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Basket, IBasket, IBasketItem, IBasketTotal} from "../shared/models/basket";
import {map} from "rxjs/operators";
import {IProduct} from "../shared/models/product";
import {IDeliveryMethod} from "../shared/models/deliveryMethod";

@Injectable({
  providedIn: 'root'
})
export class BasketService {
baseURL = 'https://localhost:5001/api/';
private basketSource = new BehaviorSubject<IBasket>(null);
basket$ = this.basketSource.asObservable();
private basketTotalSource = new BehaviorSubject<IBasketTotal>(null);
basketTotal$ = this.basketTotalSource.asObservable();
shipping = 0;
  constructor(private http: HttpClient) { }
  setShippingPrice(deliveryMethod: IDeliveryMethod) {
    this.shipping = deliveryMethod.price;
    this.calculateTotals();
  }
  getBasket(id: string) {
    return this.http.get(this.baseURL + 'basket?id=' + id)
      .pipe(
        map((basket: IBasket) => {
          this.basketSource.next(basket);
          this.calculateTotals();
        })
      )
  }
  incrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x => x.id === item.id);
    basket.items[foundItemIndex].quantity++;
  this.setBasket(basket);
  }
  decrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x => x.id === item.id);
    if (basket.items[foundItemIndex].quantity > 1) {
      basket.items[foundItemIndex].quantity--
    } else {
      this.removeItemFromBasket(item);
    }
    this.setBasket(basket);
  };
  removeItemFromBasket(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    if (basket.items.some(x => x.id === item.id)) {
      basket.items = basket.items.filter(i => i.id !== item.id);
      if (basket.items.length > 0) {
        this.setBasket(basket);
      } else {
        this.deleteBasket(basket);
      }
    }
  }
  setBasket(basket: IBasket) {
    console.log(basket)
    return this.http.post(this.baseURL + 'basket', basket).subscribe((response: IBasket) => {
      this.basketSource.next(response);
      this.calculateTotals();
    }, error => {
      console.log(error);
    })
  }
getCurrentBasketValue() {
    return this.basketSource.value
}
private calculateTotals() {
    const basket = this.getCurrentBasketValue();
    const shipping = this.shipping;
    const subtotal = basket.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
    const total = subtotal + shipping;
    this.basketTotalSource.next({shipping, total, subtotal});
}
addItemToBasket(item: IProduct, quantity = 1) {
  const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(item, quantity);
  const basket = this.getCurrentBasketValue() ?? this.createBasket();
  basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
  this.setBasket(basket);
}

  private mapProductItemToBasketItem(item: IProduct, quantity: number) {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      quantity,
      brand: item.productBrand,
      type: item.productType
    };
  }

  private createBasket() {
const basket = new Basket();
localStorage.setItem('basket_id', basket.id);
return basket
  }

  private addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number) {
    console.log(items);
   const index = items.findIndex(i => i.id == itemToAdd.id);
   if (index === -1) {
     itemToAdd.quantity = quantity;
     items.push(itemToAdd);
   } else {
     items[index].quantity += quantity;
   }
   return items;
  }
deleteLocalBasket(id: string) {
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    localStorage.removeItem('basket_id');
}
  private deleteBasket(basket: IBasket) {
    return this.http.delete(this.baseURL + 'basket?id=' + basket.id).subscribe(() => {
      this.basketSource.next(null);
      this.basketTotalSource.next(null);
      localStorage.removeItem('basket_id');
    }, error => {
      console.log(error);
    })
  }
}
