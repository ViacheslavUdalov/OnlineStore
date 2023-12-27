import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';
import {CarouselModule} from "ngx-bootstrap/carousel";
import {PaginationModule} from "ngx-bootstrap/pagination";
import { OrderTotalsComponent } from './order-totals/order-totals.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import { TextInputComponent } from './components/text-input/text-input.component';
import {CdkStepperModule} from "@angular/cdk/stepper";
import { StepperComponent } from './components/stepper/stepper.component';
import { BasketSummaryComponent } from './components/basket-summary/basket-summary.component';
import {RouterLink} from "@angular/router";
import { SliderComponent } from './components/slider/slider.component';
import {HammerModule} from "@angular/platform-browser";
import { FooterComponent } from './components/footer/footer.component';



@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagerComponent,
    OrderTotalsComponent,
    TextInputComponent,
    StepperComponent,
    BasketSummaryComponent,
    SliderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    CdkStepperModule,
    RouterLink,
    HammerModule,
    FormsModule
  ],
  exports: [PaginationModule,
    PagingHeaderComponent,
    PagerComponent,
    CarouselModule,
    OrderTotalsComponent,
    ReactiveFormsModule,
    BsDropdownModule,
    TextInputComponent,
    CdkStepperModule,
    StepperComponent,
    BasketSummaryComponent,
    SliderComponent,
    FooterComponent,
    FormsModule
  ]
})
export class SharedModule { }
