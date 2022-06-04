import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import jwt_decode from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private spinner:NgxSpinnerService,private http:HttpClient,
    private toster:ToastrService) { 
      
    }

    host:string="https://localhost:44353/";
    allReadyForDeliveredorder:any=[]
    allUserId:any=[]


    userInfo:any = {}
 
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

    GetAllReadyForDeliveredorder(){

      this.spinner.show();
      this.http.get(this.host+"api/User_order/GetAllReadyForDeliveredorder").subscribe((res:any)=>{
        this.allReadyForDeliveredorder=res;
       

        this.allUserId=this.allReadyForDeliveredorder.reduce((a:any,b:any)=> {
          if(!a.find((data: { user_id: any; }) => data.user_id === b.user_id)){
            a.push(b);
          }
          return a;
        },[]);
        
        this.spinner.hide();
      },err=>{
        this.spinner.hide();
        this.toster.warning(err.message)
      })



    }

    StatusUpdate(body:any){

      this.http.put(this.host+"api/User_order/StatusUpdate/",body).subscribe((res:any)=>{
        this.toster.success("Order Delivered");
      },err=>{
     
        this.toster.warning(err.message);
      })
    }


    location:any={}
    getLocationByUserId(user_id:any){
      let body={
        user_id:user_id
      }

        this.http.post(this.host+"api/Locations/getLocationByUserId/", body).subscribe((res:any)=>{
        this.location=res;
       
        
        },err=>{
          this.toster.warning(err.message)
        })
      }


      CreateDriver_order(user_id:any){

        let body={
          user_id:user_id,
          driver_id:this.userInfo.user_id
        }
  
          this.http.post(this.host+"api/User_order/CreateDriver_order/", body).subscribe((res:any)=>{
          
            this.toster.success("Order Accepted For U");
          },err=>{
            this.toster.warning(err.message)
          })
      }


      acceptedOrderFromDriver:any=[]
      GetAllAcceptedOrderFromDriver(){

        let body={
          user_id:this.userInfo.user_id
        }
  
          this.http.post(this.host+"api/User_order/GetAllAcceptedOrderFromDriver", body).subscribe((res:any)=>{
          this.acceptedOrderFromDriver=res;
       
          

          this.allUserId=this.acceptedOrderFromDriver.reduce((a:any,b:any)=> {
            if(!a.find((data: { user_id: any; }) => data.user_id === b.user_id)){
              a.push(b);
            }
            return a;
          },[]);
          
            
          },err=>{
            this.toster.warning(err.message)
          })

      }

      DeliverdOrderForDriver:any=[]
      GetAllDeliverdOrderForDriver(){
        let body={
          user_id:this.userInfo.user_id
        }
  
          this.http.post(this.host+"api/User_order/GetAllDeliverdOrderForDriver", body).subscribe((res:any)=>{
          this.DeliverdOrderForDriver=res;
          
          

          this.allUserId=this.DeliverdOrderForDriver.reduce((a:any,b:any)=> {
            if(!a.find((data: { user_id: any; }) => data.user_id === b.user_id)){
              a.push(b);
            }
            return a;
          },[]);
          
            
          },err=>{
            this.toster.warning(err.message)
          })
      }



      Sendbill(name:any,email:any,total:any){

        let body={
          name:name,
          user_email:email,
          total:total
        }
    
        this.http.post(this.host+"api/Mail/Sendbill",body).subscribe((res:any)=>{
    
        },err=>{
          this.toster.warning(err.message)
        })
      }
    


}
