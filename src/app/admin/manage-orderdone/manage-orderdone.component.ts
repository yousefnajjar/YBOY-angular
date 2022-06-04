import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-manage-orderdone',
  templateUrl: './manage-orderdone.component.html',
  styleUrls: ['./manage-orderdone.component.css']
})
export class ManageOrderdoneComponent implements OnInit {


  constructor(public order:OrderService,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.order.GetAllorder();
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

 


}
