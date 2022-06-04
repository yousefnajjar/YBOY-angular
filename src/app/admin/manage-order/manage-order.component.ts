import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.css']
})
export class ManageOrderComponent implements OnInit {

  constructor(public order:OrderService,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.order.PendingOrders();
  }

  @ViewChild('calldescriptionDialog') calldescriptionDialog!:TemplateRef<any>
  @ViewChild('callDeleteDialog') callDeleteDialog!:TemplateRef<any>
  @ViewChild('callEmailDialog') callEmailDialog!:TemplateRef<any>
  opendescriptionDialog(id:any){

    this.order.GetAllOrderWithproduct(id);
    this.dialog.open(this.calldescriptionDialog);
    
  }

  openDeleteDialog(id:any){

    const dialogRef=this.dialog.open(this.callDeleteDialog);
    dialogRef.afterClosed().subscribe((res)=>{
      if(res!==undefined)
      {
        if(res=="yes")
        {
          this.order.Deleteorder(id);
          window.location.reload();
        }
      }
    })
  }

  emailForm:FormGroup=new FormGroup({
    sendToEmail:new FormControl('',),
    body:new FormControl('',Validators.required),
    name:new FormControl('',),
    phone:new FormControl('',)

  })
  openEmailDialog(sendToEmail1:any,name1:any,phone1:any,order_id1:any){

    this.emailForm.controls["sendToEmail"].setValue(sendToEmail1);
    this.emailForm.controls["name"].setValue(name1);
    this.emailForm.controls["phone"].setValue(phone1);

    // this.dialog.open(this.callEmailDialog);

    const dialogRef=this.dialog.open(this.callEmailDialog);
    dialogRef.afterClosed().subscribe((res)=>{
      if(res!==undefined)
      {
        if(res=="yes")
        {
          this.order.Deleteorder(order_id1);
          window.location.reload();
        }
      }
    })

  }

  sendEmail(){
    this.order.SendContactUsMail(this.emailForm.value);
  }

  accept(id:any){

    let body={
      user_id:id,
      status:"Accept",
      orderWithUserInfos:this.order.allPengingOrders
    }
    this.order.StatusUpdate(body);
    this.ngOnInit();
  }

}
