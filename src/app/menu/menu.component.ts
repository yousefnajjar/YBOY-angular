import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MenuService } from '../Services/menu.service';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  // @Input() name :string|undefined
  constructor(public product: ProductService, public menu: MenuService
    , private spinner: NgxSpinnerService, private toster: ToastrService, private router: Router) { }

  itemSelected: any = []
  price: any = []

  breadCount: number = 0;
  meatCount: number = 0;
  ngOnInit(): void {

    if(localStorage.getItem("token") != null){
      this.menu.getUserByEmail();
    }
    console.log(localStorage.getItem("token"));
    
    
    this.product.GetAllAvailableProduct();
    this.product.GetAllAvailableCategoryProduct();
  }


  addItems(id: number, category_name: string, price: number) {


    if (localStorage.getItem("token") != null) {
      if (category_name == "bread") {
        this.breadCount++;
      } else if (category_name == "meat") {
        this.meatCount++;
      }

      this.itemSelected.push(id);
      this.price.push(price);
    } else{
      this.router.navigate(["auth/login"]);
      this.toster.warning("Plz Login First...");
    }


  }


  save() {

    if (this.itemSelected.length > 0) {

      return true;

    } else {
      return false;
    }

  }



  saveOrder() {

    if (this.breadCount == 0) {
      this.toster.warning("Can't Create Order Without Bread...");

    } else if (this.meatCount == 0) {
      this.toster.warning("Can't Create Order Without Meat...");

    } else {

      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
      }, 2000)




      this.menu.Createorder(this.itemSelected, this.price);


      // this.router.navigate(["My-cart"]);

    }




  }


}
