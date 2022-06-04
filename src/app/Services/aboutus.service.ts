import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AboutusService {
  info:string=''
  img:string=''
  id:any
  constructor(private spinner:NgxSpinnerService,private http:HttpClient,
    private toster:ToastrService) { }
    host:string="https://localhost:44353/";
  
  getAllAboutUs(){
    this.http.get(this.host+"api/About_Us/getAllAboutUs").subscribe((res:any)=>{
      
      this.info= res[0].info;
      this.img= res[0].image_path;
      this.id=res[0].about_us_id;
     
    },err=>{
      this.toster.warning(err.message)
    })
  }



  UpdateAboutUs(body:any){

    body.web_id=1;

    if(this.aboutUsImage == ''){
      body.image_path=this.img;
    }else{
      body.image_path=this.aboutUsImage;
    }
    
    this.spinner.show();
    this.http.put(this.host+"api/About_Us/UpdateAboutUs/",body).subscribe((res)=>{
      this.spinner.hide();
      this.toster.success("Update Succssfuly");


    },err=>{
      this.spinner.hide();
      this.toster.warning(err.message);

    })

  }

  aboutUsImage:string=''

  UploadAboutusImage(file:FormData){
    
    this.http.post(this.host+"api/About_Us/UploadAboutusImage/",file).subscribe((res:any)=>{
    this.aboutUsImage=res.image_path;

   
  },err=>{
    this.toster.warning(err.message);
  })

  }
}
