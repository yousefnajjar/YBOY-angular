import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup=new FormGroup({
    fname:new FormControl('',Validators.required),
    lname:new FormControl('',Validators.required),
    user_email:new FormControl('',[Validators.required,Validators.email]),
    user_password:new FormControl('',[Validators.required,Validators.minLength(8)]),
    phone:new FormControl('',Validators.required) ,
    confirmpassword:new FormControl('',[Validators.required,Validators.minLength(8)])  
  })
  constructor(public auth:AuthService) { }

  ngOnInit(): void {
  }


  register(){
    this.auth.register(this.registerForm.value);
  }



}
