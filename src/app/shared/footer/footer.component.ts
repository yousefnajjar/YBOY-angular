import { Component, OnInit } from '@angular/core';
import { WebsiteService } from 'src/app/Services/website.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public web:WebsiteService) { }

  ngOnInit(): void {
    this.web.GetAllWebsite();
  }

}
