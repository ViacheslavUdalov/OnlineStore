import {Component, OnInit} from '@angular/core';
import {IProduct} from "../../shared/models/product";
import {ShopService} from "../shop.service";
import {ActivatedRoute} from "@angular/router";
import {BreadcrumbService} from "xng-breadcrumb";
import {BasketService} from "../../basket/basket.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{
product: IProduct;
quantity = 1;
constructor(private shopService: ShopService,
            private activateRoute: ActivatedRoute,
            private bcService: BreadcrumbService,
            private basketService: BasketService) {
  this.bcService.set('@productDetails', '')
}
ngOnInit() {
  this.loadProduct();
  console.log(this.product)
}
addItemToBasket() {
  // if (this.product) {
    this.basketService.addItemToBasket(this.product, this.quantity)
  // }
}
incrementQuantity() {
  this.quantity++;
}
  decrementQuantity() {
  if (this.quantity > 1) {
    this.quantity--;
  }
  }
  loadProduct() {
  this.shopService.getProduct(+this.activateRoute.snapshot.paramMap.get('id')).subscribe(response => {
    this.product = response;
    console.log(this.product)
    this.bcService.set('@productDetails', response.name)
  },  error => {
    console.log(error);
  })
}
}
