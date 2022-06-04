import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private spinner:NgxSpinnerService,private http:HttpClient,
    private toster:ToastrService) { }


    alluser:any=[]
    host:string="https://localhost:44353/";
    GETALLUSER(){

      this.spinner.show();
      this.http.get(this.host+"api/User_Login/GETALLUSER").subscribe((res)=>{
        this.alluser=res;
       this.spinner.hide();
  
      },err=>{
        this.spinner.hide();
        this.toster.warning(err.message);
      })
    }

    DELETEUSER(id:any){
      this.http.delete(this.host+"api/User_Login/DELETEUSER/"+id).subscribe((res)=>{
       
       this.toster.success("Deleted Succssful");
      },err=>{
       
        this.toster.warning(err.message);
      })
    }


    createAdmin(body:any){

      body.role_id=1;
      const headerDir={
        'Content-Type':'application/json',
        'Accept':'application/json'
      }
      const requestOptions={
        headers:new HttpHeaders(headerDir)
      }
    
     this.http.post(this.host+'api/User_Login/CREATEUSER/',body,requestOptions).subscribe((res:any)=>{
  
      if(res == 'Faulted')
      {
        console.log("kl");
        
        this.toster.warning("This Email Already Used");
      }
      
     },err=>{
     
      this.toster.warning(err.message);
     })
  
    }

    createUser(body:any){

      body.role_id=2;
      const headerDir={
        'Content-Type':'application/json',
        'Accept':'application/json'
      }
      const requestOptions={
        headers:new HttpHeaders(headerDir)
      }
    
     this.http.post(this.host+'api/User_Login/CREATEUSER/',body,requestOptions).subscribe((res:any)=>{
  
      if(res == 'Faulted')
      {
        
        this.toster.warning("This Email Already Used");
      }
      
     },err=>{
     
      this.toster.warning(err.message);
     })
  
    }

    createChif(body:any){

      body.role_id=3;
      const headerDir={
        'Content-Type':'application/json',
        'Accept':'application/json'
      }
      const requestOptions={
        headers:new HttpHeaders(headerDir)
      }
    
     this.http.post(this.host+'api/User_Login/CREATEUSER/',body,requestOptions).subscribe((res:any)=>{
  
      if(res == 'Faulted')
      {
        
        this.toster.warning("This Email Already Used");
      }
      
     },err=>{
     
      this.toster.warning(err.message);
     })
  
    }

    createDriver(body:any){

      body.role_id=4;
      const headerDir={
        'Content-Type':'application/json',
        'Accept':'application/json'
      }
      const requestOptions={
        headers:new HttpHeaders(headerDir)
      }
    
     this.http.post(this.host+'api/User_Login/CREATEUSER/',body,requestOptions).subscribe((res:any)=>{
  
      if(res == 'Faulted')
      {
        
        this.toster.warning("This Email Already Used");
      }
      
     },err=>{
     
      this.toster.warning(err.message);
     })
  
    }



    searchUsers(body:any){

      this.spinner.show();
      this.http.post(this.host+'api/User_Login/searchUsers/',body).subscribe((res:any)=>{
  
      this.spinner.hide();
      if(res.length != 0)
      {
        this.alluser=res;
      }
      else{
        this.toster.warning("No User Found!!");
      }
      
      
     },err=>{
      this.spinner.hide();
      this.toster.warning(err.message);
     })
  
    }


    userImage:string=''

    UploadUserImage(file:FormData){

      this.http.post(this.host+"api/User_Login/UploadUserImage/",file).subscribe((res:any)=>{
       this.userImage=res.user_imagepath;
      },err=>{
       
        this.toster.warning(err.message);
      })
    }


  public userInfo:any = {  }
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

  UPDATUSERIMAGE(){

   this.userInfo.user_imagepath=this.userImage;
    
    this.http.put(this.host+"api/User_Login/UPDATUSER/",this.userInfo).subscribe((res:any)=>{
     
    },err=>{
     
      this.toster.warning(err.message);
    })
  }

  UPDATUSERINFO(body:any){

    this.userInfo.fname=body.fname;
    this.userInfo.lname=body.lname;
    this.userInfo.phone=body.phone;
    this.userInfo.user_email=body.user_email;
     this.http.put(this.host+"api/User_Login/UPDATUSER/",this.userInfo).subscribe((res:any)=>{
      
     },err=>{
      
       this.toster.warning(err.message);
     })
   }

   UPDATUSERPASSWORD(body:any){

   
    if(body.old_password != this.userInfo.user_password){
      this.toster.warning("Old Password Not Matched");
    }else{
       this.userInfo.user_password=body.user_password;
   
     this.http.put(this.host+"api/User_Login/UPDATUSER/",this.userInfo).subscribe((res:any)=>{
      this.toster.success("Password Updated");
     },err=>{
      
       this.toster.warning(err.message);
     })
    }
   
   }
  
}
