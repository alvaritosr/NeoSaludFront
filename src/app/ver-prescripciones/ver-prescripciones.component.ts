import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-prescripciones',
  templateUrl: './ver-prescripciones.component.html',
  styleUrls: ['./ver-prescripciones.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NavbarComponent
  ]
})
export class VerPrescripcionesComponent implements OnInit {
  prescriptions = [
    { id: 1, patientName: 'Juan García', medicine: 'Paracetamol', dosage: '500mg' },
    { id: 2, patientName: 'María López', medicine: 'Ibuprofeno', dosage: '400mg' },
    { id: 3, patientName: 'Pedro Sánchez', medicine: 'Amoxicilina', dosage: '250mg' }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log('VerPrescripcionesComponent initialized');
  }

  goToPrescription(id: number): void {
    this.router.navigate(['/prescripcion', id]);
  }
}
