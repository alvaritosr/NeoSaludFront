import { Component } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {addIcons} from "ionicons";
import {eye, eyeOff} from "ionicons/icons";

@Component
({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports:
  [
    IonicModule,
    FormsModule,
    RouterLink
  ],
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent
{
  constructor()
  {
    addIcons
    ({
      'eye-off': eyeOff,
      'eye': eye
    });
  }

  doctorNum: string = '';
  username: string = '';
  password: string = '';
  repeatPassword: string = '';
  passwordFieldType: string = 'password';
  passwordFieldType2: string = 'password';

  togglePasswordVisibility()
  {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  togglePasswordVisibility2()
  {
    this.passwordFieldType2 = this.passwordFieldType2 === 'password' ? 'text' : 'password';
  }

  register()
  {
    console.log('register clicked');
  }
}
