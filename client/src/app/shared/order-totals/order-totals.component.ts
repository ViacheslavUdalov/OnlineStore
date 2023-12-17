import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {IBasketTotal} from "../models/basket";
import {BasketService} from "../../basket/basket.service";

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.scss']
})
export class OrderTotalsComponent implements OnInit{
  basketTotals$: Observable<IBasketTotal>
  constructor(private basketService: BasketService) {
  }
ngOnInit() {
    this.basketTotals$ = this.basketService.basketTotal$
}
}
