import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { render } from 'creditcardpayments/creditcardpayments';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../Services/cart.service';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  isEditable = true;

  constructor(public cart:CartService,private dialog:MatDialog
    ,private router:Router,private _formBuilder: FormBuilder, private toster:ToastrService) {

      

   }

   locationForm:FormGroup=new FormGroup({
    city:new FormControl('',Validators.required),
    area:new FormControl('',Validators.required),
    floor:new FormControl('',Validators.required),
    street:new FormControl('',Validators.required),
    apartment_number:new FormControl('',Validators.required),
    phone:new FormControl('',Validators.required),
    
   })

  total_amount:any=1.41;
  checked = false;
  CHECKOUT=true;
  
  ngOnInit(): void {

    this.cart.getUserByEmail();
    

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['',],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['',]
    });

  }
  
  @ViewChild('callUpdateDialog') callUpdateDialog!:TemplateRef<any>
  
  goToMenu(){

    this.router.navigate(["menu"]);
  }




  
  plus(product_id:any,order_id:any,price:any,quntity:any){
    

    for (let index = 0; index < this.cart.allProduct.length; index++) {
      if(this.cart.allProduct[index].product_id == product_id && this.cart.allProduct[index].order_id==order_id)
      {
        
        if(this.cart.allProduct[index].product_count > 2)
        {
          return
        }else {
          this.cart.allProduct[index].product_count++;
        }
      }
     
    }

    this.cart.Plus_(order_id,price,quntity);

  }
 
  minus(product_id:any,order_id:any,price:any,quntity:any){

    
    for (let index = 0; index < this.cart.allProduct.length; index++) {
     
      if(this.cart.allProduct[index].product_id == product_id && this.cart.allProduct[index].order_id==order_id)
      {
        if(this.cart.allProduct[index].product_count == 1)
        {
          return
        }else {
          this.cart.allProduct[index].product_count--;
        }
        
      }
    
     }

     this.cart.Minus_(order_id,price,quntity);
      
  }

  deleteOrder(order_id:any){

    this.cart.Deleteorder(order_id);
    this.ngOnInit();

  }


  saveProductCount(){


 
    this.cart.UpdateOrder_product_count(this.cart.allProduct);


    this.ngOnInit();

    for(var i=0; i< this.cart.allOrder.length; i++)
    {
      this.total_amount += this.cart.allOrder[i].total_amount;
    }

    this.cart.getLocationByUserId();

    const dialogRef=this.dialog.open(this.callUpdateDialog);

    
    dialogRef.afterClosed().subscribe((res)=>{
      this.total_amount=1.41;
    })
   
    
  }


  plusMeal(order_id:any,quntity:any){
    // this.count++;
     for (let index = 0; index < this.cart.allOrder.length; index++) {
      if(this.cart.allOrder[index].order_id == order_id)
      {
        this.cart.allOrder[index].quntity++; 
        this.cart.UpdateOrder_Total_amount(order_id,this.cart.allProduct,this.cart.allOrder[index].quntity);
        
      }
    
    }

   

  }
 
  minusMeal(order_id:any,quntity:any){

    for (let index = 0; index < this.cart.allOrder.length; index++) {
      if(this.cart.allOrder[index].order_id == order_id)
      {
        if(this.cart.allOrder[index].quntity ==1 )
        {
          return
        }else{
          this.cart.allOrder[index].quntity--;
          this.cart.UpdateOrder_Total_amount(order_id,this.cart.allProduct,this.cart.allOrder[index].quntity);
        }
          
        
      }
      
    
     }

    

  }


  saveLocation(){
    render({
      id:"#myPaypal",
      currency:"USD",
      value:this.total_amount,
      onApprove:(details)=>{
        this.toster.success("Transactions Successfull");
        this.cart.statusPendingAndPaymentOnline(this.cart.allOrder);
        this.cart.SendAcceptedOrderMail();
        this.CHECKOUT=false;
        this.ngOnInit();
      }
    });
    this.cart.saveLocation(this.locationForm.value);

  }

  Cash(){
  
    this.CHECKOUT=false;
    this.cart.statusPendingAndPaymentCash(this.cart.allOrder);
    this.cart.SendAcceptedOrderMail();
    this.ngOnInit();

  }



}
