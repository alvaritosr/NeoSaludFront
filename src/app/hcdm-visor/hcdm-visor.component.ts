import { Component } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {MenuSuperiorComponent} from "../menu-superior/menu-superior.component";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {MedicoService} from "../services/medico.service";

@Component({
  selector: 'app-hcdm-visor',
  templateUrl: './hcdm-visor.component.html',
  imports: [
    IonicModule,
    MenuSuperiorComponent
  ],
  styleUrls: ['./hcdm-visor.component.scss']
})
export class HcdmVisorComponent {
  paciente: any;
  nombreMedico: string = '';

  protected zoomLevel = 1;
  private posX = 0;
  private posY = 0;
  private isDragging = false;
  private startX = 0;
  private startY = 0;


  constructor(private authService: AuthService, private route: ActivatedRoute, private medicoService: MedicoService) {
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  ngOnInit() {
    this.nombreMedico = this.authService.getUsernameFromToken();

    this.route.queryParams.subscribe(params => {
      const nh = params['nh'];
      if (nh && this.nombreMedico) {
        this.medicoService.verDetallePaciente(nh, this.nombreMedico).subscribe(data => {
          this.paciente = {
            ...data,
            edad: this.calcularEdad(data.fecha)
          };
        });
      }
    });
  }

  calcularEdad(fechaNacimiento: string): number {
    const fechaNac = new Date(fechaNacimiento);
    const fechaActual = new Date();
    let edad = fechaActual.getFullYear() - fechaNac.getFullYear();
    const mes = fechaActual.getMonth() - fechaNac.getMonth();

    if (mes < 0 || (mes === 0 && fechaActual.getDate() < fechaNac.getDate())) {
      edad--;
    }

    return edad;
  }

  zoomIn() {
    this.zoomLevel += 0.1;
    this.updateTransform();
  }

  zoomOut() {
    if (this.zoomLevel > 1.0) {
      this.zoomLevel -= 0.1;
      if (this.zoomLevel < 1.0) this.zoomLevel = 1.0;
      this.updateTransform();
    }
  }

  resetImage() {
    this.zoomLevel = 1;
    this.posX = 0;
    this.posY = 0;
    this.updateTransform();
  }

  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.startX = event.clientX - this.posX;
    this.startY = event.clientY - this.posY;
    event.preventDefault();
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;
    this.posX = event.clientX - this.startX;
    this.posY = event.clientY - this.startY;
    this.updateTransform();
  }

  onMouseUp() {
    this.isDragging = false;
  }

  private updateTransform() {
    const image = document.getElementById('image') as HTMLImageElement;
    image.style.transform = `translate(${this.posX}px, ${this.posY}px) scale(${this.zoomLevel})`;
  }

  toggleFullScreen() {
    const image = document.getElementById('image') as HTMLImageElement;
    if (!document.fullscreenElement) {
      image.requestFullscreen().catch(err =>
        console.error(`Error al entrar en pantalla completa: ${err.message}`)
      );
    } else {
      document.exitFullscreen().catch(err =>
        console.error(`Error al salir de pantalla completa: ${err.message}`)
      );
    }
  }
}
