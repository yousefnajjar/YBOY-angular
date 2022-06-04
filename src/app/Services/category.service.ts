import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private spinner:NgxSpinnerService,private http:HttpClient,
    private toster:ToastrService) { }

    allCategory:any=[]

    host:string="https://localhost:44353/";
    getAllCategory(){
      this.spinner.show();
    this.http.get(this.host+"api/Category/getAllCategory").subscribe((res:any)=>{
      this.spinner.hide();
    this.allCategory=res;
     
    },err=>{
      this.spinner.hide();
      this.toster.warning(err.message)
    })
  }


  createCategory(body:any){
    this.spinner.show();
    this.http.post(this.host+"api/Category/createCategory/",body).subscribe((res:any)=>{
      this.spinner.hide();

      this.toster.success("Added succssful ")
    },err=>{
      this.toster.warning(err.message)
    })

  }


  deleteCategory(id:any){
    this.spinner.show();
    this.http.delete(this.host+"api/Category/deleteCategory/"+id).subscribe((res:any)=>{
      this.spinner.hide();

      this.toster.success("Deleted succssful ")
    },err=>{
      this.toster.warning(err.message)
    })

  }
}
