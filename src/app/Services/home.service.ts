import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient) { }

 public userInfo:any = {}
  
 host:string="https://localhost:44353/";
  getUserByEmail(){

    let token:any=localStorage.getItem('token');
   let data:any= jwt_decode(token.toString());

    var body={
      user_email:data.email
    }

    this.http.post(this.host+"api/User_Login/GETUSERBYEMAIL/",body).subscribe((res:any)=>{
      
        this.userInfo=res;
 
    },err=>{

    })
  }

}
// function jwt_decode(arg0: any): any {
//   throw new Error('Function not implemented.');
// }

