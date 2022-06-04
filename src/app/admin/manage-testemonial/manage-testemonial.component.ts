import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TestmonialService } from 'src/app/Services/testmonial.service';

@Component({
  selector: 'app-manage-testemonial',
  templateUrl: './manage-testemonial.component.html',
  styleUrls: ['./manage-testemonial.component.css']
})
export class ManageTestemonialComponent implements OnInit {

  constructor(public test:TestmonialService, private dialog:MatDialog) { }

  ngOnInit(): void {
     this.test.GetAllTestimonial();
   
  }

  @ViewChild('callDeleteDialog') callDeleteDialog! :TemplateRef<any>



  openDeleteDialog(id:any){

    const dialogRef=this.dialog.open(this.callDeleteDialog);
    dialogRef.afterClosed().subscribe((res)=>{
      if(res!==undefined)
      {
        if(res=="yes")
        {
          this.test.DeleteTestimonial(id);
          window.location.reload();
        }
      }
    })
  }

  approveTestimonial(id:any){

    this.test.approveTestimonial(id);

    window.location.reload();
  }

  GetAllPandingTestimonial(){
    this.test.GetAllPandingTestimonial();
  }

  GetAllTestimonial(){
    this.test.GetAllTestimonial();
  }
}
