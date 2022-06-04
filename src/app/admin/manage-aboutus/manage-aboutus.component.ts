import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AboutusService } from 'src/app/Services/aboutus.service';

@Component({
  selector: 'app-manage-aboutus',
  templateUrl: './manage-aboutus.component.html',
  styleUrls: ['./manage-aboutus.component.css']
})
export class ManageAboutusComponent implements OnInit {

  constructor(public about:AboutusService,private dialog:MatDialog) { }
  @ViewChild('callUpdateialog') callUpdateialog!:TemplateRef<any>
  ngOnInit(): void {

    this.about.getAllAboutUs();
  }



  aboutusForm:FormGroup=new FormGroup({
    about_us_id:new FormControl(),
    info: new FormControl(),
    image_path: new FormControl()
  })

  openUpdateialog(id:any){

    this.aboutusForm.controls['about_us_id'].setValue(id);
    this.dialog.open(this.callUpdateialog);
  }

  UpdateAboutUs(){
    this.about.UpdateAboutUs(this.aboutusForm.value);
    window.location.reload();
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
      this.about.UploadAboutusImage(formData);
    }
   
  }





}
