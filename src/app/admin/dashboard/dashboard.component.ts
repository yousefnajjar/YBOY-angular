import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router:Router) { }

 token:any=localStorage.getItem("token");
  ngOnInit(): void {

    
    this.token=jwt_decode(this.token);
  
    
  }


  manageAboutus(){
   
    this.router.navigate(['admin/manage-aboutus']);
  }

  
  manageTestemonial(){
    
    this.router.navigate(['admin/manage-testemonial']);
  }
  dashboard(){
   
    this.router.navigate(['admin/dashboard-contant']);
  }
  manageCategory(){
   
    this.router.navigate(['admin/manage-category']);
  }
  manageProduct(){
 
    this.router.navigate(['admin/manage-product']);
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['auth/login']);
  }
  manageWebsite(){
    this.router.navigate(['admin/manage-website']);
  }

  manageContactus(){
    this.router.navigate(['admin/manage-contactus']);
  }
  manageUser(){
    this.router.navigate(['admin/manage-user']);
  }
  manageOrder(){
    this.router.navigate(['admin/manage-order']);
  }
  manageOrderDone(){
    this.router.navigate(['admin/manage-orderdone']);
  }
  manageProfile(){
    this.router.navigate(['admin/manage-profile']);
  }

  orderAccepted(){
    this.router.navigate(['driver/order-accepted']);
  }

  allOrders(){
    this.router.navigate(['driver/view-order']);
  }
  OrderDeliverd(){

    this.router.navigate(['driver/order-deliverd']);
  }
}
