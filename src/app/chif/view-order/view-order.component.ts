import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChifService } from 'src/app/Services/chif.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {

  constructor(public chef:ChifService, private dialog:MatDialog,private router:Router) { }
  @ViewChild('calldescriptionDialog') calldescriptionDialog!:TemplateRef<any>
  ngOnInit(): void {
  this.chef.GetAllAcceptedorder();
  }


  opendescriptionDialog(id:any){

    this.chef.GetAllOrderWithproduct(id);
    this.dialog.open(this.calldescriptionDialog);
    
  }

  ready(id:any){

  
    let body={
      user_id:id,
      status:"Ready For Delivered",
      orderWithUserInfos:this.chef.allOrdersAccepted
    }
    this.chef.StatusUpdate(body);
    window.location.reload();
    
  }

  reload(){
    this.ngOnInit();
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['auth/login']);
  }
}
