import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailedComponent } from './order-detailed/order-detailed.component';
import {RouterLink} from "@angular/router";
import {OrdersRoutingModule} from "./orders-routing.module";



@NgModule({
  declarations: [
    OrdersComponent,
    OrderDetailedComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
