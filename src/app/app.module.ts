import { BrowserModule } from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { SharedModule } from './shared/shared.module';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TestemonialComponent } from './testemonial/testemonial.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


import {MatDialogModule} from '@angular/material/dialog';
import{HttpClientModule, HTTP_INTERCEPTORS}from  '@angular/common/http'
import { ToastNoAnimationModule, ToastrModule } from 'ngx-toastr';
import { MenuComponent } from './menu/menu.component';
import { CartComponent } from './cart/cart.component';
import { UserunauthorizComponent } from './userunauthoriz/userunauthoriz.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutUsComponent,
    ContactUsComponent,
    TestemonialComponent,
    MenuComponent,
    CartComponent,
    UserunauthorizComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NgbModule,
    MatFormFieldModule,
    FormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    ToastNoAnimationModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    })
 
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
