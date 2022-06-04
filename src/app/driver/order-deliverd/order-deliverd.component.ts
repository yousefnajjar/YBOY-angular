import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DriverService } from 'src/app/Services/driver.service';

@Component({
  selector: 'app-order-deliverd',
  templateUrl: './order-deliverd.component.html',
  styleUrls: ['./order-deliverd.component.css']
})
export class OrderDeliverdComponent implements OnInit {

  constructor(private dialog:MatDialog,private router:Router,public driver:DriverService,
    private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.driver.getUserByEmail();
    
    setTimeout(()=>{
     
        this.driver.GetAllDeliverdOrderForDriver();
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
}
