import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TestmonialService {

  constructor(private spinner:NgxSpinnerService,private http:HttpClient,
    private toster:ToastrService) { }

    testimonial_Image:string=''
   
    host:string="https://localhost:44353/";
    
    CreateTestimonial(body:any){
      this.spinner.show();
      body.image_path=this.testimonial_Image;
      body.web_id=1;
      body.status='';
      this.http.post(this.host+"api/Testimonial/CreateTestimonial",body).subscribe((res)=>{
        this.spinner.hide();
        this.toster.success("Thank you for feedback ");
      },err=>{
        this.spinner.hide();
        this.toster.warning(err.message);
      })

    }

    

    UploadTestimonialImage(file:FormData){
    
      this.http.post(this.host+"api/Testimonial/UploadTestimonialImage/",file).subscribe((res:any)=>{
      this.testimonial_Image=res.image_path;

     
    },err=>{
      this.toster.warning(err.message);
    })

    }

    allTestemonial:any=[]
    GetAllTestimonial(){

      this.spinner.show();
      this.http.get(this.host+"api/Testimonial/GetAllTestimonial").subscribe((res)=>{
        this.allTestemonial=res;  
       this.spinner.hide();
        
        
      },err=>{

        this.spinner.hide();
        this.toster.warning(err.message);
      })
    }


    DeleteTestimonial(id:any){

      this.spinner.show();
      this.http.delete(this.host+"api/Testimonial/DeleteTestimonial/"+id).subscribe((res)=>{
        
       this.spinner.hide();
       this.toster.success("Delete Succssfuly");
        
      },err=>{

        this.spinner.hide();
        this.toster.warning(err.message);
      })
    }


    approveTestimonial(id:any){

      var body={
        testimonial_id:id
      }

      this.spinner.show();
      this.http.put(this.host+"api/Testimonial/approveTestimonial/",body).subscribe((res)=>{
        
       this.spinner.hide();
       this.toster.success("Approved");
        
      },err=>{

        this.spinner.hide();
        this.toster.warning(err.message);
      })

    }

    

    GetAllApproveTestimonial(){

     
      this.http.get(this.host+"api/Testimonial/GetAllApproveTestimonial").subscribe((res)=>{
        this.allTestemonial=res;
      
      },err=>{

        this.toster.warning(err.message);
      })
    }



    GetAllPandingTestimonial(){
      this.spinner.show();
      this.http.get(this.host+"api/Testimonial/GetAllPandingTestimonial").subscribe((res)=>{
        this.spinner.hide();
      this.allTestemonial=res;
      
      },err=>{

        this.spinner.hide();
        this.toster.warning(err.message);
      })
    }


}
