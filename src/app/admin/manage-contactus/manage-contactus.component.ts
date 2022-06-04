import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ContactusService } from 'src/app/Services/contactus.service';

@Component({
  selector: 'app-manage-contactus',
  templateUrl: './manage-contactus.component.html',
  styleUrls: ['./manage-contactus.component.css']
})
export class ManageContactusComponent implements OnInit {

  constructor(public contact:ContactusService,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.contact.getAllContact_Us();
  }
  
  @ViewChild('callDeleteDialog') callDeleteDialog! :TemplateRef<any>
  @ViewChild('callEmailDialog') callEmailDialog!:TemplateRef<any>

  emailForm:FormGroup=new FormGroup({
 
    sendToEmail:new FormControl('',),
    body:new FormControl('',Validators.required),
    name:new FormControl('',),

  })

  fullName:string=''
  openEmailDialog(sendToEmail1:any,fname:string,lname:string){

    this.fullName=fname+" "+lname;
    this.emailForm.controls['sendToEmail'].setValue(sendToEmail1);
    this.emailForm.controls['name'].setValue(this.fullName);

    this.dialog.open(this.callEmailDialog);
  }

  openDeleteDialog(id:any){

    const dialogRef=this.dialog.open(this.callDeleteDialog);
    dialogRef.afterClosed().subscribe((res)=>{
      if(res!==undefined)
      {
        if(res=="yes")
        {
          this.contact.DeleteContact_Us(id);
          window.location.reload();
        }
      } 
  })
}


SendContactUsMail(){

  this.contact.SendContactUsMail(this.emailForm.value);
  
}
}
