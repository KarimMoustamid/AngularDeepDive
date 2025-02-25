import { Component } from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  // User object for binding to the form
  user = {
    email: '',
    password: ''
  };

  // Method to handle form submission
  onSubmit(form: any) {
    if (form.valid) {
      console.log('Form Submitted Successfully!');
      console.log('Form Data: ', this.user);
    } else {
      console.log('Form is invalid. Please make corrections and try again.');
    }
  }
}
