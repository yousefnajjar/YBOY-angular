import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverRoutingModule } from './driver-routing.module';
import { ViewOrderComponent } from './view-order/view-order.component';
import { SharedModule } from '../shared/shared.module';
import { AdminModule } from '../admin/admin.module';
import { OrderAcceptedComponent } from './order-accepted/order-accepted.component';
import { OrderDeliverdComponent } from './order-deliverd/order-deliverd.component';



@NgModule({
  declarations: [
    ViewOrderComponent,
    OrderAcceptedComponent,
    OrderDeliverdComponent
  ],
  imports: [
    CommonModule,
    DriverRoutingModule,
    SharedModule,
    AdminModule
    
  ]
})
export class DriverModule { }
