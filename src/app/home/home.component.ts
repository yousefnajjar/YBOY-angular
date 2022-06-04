import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { AboutusService } from '../Services/aboutus.service';
import { CategoryService } from '../Services/category.service';
import { HomeService } from '../Services/home.service';
import { ProductService } from '../Services/product.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[NgbCarouselConfig]
})

export class HomeComponent implements OnInit {

  constructor(public aboutUs:AboutusService,public home : HomeService
    ,public product:ProductService,public category:CategoryService,private router:Router) { }

  ngOnInit(): void {

    this.aboutUs.getAllAboutUs();
    this.product.GetAllAvailableProductForHomePage();
    this.category.getAllCategory();

    if(localStorage.length != 0)
    {
      this.home.getUserByEmail();
    }
     
  }


  goToMenu(){
    this.router.navigate(["menu"]);
  }
  

}
