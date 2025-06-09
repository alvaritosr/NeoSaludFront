import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IngresosService } from '../services/ingresos.service';
import { MenuSuperiorComponent } from "../menu-superior/menu-superior.component";
import { IonicModule } from "@ionic/angular";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-camas',
  templateUrl: './camas.component.html',
  styleUrls: ['./camas.component.scss'],
  imports: [
    MenuSuperiorComponent,
    ReactiveFormsModule,
    IonicModule,
  ]
})
export class CamasComponent implements OnInit {
  @Input() room: any;
  form: FormGroup;
  isEditing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private ingresosService: IngresosService,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      numero: ['', Validators.required],
      status: ['', Validators.required],
      severidad: ['', Validators.required],
      nh: [''],
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const username = 'exampleUsername'; // Reemplaza con el username real

    if (id) {
      this.ingresosService.verIngresoPorId(+id, username).subscribe(
        (data) => {
          this.room = data;
          this.form.patchValue(this.room); // Rellenar el formulario con los datos obtenidos
        },
        (error) => {
          console.error('Error al obtener los datos del ingreso:', error);
        }
      );
    }
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  submit() {
    if (this.form.valid) {
      const updatedData = this.form.value;
      updatedData.nh = updatedData.nh || null;
      this.ingresosService.modificarIngreso(this.room.id, updatedData).subscribe(
        (response) => {
          this.room = { ...this.room, ...updatedData };
          this.isEditing = false;
        },
        (error) => {
          console.error('Error updating bed:', error);
        }
      );
    }
  }
}
