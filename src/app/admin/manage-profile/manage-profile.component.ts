import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.css']
})
export class ManageProfileComponent implements OnInit {

  constructor(public profile:UserService,private toster:ToastrService) { }


  ngOnInit(): void {
    this.profile.getUserByEmail();

    this.infoForm.controls["fname"].setValue(this.profile.userInfo.fname);
    this.infoForm.controls["lname"].setValue(this.profile.userInfo.lname);
    this.infoForm.controls["user_email"].setValue(this.profile.userInfo.user_email);
    this.infoForm.controls["phone"].setValue(this.profile.userInfo.phone);
  
  }

  infoForm:FormGroup=new FormGroup({
    fname:new FormControl('',Validators.required),
    lname:new FormControl('',Validators.required),
    user_email:new FormControl('',[Validators.required,Validators.email]),
    phone:new FormControl('',Validators.required) 
  })
  imageForm:FormGroup=new FormGroup({
    user_imagepath:new FormControl('',Validators.required)  
  })
  passwordForm:FormGroup=new FormGroup({
    old_password:new FormControl(''),
    user_password:new FormControl('',[Validators.required,Validators.minLength(8)]),
    confirmpassword:new FormControl('',[Validators.required,Validators.minLength(8)])  
  })


  UploadUserPic(file:any){

    if(file.length==0)
    {
       return
    }
    else{
      const uploadfile = <File>file[0];
      const formData = new FormData();
      formData.append('userImage', uploadfile, uploadfile.name);
      this.profile.UploadUserImage(formData);
    }
  }

  saveImage(){
    this.profile.UPDATUSERIMAGE();
    window.location.reload();
  }

  saveInfo(){
    this.profile.UPDATUSERINFO(this.infoForm.value);
    window.location.reload();
  }
  savePassword(){

      this.profile.UPDATUSERPASSWORD(this.passwordForm.value);
      
    
  }

}
