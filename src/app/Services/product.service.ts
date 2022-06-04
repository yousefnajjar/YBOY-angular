import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private spinner:NgxSpinnerService,private http:HttpClient,
    private toster:ToastrService) { }

    allProduct:any=[]
    allProductInHome:any=[]
    allCategory:any=[]
    host:string="https://localhost:44353/";

    GetAllProduct(){
      this.spinner.show();
      this.http.get(this.host+"api/Product/GetAllProduct").subscribe((res:any)=>{
        this.allProduct=res;
        this.spinner.hide();
      },err=>{
        this.spinner.hide();
        this.toster.warning(err.message)
      })
    }


    GetAllAvailableProduct(){
      this.spinner.show();
      this.http.get(this.host+"api/Product/GetAllAvailableProduct").subscribe((res:any)=>{
        this.allProduct=res;
        this.spinner.hide();
      },err=>{
        this.spinner.hide();
        this.toster.warning(err.message)
      })
    }

    GetAllAvailableProductForHomePage(){
      this.spinner.show();
      this.http.get(this.host+"api/Product/GetAllAvailableProduct").subscribe((res:any)=>{
        
       this.spinner.hide();
        for(var i=0; i<7; i++){
          this.allProductInHome[i]=res[i];
        }
       
      },err=>{
        this.spinner.hide();
        this.toster.warning(err.message)
      })
    }

    CreateProduct(body:any){
      

      body.image_path=this.productImage;
      this.spinner.show();
      this.http.post(this.host+"api/Product/CreateProduct/",body).subscribe((res)=>{
        this.spinner.hide();
        this.toster.success("Added Succssful");
      },err=>{
        this.spinner.hide();
        this.toster.warning(err.message)
      })
    }

    getAllCategory(){
      this.http.get(this.host+"api/Category/getAllCategory").subscribe((res:any)=>{

        this.allCategory=res;
         
        },err=>{
          this.toster.warning(err.message)
        })
    }


    productImage:string='';
    UploadProductImage(file:FormData){

      this.http.post(this.host+"api/Product/UploadProductImage/",file).subscribe((res:any)=>{

       this.productImage=res.image_path;
      },err=>{
        this.toster.warning(err.message);
      })

    }

    DeleteProduct(id:any){

      this.spinner.show();
      
      this.http.delete(this.host+"api/Product/DeleteProduct/"+id).subscribe((res:any)=>{

        this.spinner.hide();
        this.toster.success("Deleted Succssful");
       
      },err=>{
        this.spinner.hide();
        this.toster.warning(err.message);
      })
    }


    UpdateProduct(body:any){

      this.spinner.show();
      if(this.productImage != ''){
        
          body.image_path=this.productImage
        
      }
      this.http.put(this.host+"api/Product/UpdateProduct/",body).subscribe((res:any)=>{

        this.spinner.hide();
        this.toster.success("Updated Succssful");
       
      },err=>{
        this.spinner.hide();
        this.toster.warning(err.message);
      })
    }

    countOfCategory:any=[];
    GetAllAvailableCategoryProduct(){
      this.http.get(this.host+"api/Product/GetAllAvailableCategoryProduct").subscribe((res:any)=>{
      
       this.countOfCategory=res;
      
      },err=>{
        this.toster.warning(err.message)
      })
    }



}
