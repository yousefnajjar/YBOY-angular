import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {

  constructor(public product:ProductService,private dialog:MatDialog) { }

  ngOnInit(): void {

    this.product.GetAllProduct();
    this.product.getAllCategory();
  }

  @ViewChild('calldescriptionDialog') calldescriptionDialog!:TemplateRef<any>
  @ViewChild('callUpdateDialog') callUpdateDialog!:TemplateRef<any>
  @ViewChild('callCreateDialog') callCreateDialog!:TemplateRef<any>
  @ViewChild('callDeleteDialog') callDeleteDialog! :TemplateRef<any>


  productForm:FormGroup=new FormGroup({
 
    product_name:new FormControl('',Validators.required),
    product_price:new FormControl('',Validators.required),
    product_quntity:new FormControl('',Validators.required),
    is_available:new FormControl(''),
    category_id:new FormControl(''),
    product_description:new FormControl('',Validators.required),
    image_path: new FormControl('',Validators.required)
    
  })


  updateProductForm:FormGroup=new FormGroup({
    product_id: new FormControl(''),
    product_name:new FormControl(''),
    product_price:new FormControl(''),
    product_quntity:new FormControl(''),
    is_available:new FormControl(''),
    category_id:new FormControl(''),
    category_name:new FormControl(''),
    product_description:new FormControl(''),
    image_path: new FormControl('')
    
  })

  description:string='';
  categoryIdselected:number=0;

  opendescriptionDialog(description:string){

    this.description=description;
    this.dialog.open(this.calldescriptionDialog);
  }

  openCreateDialog(){
    
    this.dialog.open(this.callCreateDialog);
  }

  
  setIs_available(event:any){
  
    this.productForm.controls['is_available'].setValue(event.value);
    this.updateProductForm.controls['is_available'].setValue(event.value);

  }

  UploadProductImage(file:any){

    if(file.length==0)
    {
       return
    }
    else{
      const uploadfile = <File>file[0];
      const formData = new FormData();
      formData.append('productImage', uploadfile, uploadfile.name);
      this.product.UploadProductImage(formData);
    }
  }


  saveProduct(){

    this.productForm.controls['category_id'].setValue(this.categoryIdselected);
    this.product.CreateProduct(this.productForm.value);
    window.location.reload();
    
  }

  openDeleteDialog(id:any){
    const dialogRef=this.dialog.open(this.callDeleteDialog);
    dialogRef.afterClosed().subscribe((res)=>{
      if(res!==undefined)
      {
        if(res=="yes")
        {
          this.product.DeleteProduct(id);
          window.location.reload();
        }
      }
    })
  }


 
 yes:any
 no:any
  openUpdateDialog(product_id1:any,
    product_name1:any,product_price1:any,product_quntity1:any,
    is_available1:any,product_description1:any,image_path1:string,category_name1:any,category_id1:any){

      if(is_available1=='Yes')
      {
        this.yes=true;
        this.no=false;
      }else{
        this.yes=false;
        this.no=true;
      }
      this.updateProductForm.controls['product_id'].setValue(product_id1);
      this.updateProductForm.controls['product_name'].setValue(product_name1);
      this.updateProductForm.controls['category_name'].setValue(category_name1);
      this.updateProductForm.controls['product_price'].setValue(product_price1);
      this.updateProductForm.controls['product_quntity'].setValue(product_quntity1);
      this.updateProductForm.controls['is_available'].setValue(is_available1);
      this.updateProductForm.controls['category_id'].setValue(category_id1);
      this.updateProductForm.controls['product_description'].setValue(product_description1);
      this.updateProductForm.controls['image_path'].setValue(image_path1);

      this.dialog.open(this.callUpdateDialog);
    }



    saveUpdateProduct(){
  
      if(this.categoryIdselected != 0)
      {
        this.updateProductForm.controls['category_id'].setValue(this.categoryIdselected);
      }
      
      this.product.UpdateProduct(this.updateProductForm.value);

      window.location.reload();
    }



}
