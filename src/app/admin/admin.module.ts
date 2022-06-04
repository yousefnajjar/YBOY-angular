import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageAboutusComponent } from './manage-aboutus/manage-aboutus.component';
import { DashboardContantComponent } from './dashboard-contant/dashboard-contant.component';
import { SharedModule } from '../shared/shared.module';
import { ManageTestemonialComponent } from './manage-testemonial/manage-testemonial.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManageWebsiteComponent } from './manage-website/manage-website.component';
import { ManageContactusComponent } from './manage-contactus/manage-contactus.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ManageOrderdoneComponent } from './manage-orderdone/manage-orderdone.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ManageAboutusComponent,
    DashboardContantComponent,
    ManageTestemonialComponent,
    ManageCategoryComponent,
    ManageProductComponent,
    ManageWebsiteComponent,
    ManageContactusComponent,
    ManageUserComponent,
    ManageOrderComponent,
    ManageOrderdoneComponent,
    ManageProfileComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],exports:[
    DashboardComponent
  ]
  
})
export class AdminModule { }
