import {Component, OnInit} from '@angular/core';
import {BasketService} from "./basket/basket.service";
import {AccountService} from "./account/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'client';
  constructor(private basketService: BasketService, private accountService: AccountService, public router: Router) {
  }
  ngOnInit() {
this.loadBasket();
this.loadCurrentUser();
  }
  loadBasket() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe(() => {
        console.log('initialized basket')
      }, error =>  {
        console.log(error);
      })
    }
  }
  loadCurrentUser() {
    const token = localStorage.getItem('token');
      this.accountService.loadCurrentUser(token).subscribe(() => {
        console.log('loaded user');
      }, error => {
        console.log(error);
      })
  }
}
