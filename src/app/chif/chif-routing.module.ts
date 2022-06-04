import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../admin/dashboard/dashboard.component';
import { ViewOrderComponent } from './view-order/view-order.component';

const routes: Routes = [

  {
    path:"view-order",
    component:ViewOrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChifRoutingModule { }
