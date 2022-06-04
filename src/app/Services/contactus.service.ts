import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ContactusService {
 
  constructor(private http:HttpClient,private spinner:NgxSpinnerService,private toster:ToastrService ) { }



  host:string="https://localhost:44353/";
  CreateContact_Us(body :any){

    body.web_id=1;
    body.email=body.user_email;

    this.spinner.show();
    this.http.post(this.host+"api/Contact_Us/CreateContact_Us/",body).subscribe((res)=>{
      this.spinner.hide();
      this.toster.success("Send Succssful :)");
      
    },err=>{
      this.spinner.hide();
      this.toster.warning(err.message);
    })

  }

  allContactus:any=[]
  getAllContact_Us(){
    this.spinner.show();
    this.http.get(this.host+"api/Contact_Us/getAllContact_Us").subscribe((res)=>{
      this.allContactus=res;
      this.spinner.hide();
    
    },err=>{
      this.spinner.hide();
      this.toster.warning(err.message);
    })
  }

  DeleteContact_Us(id:any){

    this.spinner.show();
    this.http.delete(this.host+"api/Contact_Us/DeleteContact_Us/"+id).subscribe((res)=>{
      
      this.spinner.hide();
      this.toster.success("Deleted Succssful");
    },err=>{
      this.spinner.hide();
      this.toster.warning(err.message);
    })
  }

  SendContactUsMail(body:any){

    this.spinner.show();
    this.http.post(this.host+"api/Mail/SendContactUsMail/",body).subscribe((res)=>{
      
      this.spinner.hide();
      this.toster.success("Email Sent Succssful");
    },err=>{
      this.spinner.hide();
      this.toster.warning(err.message);
    })
  }
}
