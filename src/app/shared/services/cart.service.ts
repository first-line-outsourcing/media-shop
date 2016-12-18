import { Injectable } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class Cart {
  cart: any;

  constructor(private toastr: ToastsManager) {
    try {
      if (JSON.parse(localStorage.getItem('cart'))) {
        this.cart = JSON.parse(localStorage.getItem('cart'));
      } else {
        this.cart = [];
      }
    } catch (e) {
      console.log(e);
      this.toastr.error('Failed to get the goods', 'Success!');
    }

    this.updateCartLS(this.cart);
  }

  public addToCart(product) {
    this.cart.push(product);
    this.updateCartLS(this.cart);
    this.toastr.success('Product added to cart', 'Success!');
  }

  public getCart() {
    return this.cart;
  }

  public deleteItem(key) {
    this.cart.splice(key, 1);
    this.updateCartLS(this.cart);
    this.toastr.success('Item is removed cart', 'Success!');
  }

  public get countCart() {
    return this.cart.length;
  }

  public get Total() {
    let price = 0.0;
    this.cart.forEach((item) => {
      price += item.price;
    });
    return price.toFixed(2);
  }

  clearCart() {
    this.cart = [];
    this.updateCartLS(this.cart);
    this.toastr.success('Cart clear', 'Success!');
  }


  updateCartLS(basket) {
    localStorage.setItem('cart', JSON.stringify(basket));
  }


}
