import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { WebsiteService } from 'src/app/Services/website.service';

@Component({
  selector: 'app-manage-website',
  templateUrl: './manage-website.component.html',
  styleUrls: ['./manage-website.component.css']
})
export class ManageWebsiteComponent implements OnInit {

  constructor(public web:WebsiteService,private dialog:MatDialog) { }

  ngOnInit(): void {

    this.web.GetAllWebsite();
  }

  @ViewChild('callUpdateDialog') callUpdateDialog!:TemplateRef<any>
  updateWebsiteForm:FormGroup=new FormGroup({
    web_id: new FormControl(''),
    web_name:new FormControl(''),
    web_image_logo_path:new FormControl(''),
    address:new FormControl(''),
    phone:new FormControl(''),
    email:new FormControl('')
    
  })

  openUpdateDialog(web_id1:any,web_name1:any,web_image_logo_path1:any
    ,address1:any,phone1:any,email1:any){

     this.updateWebsiteForm.controls['web_id'].setValue(web_id1);
      this.updateWebsiteForm.controls['web_name'].setValue(web_name1);
      this.updateWebsiteForm.controls['web_image_logo_path'].setValue(web_image_logo_path1);
      this.updateWebsiteForm.controls['address'].setValue(address1);
      this.updateWebsiteForm.controls['phone'].setValue(phone1);
      this.updateWebsiteForm.controls['email'].setValue(email1);

    this.dialog.open(this.callUpdateDialog);
  }

  saveUpdateWebsite(){
     
      this.web.UpdateWebsite(this.updateWebsiteForm.value);
      window.location.reload();

  }
  UploadlogoImage(file:any){
    
    if(file.length==0)
    {
       return
    }
    else{
      const uploadfile = <File>file[0];
      const formData = new FormData();
      formData.append('logoImage', uploadfile, uploadfile.name);
      this.web.UploadLogoImage(formData);
    }
  }
}
