import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class WebsiteService {

  constructor(private spinner:NgxSpinnerService,private http:HttpClient,
    private toster:ToastrService) { }


    website:any=[]

    host:string="https://localhost:44353/";
    GetAllWebsite(){
      this.spinner.show();
      this.http.get(this.host+"api/Website/GetAllWebsite").subscribe((res:any)=>{
        this.website=res;  
       this.spinner.hide();
        
        
      },err=>{

        this.spinner.hide();
        this.toster.warning(err.message);
      })
    }


    UpdateWebsite(body:any){

      if(this.imageLogo!= ''){
        body.web_image_logo_path=this.imageLogo;
      }

      body.card_id=1;
      this.spinner.show();
      this.http.put(this.host+"api/Website/UpdateWebsite/",body).subscribe((res)=>{
       this.spinner.hide();
       this.toster.success("Updated Succssful");
        
      },err=>{

        this.spinner.hide();
        this.toster.warning(err.message);
      })
    }

    imageLogo:string='';
    UploadLogoImage(file:FormData){

      this.http.post(this.host+"api/Website/UploadLogoImage/",file).subscribe((res:any)=>{
       this.imageLogo=res.web_image_logo_path;
      },err=>{
        this.toster.warning(err.message);
      })
    }
}
