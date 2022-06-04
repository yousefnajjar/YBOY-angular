import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ChifService {

  constructor(private spinner:NgxSpinnerService,private http:HttpClient,
    private toster:ToastrService) { }

    allOrdersAccepted:any=[]
    allUserId:any=[]
    host:string="https://localhost:44353/";
    GetAllAcceptedorder(){
      this.spinner.show();
      this.http.get(this.host+"api/User_order/GetAllAcceptedorder").subscribe((res:any)=>{
        this.allOrdersAccepted=res;
       

        this.allUserId=this.allOrdersAccepted.reduce((a:any,b:any)=> {
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


    orderWithProduct:any=[]
    GetAllOrderWithproduct(id1 :any){

      let body={
        id:id1
      }
     
      this.http.post(this.host+"api/User_order/GetAllOrderWithproduct/",body).subscribe((res:any)=>{
        this.orderWithProduct=res;


      },err=>{
       
        this.toster.warning(err.message)
      })
    }

    StatusUpdate(body:any){

      this.http.put(this.host+"api/User_order/StatusUpdate/",body).subscribe((res:any)=>{
        this.toster.success("Ready For Delivered");
      },err=>{
     
        this.toster.warning(err.message);
      })
    }
}
