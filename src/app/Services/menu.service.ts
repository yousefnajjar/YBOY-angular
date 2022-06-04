import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from './home.service';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http:HttpClient,private toster:ToastrService
    ,private home:HomeService) { }


    public userInfo:any = {}
  
 
      
 host:string="https://localhost:44353/";
  getUserByEmail(){

    let token:any=localStorage.getItem('token');
   let data:any= jwt_decode(token.toString());

    var body={
      user_email:data.email
    }

    this.http.post(this.host+"api/User_Login/GETUSERBYEMAIL/",body).subscribe((res:any)=>{
      
        this.userInfo=res;
 
    },err=>{

    })
  }

  GetAllAvailableCategoryProduct(){
    this.http.get(this.host+"api/Product/GetAllAvailableCategoryProduct").subscribe((res:any)=>{
    },err=>{
      this.toster.warning(err.message)
    })
  }

// product:any=[];
  Createorder(productList:any,price:any){
   
  let body={
    product_id:productList,
    user_id:this.userInfo.user_id,
    product_price:price
    }
    this.http.post(this.host+"api/Order_Product/CreateOrder_product",body).subscribe((res:any)=>{
      this.toster.success("Order Added to Cart");
    },err=>{
      this.toster.warning(err.message)
    })
  }
  
}
