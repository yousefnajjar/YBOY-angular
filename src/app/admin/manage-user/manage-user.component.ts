import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  constructor(public user:UserService,private dialog:MatDialog ) { }

  ngOnInit(): void {
    this.user.GETALLUSER();
  }

  @ViewChild('callDeleteDialog') callDeleteDialog! :TemplateRef<any>
  @ViewChild('callAdminDialog') callAdminDialog! :TemplateRef<any>
  @ViewChild('callUserDialog') callUserDialog! :TemplateRef<any>
  @ViewChild('callChifDialog') callChifDialog! :TemplateRef<any>
  @ViewChild('callDriverDialog') callDriverDialog! :TemplateRef<any>
  openDeleteDialog(id:any){
  
    const dialogRef=this.dialog.open(this.callDeleteDialog);
    dialogRef.afterClosed().subscribe((res)=>{
      if(res!==undefined)
      {
        if(res=="yes")
        {
          this.user.DELETEUSER(id);
          window.location.reload();
        }
      }
    })
    

  }

  UserForm:FormGroup=new FormGroup({
    fname:new FormControl('',Validators.required),
    lname:new FormControl('',Validators.required),
    user_email:new FormControl('',[Validators.required,Validators.email]),
    user_password:new FormControl('',[Validators.required,Validators.minLength(8)]),
    phone:new FormControl('',Validators.required) ,
    confirmpassword:new FormControl('',[Validators.required,Validators.minLength(8)])  
  })


  createAdmin(){
    this.user.createAdmin(this.UserForm.value);
    window.location.reload();
  }
  createUser(){
    this.user.createUser(this.UserForm.value);
    window.location.reload();
  }

  openAdminDialog(){
    this.dialog.open(this.callAdminDialog);
  }
  openChifDialog(){
    this.dialog.open(this.callChifDialog);
  }
  openDriverDialog(){
    this.dialog.open(this.callDriverDialog);
  }
  openUserDialog(){
    this.dialog.open(this.callUserDialog);
  }

  searchForm:FormGroup=new FormGroup({
    fullname:new FormControl('',Validators.required) 
  })

  search(){
    this.user.searchUsers(this.searchForm.value);
  }

  allUsers(){
    window.location.reload();
  }

  createChif(){
    this.user.createChif(this.UserForm.value);
    
  }
  createDriver(){
    this.user.createDriver(this.UserForm.value);
    
  }
}
