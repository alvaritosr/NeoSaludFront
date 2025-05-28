import { Component, OnInit } from '@angular/core';
import {IonicModule, MenuController} from "@ionic/angular";
import { ReactiveFormsModule } from "@angular/forms";
import {RouterLink} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    IonicModule,
    ReactiveFormsModule,
    RouterLink
  ]
})
export class HomeComponent implements OnInit {
  nombreMedico: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.nombreMedico = this.authService.getUsernameFromToken(); // Ajusta según el método que obtenga el nombre
  }
}
