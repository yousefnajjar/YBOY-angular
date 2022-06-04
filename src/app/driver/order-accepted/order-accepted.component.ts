import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { DriverService } from 'src/app/Services/driver.service';

@Component({
  selector: 'app-order-accepted',
  templateUrl: './order-accepted.component.html',
  styleUrls: ['./order-accepted.component.css']
})
export class OrderAcceptedComponent implements OnInit {

  constructor(private dialog:MatDialog,private router:Router,public driver:DriverService,
    private spinner:NgxSpinnerService) { 
    
  }

  ngOnInit(): void {
    this.driver.getUserByEmail();
    
    setTimeout(()=>{
     
        this.driver.GetAllAcceptedOrderFromDriver();
    },1000);
    
 
  }

  @ViewChild('callLocationDialog') callLocationDialog!:TemplateRef<any>
  reload(){
    this.ngOnInit();
  }

  location(user_id:any){

    this.dialog.open(this.callLocationDialog);

    this.driver.getLocationByUserId(user_id);
  }
 
  total:number=0
  email:string=''
  name:string=''
  delivered(id:any){

    let body={
      user_id:id,
      status:"Delivered",
      orderWithUserInfos:this.driver.acceptedOrderFromDriver
    }
    this.driver.StatusUpdate(body);


    for (let index = 0; index < this.driver.acceptedOrderFromDriver.length; index++) {
      
      if(this.driver.acceptedOrderFromDriver[index].user_id == id){
        this.total += this.driver.acceptedOrderFromDriver[index].total_amount;
        this.email=this.driver.acceptedOrderFromDriver[index].user_email;
        this.name=this.driver.acceptedOrderFromDriver[index].fname;
      }
      
    }


    this.driver.Sendbill(this.name,this.email,this.total);


    window.location.reload();
    
  }

}
