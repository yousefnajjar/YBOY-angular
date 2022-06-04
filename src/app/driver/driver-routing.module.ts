import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderAcceptedComponent } from './order-accepted/order-accepted.component';
import { OrderDeliverdComponent } from './order-deliverd/order-deliverd.component';
import { ViewOrderComponent } from './view-order/view-order.component';

const routes: Routes = [
  {
    path:"view-order",
    component:ViewOrderComponent
  },
  {
    path:"order-accepted",
    component:OrderAcceptedComponent
  },
  {
    path:"order-deliverd",
    component:OrderDeliverdComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverRoutingModule { }
