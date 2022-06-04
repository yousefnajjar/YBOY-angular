import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactusService } from '../Services/contactus.service';
import { HomeService } from '../Services/home.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {


contactForm: FormGroup = new FormGroup({
    fname: new FormControl('', [Validators.required]),
    lname: new FormControl('', [Validators.required]),
    user_email:new FormControl('',[Validators.required,Validators.email]),
    message: new FormControl('', [Validators.required])
  })

  constructor(public home:HomeService,private contact:ContactusService) {

   }
  
 
  ngOnInit(): void {

    if (localStorage.length != 0) {
      this.home.getUserByEmail();

    }
  }

  sendContactUs(){
    this.contact.CreateContact_Us(this.contactForm.value);
  }

}
