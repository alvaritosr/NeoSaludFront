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
  IonContent,
  IonHeader,
  IonImg, IonItem, IonLabel, IonList,
  IonRouterOutlet,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {TacService} from "../services/tac.service";
import {Tac} from "../models/tac";
import {ActivatedRoute, Router} from "@angular/router";
import {MenuSuperiorComponent} from "../menu-superior/menu-superior.component";

@Component({
  selector: 'app-visor-dicom',
  templateUrl: './visor-dicom.component.html',
  styleUrls: ['./visor-dicom.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonTitle,
    IonHeader,
    IonToolbar,
    IonImg,
    IonContent,
    IonCard,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    MenuSuperiorComponent,
  ]
})
export class VisorDicomComponent implements OnInit, AfterViewInit {
  @ViewChild('dicomImage', { static: false }) dicomImage!: ElementRef;

  dicomFiles: any[] = [];
  currentIndex: number = 0;
  cornerstoneEnabled = false;
  tituloTac: string = '';
  tacs: Tac[] = [];
  currentTac?: string;


  constructor(  private router: Router, private activatedRoute: ActivatedRoute, private http: HttpClient, private tacService: TacService) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const nombreCarpeta = params.get('nombreCarpeta');
      if (nombreCarpeta) {
        this.cargarTac(nombreCarpeta);
      }
    });

    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

    const pacienteId = 1;
    this.tacService.getTacsByPaciente(pacienteId).subscribe((data) => {
      this.tacs = data;

      data.forEach(tac => {
        this.http.get<any[]>(`/api/tac/estudio/${tac.nombreCarpeta}`).subscribe((files) => {
          if (files.length > 0) {
            const firstFileName = files[0].fileName;
            const imageId = `wadouri:http://localhost:5433/tac/${tac.nombreCarpeta}/${firstFileName}`;

            cornerstone.loadImage(imageId).then((image: any) => {
              const dataSet = image.data;
              const studyDescription = dataSet.string('x00081030') || 'Sin descripción';

              tac.descripcion = studyDescription;
            });
          } else {
            tac.descripcion = 'Sin imágenes';
          }
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

        // Inicializar cornerstone-tools
        cornerstoneTools.init();

        // Crear herramienta de zoom
        const ZoomTool = cornerstoneTools.ZoomTool;
        cornerstoneTools.addTool(ZoomTool);

        // Activar zoom con la rueda del ratón
        cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 0 }); // 0 para click izquierdo o solo rueda
      }
    }, 0);
  }


  loadDicomImage(nombreCarpeta?: string) {
    if (this.dicomFiles.length === 0) return;

    const fileName = this.dicomFiles[this.currentIndex].fileName;
    const carpeta = nombreCarpeta || '301D3YOC'; // fallback por si acaso

    const imageId = `wadouri:http://localhost:5433/tac/${carpeta}/${fileName}`;

    cornerstone.loadImage(imageId).then((image: any) => {
      cornerstone.displayImage(this.dicomImage.nativeElement, image);

      const dataSet = image.data;
      const studyDescription = dataSet.string('x00081030');
      console.log('Descripción del estudio:', studyDescription);
      this.tituloTac = studyDescription || 'Sin descripción';
    });
  }


  cargarTac(nombreCarpeta: string | undefined) {
    this.currentTac = nombreCarpeta; // Establece el Tac actual
    this.http.get<any[]>(`/api/tac/estudio/${nombreCarpeta}`).subscribe((files) => {
      this.dicomFiles = files;
      this.currentIndex = 0;
      this.loadDicomImage(nombreCarpeta);
    });
  }

}
