import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DriverService } from 'src/app/Services/driver.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {

  constructor(private dialog:MatDialog,private router:Router,public driver:DriverService) { }

  @ViewChild('callLocationDialog') callLocationDialog!:TemplateRef<any>
  ngOnInit(): void {

    this.driver.getUserByEmail();
    this.driver.GetAllReadyForDeliveredorder();
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['auth/login']);
  }

  reload(){
    this.ngOnInit();
  }


  // delivered(id:any){

  //   let body={
  //     user_id:id,
  //     status:"Delivered",
  //     orderWithUserInfos:this.driver.allReadyForDeliveredorder
  //   }
  //   this.driver.StatusUpdate(body);
  //   window.location.reload();
    
  // }

  location(user_id:any){

    this.dialog.open(this.callLocationDialog);

    this.driver.getLocationByUserId(user_id);
  }

  acceptOrder(user_id:any){

    this.driver.CreateDriver_order(user_id);

    window.location.reload();
  }



}
