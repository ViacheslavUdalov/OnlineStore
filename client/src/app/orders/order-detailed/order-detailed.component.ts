import {Component, OnInit} from '@angular/core';
import {IOrder} from "../../shared/models/Order";
import {ActivatedRoute} from "@angular/router";
import {OrdersService} from "../orders.service";
import {BreadcrumbService} from "xng-breadcrumb";

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss']
})
export class OrderDetailedComponent implements OnInit{
  order: IOrder;
constructor(private route: ActivatedRoute, private orderService: OrdersService, private breadcrumService: BreadcrumbService) {
  this.breadcrumService.set('@OrderDetailed', '');
}

  ngOnInit(): void {
  this.orderService.getOrderDetailed(+this.route.snapshot.paramMap.get('id'))
    .subscribe((order: IOrder) => {
      this.order = order;
      this.breadcrumService.set('@OrderDetailed', `Order# ${order.id} - ${order.status}`)
    },error => {
      console.log(error);
    })
  }

}
