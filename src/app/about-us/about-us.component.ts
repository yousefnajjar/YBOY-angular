import { Component, OnInit } from '@angular/core';
import { AboutusService } from '../Services/aboutus.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor(public aboutUs:AboutusService) { }

  ngOnInit(): void {
    this.aboutUs.getAllAboutUs();
  }

}
