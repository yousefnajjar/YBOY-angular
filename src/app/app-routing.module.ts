import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { CartComponent } from './cart/cart.component';
import { ChifModule } from './chif/chif.module';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DriverModule } from './driver/driver.module';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { TestemonialComponent } from './testemonial/testemonial.component';
import { UserunauthorizComponent } from './userunauthoriz/userunauthoriz.component';
import { YGuard } from './y.guard';

const routes: Routes = [
  {
    path:"about-us",
    component:AboutUsComponent
  },
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"home",
    component:HomeComponent
  },
  {
    path:"contact-us",
    component:ContactUsComponent
  },
  {
    path:"testimonial",
    component:TestemonialComponent
  },
  {
    path:"auth",
    loadChildren:()=>AuthModule
  },
  {
    path:"admin",
    loadChildren:()=>AdminModule,
    canActivate:[YGuard]
  },
  {
    path:"chef",
    loadChildren:()=>ChifModule,
    canActivate:[YGuard]
  },
  {
    path:"driver",
    loadChildren:()=>DriverModule,
    canActivate:[YGuard]
  }
  ,
  {
    path:"menu",
    component:MenuComponent
  }
  ,
  {
    path:"My-cart",
    component:CartComponent
  },
  {
    path:"userunauthoriz",
    component:UserunauthorizComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
