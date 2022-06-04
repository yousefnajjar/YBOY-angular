import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css']
})
export class ManageCategoryComponent implements OnInit {

  constructor(public category:CategoryService, private dialog:MatDialog) { }

  ngOnInit(): void {
    this.category.getAllCategory();
  }


  @ViewChild('callDeleteDialog') callDeleteDialog! :TemplateRef<any>

  @ViewChild('callCreateDialog') callCreateDialog!:TemplateRef<any>

  categoryForm:FormGroup=new FormGroup({
    category_name:new FormControl('',[Validators.required])
  })

  openDeleteDialog(id:any){

    const dialogRef=this.dialog.open(this.callDeleteDialog);
    dialogRef.afterClosed().subscribe((res)=>{
      if(res!==undefined)
      {
        if(res=="yes")
        {
          this.category.deleteCategory(id);
          window.location.reload();
        }
      }
    })
  }

  opencallCreateDialog(){
    this.dialog.open(this.callCreateDialog);
  }

  createCategory(){
    this.category.createCategory(this.categoryForm.value);
    window.location.reload();
  }


}
