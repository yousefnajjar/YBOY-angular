import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


loginForm:FormGroup=new FormGroup({
  user_email:new FormControl('',[Validators.required,Validators.email]),
  user_password:new FormControl('',[Validators.required,Validators.minLength(8)]),
})

 
  constructor(public auth:AuthService) { }

  ngOnInit(): void {
  }

  
login(){

  this.auth.login(this.loginForm.value);

}


}
