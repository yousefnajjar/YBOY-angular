import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private spinner:NgxSpinnerService,private http:HttpClient,
    private toster:ToastrService) { }



    allOrders:any=[]
    host:string="https://localhost:44353/";
    GetAllorder(){
      this.spinner.show();
      this.http.get(this.host+"api/User_order/GetAllDeliveredorderWithUserInfo").subscribe((res:any)=>{
        this.allOrders=res;
        this.spinner.hide();
      },err=>{
        this.spinner.hide();
        this.toster.warning(err.message)
      })
    }

    allPengingOrders:any=[]
    allUserId:any=[]
    PendingOrders(){
      this.spinner.show();
      this.http.get(this.host+"api/User_order/GetAllPendingorderWithUserInfo").subscribe((res:any)=>{
        this.allPengingOrders=res;

        this.allUserId=this.allPengingOrders.reduce((a:any,b:any)=> {
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

    

    Deleteorder(id:any){

      this.http.delete(this.host+"api/User_order/Deleteorder/"+id).subscribe((res:any)=>{
        this.toster.success("Deleted Succssful");
      },err=>{
       
        this.toster.warning(err.message)
      })
    }

    SendContactUsMail(body:any){

      this.http.post(this.host+"api/Mail/SendContactUsMail/",body).subscribe((res)=>{
        
        this.toster.success("Email Sent Succssful");
      },err=>{
     
        this.toster.warning(err.message);
      })
    }

    StatusUpdate(body:any){

      this.http.put(this.host+"api/User_order/StatusUpdate/",body).subscribe((res:any)=>{
        this.toster.success("Accepted");
      },err=>{
     
        this.toster.warning(err.message);
      })
    }
}
