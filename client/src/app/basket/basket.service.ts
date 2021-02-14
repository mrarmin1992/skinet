import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Basket, IBasket, IBasketItem, IBasketTotals } from '../shared/models/basket';
import { IProduct } from '../shared/models/product';


@Injectable({
  providedIn: 'root'
})
export class BasketService {
baseUrl = environment.apiUrl;
private basketSource = new BehaviorSubject<IBasket>(null);
basket$ = this.basketSource.asObservable();
private basketTotalSource = new BehaviorSubject<IBasketTotals>(null);
basketTotal$ = this.basketTotalSource.asObservable();


 constructor(private http: HttpClient) { }

 // tslint:disable-next-line: typedef
 getBasket(id: string) {
   return this.http.get(this.baseUrl + 'basket?id=' + id)
   .pipe(map((basket: IBasket | any) => {
       this.basketSource.next(basket);
       this.calculateTotals();
     })
     );
 }
 // tslint:disable-next-line: typedef
 setBasket(basket: IBasket){
   return this.http.post(this.baseUrl + 'basket', basket).subscribe((response: IBasket | any) => {
     this.basketSource.next(response);
     this.calculateTotals();
   }, error => {
     console.log(error);
   });
 }

 // tslint:disable-next-line: typedef
 getCurrentBasketValue() {
    return this.basketSource.value;
 }
// tslint:disable-next-line: typedef
addItemToBasket(item: IProduct, quantity= 1) {
  const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(item, quantity);
  let basket = this.getCurrentBasketValue();
  if (basket === null) {
    basket = this.createBasket();
  }
  console.log(basket);
  basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
  this.setBasket(basket);
}

// tslint:disable-next-line: typedef
incrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x => x.id === item.id);
    basket.items[foundItemIndex].quantity++;
    this.setBasket(basket);
}

// tslint:disable-next-line: typedef
decrementItemQuantity(item: IBasketItem) {
  const basket = this.getCurrentBasketValue();
  const foundItemIndex = basket.items.findIndex(x => x.id === item.id);
  if (basket.items[foundItemIndex].quantity > 1) {
    basket.items[foundItemIndex].quantity--;
    this.setBasket(basket);
  } else {
    this.removeItemFromBasket(item);
  }

}
  // tslint:disable-next-line: typedef
  removeItemFromBasket(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    if (basket.items.some(x => x.id === item.id)){
      basket.items = basket.items.filter(i => i.id !== item.id);
      if (basket.items.length > 0) {
        this.setBasket(basket);
      } else {
        this.deleteBasket(basket);
      }
    }
  }
  // tslint:disable-next-line: typedef
  deleteBasket(basket: IBasket) {
    return this.http.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe((respons: IBasket | any) => {
      this.basketSource.next(respons);
      this.basketTotalSource.next(respons);
      localStorage.removeItem('basket');
    }, error => {
      console.log(error);
    });
  }




  // tslint:disable-next-line: typedef
  private calculateTotals() {
    const basket = this.getCurrentBasketValue();
    const shipping = 0;
    const subtotal = basket.items.reduce((a , b) => (b.price * b.quantity) + a, 0);
    const total = subtotal + shipping;
    this.basketTotalSource.next({shipping, total, subtotal});
  }

  private addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
    console.log(items);
    const index = items.findIndex(i => i.id === itemToAdd.id);
    if (index === -1) {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    } else {
      items[index].quantity += quantity;
    }
    return items;
  }
  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }
  private mapProductItemToBasketItem(item: IProduct, quantity: number): IBasketItem {
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

}
