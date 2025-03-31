import { Component } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {addIcons} from "ionicons";
import {eye, eyeOff} from "ionicons/icons";

@Component
({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports:
  [
    IonicModule,
    FormsModule,
    RouterLink
  ],
  styleUrls: ['./login.component.scss']
})

export class LoginComponent
{
  constructor()
  {
    addIcons
    ({
      'eye-off': eyeOff,
      'eye': eye
    });
  }

  username: string = '';
  password: string = '';
  medicalCenter: string = '';
  passwordFieldType: string = 'password';

  togglePasswordVisibility()
  {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  login()
  {
    console.log('Login clicked');
  }
}
