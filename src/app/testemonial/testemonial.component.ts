import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TestmonialService } from '../Services/testmonial.service';

@Component({
  selector: 'app-testemonial',
  templateUrl: './testemonial.component.html',
  styleUrls: ['./testemonial.component.css']
})
export class TestemonialComponent implements OnInit {

 @ViewChild('callCreateTestimonialDialog') callCreateTestimonialDialog!:TemplateRef<any>

  testemonialForm: FormGroup = new FormGroup({
    fname: new FormControl('', [Validators.required]),
    lname: new FormControl('', [Validators.required]),
    image_path:new FormControl(''),
    feedback_mess: new FormControl('',[Validators.required])
  })
constructor(private dialog:MatDialog,public test:TestmonialService) { }
 
  
  ngOnInit(): void {
    this.test.GetAllApproveTestimonial();
  }

  openCreateTestimonialDialog(){
    this.dialog.open(this.callCreateTestimonialDialog);
  }


  saveTestimonial(){

    this.test.CreateTestimonial(this.testemonialForm.value);

  }

  uploadImage(file:any){

    if(file.length==0)
    {
       return
    }
    else{
      const uploadfile = <File>file[0];
      const formData = new FormData();
      formData.append('TestimonialImage', uploadfile, uploadfile.name);
      this.test.UploadTestimonialImage(formData);
    }
   
  }

}
