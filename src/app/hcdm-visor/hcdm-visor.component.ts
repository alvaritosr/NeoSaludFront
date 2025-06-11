import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import * as dicomParser from 'dicom-parser';
import * as cornerstoneTools from 'cornerstone-tools';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import {
  IonButton,
  IonCard,
  IonContent, IonHeader,
  IonIcon,
  IonItem, IonLabel, IonList, IonTitle, IonToolbar
} from "@ionic/angular/standalone";
import { RadiografiaService } from "../services/radiografia.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MenuSuperiorComponent } from "../menu-superior/menu-superior.component";
import {addIcons} from "ionicons";
import {
  expand,
  contract,
  arrowDownCircleOutline,
  arrowForwardOutline,
  arrowForwardCircleOutline,
  arrowBackCircleOutline, arrowUpCircleOutline
} from "ionicons/icons";

@Component({
  selector: 'app-hcdm-visor',
  templateUrl: './hcdm-visor.component.html',
  styleUrls: ['./hcdm-visor.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonCard,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    MenuSuperiorComponent,
    IonIcon,
    IonToolbar,
    IonHeader,
    IonTitle,
  ]
})
export class HcdmVisorComponent implements OnInit, AfterViewInit {
  @ViewChild('dicomImage', { static: false }) dicomImage!: ElementRef;

  dicomFiles: any[] = [];
  cornerstoneEnabled = false;
  currentRadiografia?: string;
  pacienteId?: number;
  nombrePaciente?: string;
  apellidoPaciente?: string;
  segundoApellidoPaciente?: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private radiografiaService: RadiografiaService
  ) {
    addIcons({
      'expand': expand,
      'contract': contract,
      '1': arrowDownCircleOutline,
      '2': arrowForwardCircleOutline,
      '3': arrowBackCircleOutline,
      '4': arrowUpCircleOutline
    });
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.pacienteId = params.get('pacienteId') ? Number(params.get('pacienteId')) : undefined;
      this.nombrePaciente = params.get('nombrePaciente') || undefined;
      this.apellidoPaciente = params.get('apellidoPaciente') || undefined;
      this.segundoApellidoPaciente = params.get('segundoApellido') || undefined;
      const nombreArchivo = params.get('nombreArchivo');
      if (nombreArchivo) {
        this.cargarRadiografia(nombreArchivo);
      }
    });

    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

    cornerstoneWADOImageLoader.configure({
      beforeSend: (xhr: XMLHttpRequest) => {
      },
      useWebWorkers: true,
    });



    this.radiografiaService.obtenerRadiografiasPorPaciente(this.pacienteId).subscribe((data) => {
      this.dicomFiles = data;

      data.forEach(radiografia => {

        this.radiografiaService.getStudyDescription(radiografia.nombreArchivo).subscribe(desc => {
          radiografia.descripcion = desc;
        });
      });
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.dicomImage && this.dicomImage.nativeElement) {
        cornerstone.enable(this.dicomImage.nativeElement);
        this.cornerstoneEnabled = true;
        this.loadDicomImage();

        // Configurar cornerstoneTools
        cornerstoneTools.external.cornerstone = cornerstone;
        if ((window as any).Hammer) {
          cornerstoneTools.external.Hammer = (window as any).Hammer;
        }

        cornerstoneTools.init();

        // Registrar herramientas
        cornerstoneTools.addTool(cornerstoneTools.ZoomTool);
        cornerstoneTools.addTool(cornerstoneTools.PanTool);
        cornerstoneTools.addTool(cornerstoneTools.ZoomMouseWheelTool);

        // Activar herramientas
        cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 2 }); // zoom con rueda presionada
        cornerstoneTools.setToolActive('Pan', { mouseButtonMask: 4 });  // mover con clic derecho
        cornerstoneTools.setToolActive('ZoomMouseWheel', {});           // zoom con la rueda

      }
    }, 0);
  }

  loadDicomImage(nombreArchivo?: string) {
    if (!nombreArchivo) return;

    this.radiografiaService.cargarDicomImage(nombreArchivo).subscribe({
      next: (image: any) => {
        cornerstone.displayImage(this.dicomImage.nativeElement, image);
      },
      error: (err) => {
        console.error('Error cargando DICOM:', err);
        alert('Error cargando el archivo DICOM');
      }
    });
  }

  cargarRadiografia(nombreArchivo: string | undefined) {
    if (!nombreArchivo) return;

    this.currentRadiografia = nombreArchivo;

    this.radiografiaService.cargarDicomImage(nombreArchivo).subscribe({
      next: (image: any) => {
        cornerstone.displayImage(this.dicomImage.nativeElement, image);
      },
      error: (err) => {
        console.error('Error cargando DICOM:', err);
        alert('Error cargando el archivo DICOM');
      }
    });
  }


  zoomIn() {
    const viewport = cornerstone.getViewport(this.dicomImage.nativeElement);
    if (viewport) {
      viewport.scale += 0.1; // Incrementa el zoom
      cornerstone.setViewport(this.dicomImage.nativeElement, viewport);
    }
  }

  zoomOut() {
    const viewport = cornerstone.getViewport(this.dicomImage.nativeElement);
    if (viewport) {
      viewport.scale = Math.max(viewport.scale - 0.1, 0.1);
      cornerstone.setViewport(this.dicomImage.nativeElement, viewport);
    }
  }

  moveImage(dx: number, dy: number) {
    const viewport = cornerstone.getViewport(this.dicomImage.nativeElement);
    if (viewport) {
      viewport.translation.x += dx;
      viewport.translation.y += dy;
      cornerstone.setViewport(this.dicomImage.nativeElement, viewport);
    }
  }

}


