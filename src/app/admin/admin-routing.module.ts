import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardContantComponent } from './dashboard-contant/dashboard-contant.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageAboutusComponent } from './manage-aboutus/manage-aboutus.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { ManageContactusComponent } from './manage-contactus/manage-contactus.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ManageOrderdoneComponent } from './manage-orderdone/manage-orderdone.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { ManageTestemonialComponent } from './manage-testemonial/manage-testemonial.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageWebsiteComponent } from './manage-website/manage-website.component';

const routes: Routes = [
  {
    path:'dashboard',
    component:DashboardComponent
  },
  {
    path:'',
    component:DashboardComponent
  },
  {
    path:'manage-aboutus',
    component:ManageAboutusComponent
  },
  {
    path:'dashboard-contant',
    component:DashboardContantComponent
  }
  ,
  {
    path:'manage-testemonial',
    component:ManageTestemonialComponent
  }
  ,
  {
    path:'manage-category',
    component:ManageCategoryComponent
  }
  ,
  {
    path:'manage-product',
    component:ManageProductComponent
  }
  ,
  {
    path:'manage-website',
    component:ManageWebsiteComponent
  }
  ,
  {
    path:'manage-contactus',
    component:ManageContactusComponent
  }
  ,
  {
    path:'manage-user',
    component:ManageUserComponent
  }
  ,
  {
    path:'manage-order',
    component:ManageOrderComponent
  },
  {
    path:'manage-orderdone',
    component:ManageOrderdoneComponent
  }
  ,
  {
    path:'manage-profile',
    component:ManageProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
