import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChifRoutingModule } from './chif-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ViewOrderComponent } from './view-order/view-order.component';
import { DashboardComponent } from '../admin/dashboard/dashboard.component';


@NgModule({
  declarations: [
    ViewOrderComponent
  ],
  imports: [
    CommonModule,
    ChifRoutingModule,
    SharedModule
  ]
})
export class ChifModule { }
