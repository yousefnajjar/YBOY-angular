import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from './home.service';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private spinner:NgxSpinnerService,private http:HttpClient,
    private toster:ToastrService) { }

    allProduct:any=[]
    allOrder:any=[]

    userInfo:any = {}
    host:string="https://localhost:44353/";
 
    getUserByEmail(){
      let token:any=localStorage.getItem('token');
     let data:any= jwt_decode(token.toString());
  
      var body={
        user_email:data.email
      }
  
      this.spinner.show();
      this.http.post(this.host+"api/User_Login/GETUSERBYEMAIL/",body).subscribe((res:any)=>{
        
          this.userInfo=res;
          
         this.GetAllOrderForUser();
         this.GetAllProductForUser();
         this.spinner.hide();

      },err=>{
  
      })
    }

  GetAllProductForUser(){
    let body={
      user_id:this.userInfo.user_id
    }
    
    this.http.post(this.host+"api/User_order/GetAllProductForUser",body).subscribe((res:any)=>{
      this.allProduct=res;
    },err=>{
      this.toster.warning(err.message)
    })
  }


  GetAllOrderForUser(){

    let body={
      user_id:this.userInfo.user_id
    }

    this.http.post(this.host+"api/User_order/GetAllOrderForUser",body).subscribe((res:any)=>{
     
    this.allOrder=res;
    
    },err=>{
      this.toster.warning(err.message)
    })
  }

  Deleteorder(id:any){

  
    this.http.delete(this.host+"api/User_order/Deleteorder/"+id).subscribe((res:any)=>{
     
 
    },err=>{
      this.toster.warning(err.message)
    })
  }


  UpdateOrder_product_count(list:any){
    this.http.put(this.host+"api/Order_Product/UpdateOrder_product_count",list).subscribe((res:any)=>{
     
    },err=>{
      this.toster.warning(err.message)
    })
  }

  UpdateOrder_Total_amount(order_id:any,listProduct:any,quntity:any){

    let body={
      order_id:order_id,
      orderWithProductForUsers:listProduct,
      quntity:quntity

    }

    this.http.put(this.host+"api/User_order/UpdateOrder_Total_amount",body).subscribe((res:any)=>{
     
    },err=>{
      this.toster.warning(err.message)
    })
  }

  Plus_(order_id:any,price:any,quntity:any){
    let body={
      order_id:order_id,
      product_price:price,
      quntity:quntity
    }

    this.http.put(this.host+"api/User_order/Plus_/",body).subscribe((res:any)=>{
     
    },err=>{
      this.toster.warning(err.message)
    })

  }

  Minus_(order_id:any,price:any,quntity:any){
    let body={
      order_id:order_id,
      product_price:price,
      quntity:quntity
    }

    this.http.put(this.host+"api/User_order/Minus_/",body).subscribe((res:any)=>{
     
    },err=>{
      this.toster.warning(err.message)
    })

  }

// location
 location:any={}

getLocationByUserId(){
  let body={
    user_id:this.userInfo.user_id
  }

 

    this.http.post(this.host+"api/Locations/getLocationByUserId/", body).subscribe((res:any)=>{
    this.location=res;

    
    },err=>{
      this.toster.warning(err.message)
    })
  }

  saveLocation(body:any){

    body.user_id=this.userInfo.user_id;
    if(this.location == null){
      this.createLocation(body);
      
    }else if(this.location != null){
      this.updateLocation(body);
    
    }

    
  }
  createLocation(body:any){

    this.http.post(this.host+"api/Locations/createLocation",body).subscribe((res:any)=>{

    },err=>{
      this.toster.warning(err.message)
    })
  }

  updateLocation(body:any){

    this.http.put(this.host+"api/Locations/updateLocation",body).subscribe((res:any)=>{

    },err=>{
      this.toster.warning(err.message)
    })
  }


  statusPendingAndPaymentOnline(list:any){

    this.http.put(this.host+"api/User_order/statusPendingAndPaymentOnline",list).subscribe((res:any)=>{

    },err=>{
      this.toster.warning(err.message)
    })
  }

  SendAcceptedOrderMail(){

    let body={
      name:this.userInfo.fname,
      email:this.userInfo.user_email
    }

    this.http.post(this.host+"api/Mail/SendAcceptedOrderMail",body).subscribe((res:any)=>{

    },err=>{
      this.toster.warning(err.message)
    })
  }

  statusPendingAndPaymentCash(list:any){

    this.http.put(this.host+"api/User_order/statusPendingAndPaymentCash",list).subscribe((res:any)=>{

    },err=>{
      this.toster.warning(err.message)
    })
  }
}
