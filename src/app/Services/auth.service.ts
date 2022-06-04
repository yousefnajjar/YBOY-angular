import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import jwt_decode from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private spinner:NgxSpinnerService,private http:HttpClient,private router:Router,
    private toster:ToastrService) { }

    host:string="https://localhost:44353/";
  login(body:any){

    

    const headerDir={
      'Content-Type':'application/json',
      'Accept':'application/json'
    }
    const requestOptions={
      headers:new HttpHeaders(headerDir)
    }

   this.spinner.show();
   
   this.http.post(this.host+'api/User_Login/Auth/',body,requestOptions).subscribe((res:any)=>{



    localStorage.setItem('token', res.toString());

    let data:any= jwt_decode(res.toString());

    localStorage.setItem('user',JSON.stringify({...data}));
   

    if(data.role=='Admin')
    {
      this.router.navigate(['admin/dashboard'])
    }else if (data.role=='User')
    {
      this.router.navigate(['home'])
    }else if (data.role=='Chef')
    {
      this.router.navigate(['chef/view-order'])
    }else if (data.role=='Driver')
    {
      this.router.navigate(['driver/view-order'])
    }

    this.spinner.hide();
   },err=>{

    
    this.spinner.hide();
    this.toster.warning("Your Email or Password is invalid");
   })


  }


  register(body:any){


    const headerDir={
      'Content-Type':'application/json',
      'Accept':'application/json'
    }
    const requestOptions={
      headers:new HttpHeaders(headerDir)
    }
    body.role_id=2;

   this.spinner.show();
   this.http.post(this.host+'api/User_Login/CREATEUSER/',body,requestOptions).subscribe((res:any)=>{

    if(res == 'Faulted')
    {
      this.toster.warning("This Email Already Used")
    }
    else
    {
     this.router.navigate(['auth/login']) 
    }
   

    this.spinner.hide();
   },err=>{
    this.spinner.hide();
    this.toster.warning(err.message);
   })

  }


}

// function jwt_decode(arg0: any): any {
//   throw new Error('Function not implemented.');
// }


