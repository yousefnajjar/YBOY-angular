import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebsiteService } from 'src/app/Services/website.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router,public web:WebsiteService) { }


  ngOnInit():void {

    this.web.GetAllWebsite();

  }
 

  isLogin(){
    if(localStorage.getItem('token') == null)
    return true;
    else
    return false;

  }

  Logout(){

    localStorage.clear();
   this.router.navigate(['auth/login']);

  }

  goToCart(){
    this.router.navigate(['My-cart']);
  }

}
