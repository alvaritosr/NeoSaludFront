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
  IonHeader, IonIcon,
  IonImg, IonItem, IonLabel, IonList,
  IonRouterOutlet,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {TacService} from "../services/tac.service";
import {Tac} from "../models/tac";
import {ActivatedRoute, Router} from "@angular/router";
import {MenuSuperiorComponent} from "../menu-superior/menu-superior.component";
import {addIcons} from "ionicons";
import {
  arrowBackCircleOutline,
  arrowDownCircleOutline,
  arrowForwardCircleOutline, arrowUpCircleOutline,
  contract,
  expand
} from "ionicons/icons";

@Component({
  selector: 'app-visor-dicom',
  templateUrl: './visor-dicom.component.html',
  styleUrls: ['./visor-dicom.component.scss'],
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
    IonHeader,
    IonTitle,
    IonToolbar,
    IonIcon,
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
  pacienteId?: number;
  nombrePaciente?: string;
  apellidoPaciente?: string;
  segundoApellidoPaciente?: string;


  constructor(  private router: Router, private activatedRoute: ActivatedRoute, private http: HttpClient, private tacService: TacService)
  {
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
      const nombreCarpeta = params.get('nombreCarpeta');
      this.pacienteId = params.get('pacienteId') ? Number(params.get('pacienteId')) : undefined;
      this.nombrePaciente = params.get('nombrePaciente') || undefined;
      this.apellidoPaciente = params.get('apellidoPaciente') || undefined;
      this.segundoApellidoPaciente = params.get('segundoApellido') || undefined;

      if (nombreCarpeta) {
        this.cargarTac(nombreCarpeta);
      }
    });

    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

    this.tacService.getTacsByPaciente(this.pacienteId).subscribe((data) => {
      this.tacs = data;

      data.forEach(tac => {
        this.tacService.getStudyDescription(tac.nombreCarpeta).subscribe(desc => {
          tac.descripcion = desc;
        });
      });
    });
  }

  cargarTac(nombreCarpeta: string | undefined) {
    if (!nombreCarpeta) return;

    this.currentTac = nombreCarpeta;
    this.tacService.getDicomFilesByCarpeta(nombreCarpeta).subscribe((files) => {
      this.dicomFiles = files;
      this.currentIndex = 0;
      this.loadDicomImage(nombreCarpeta);
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

    const imageId = `wadouri:/https://neosaludback.onrender.com/tac/${carpeta}/${fileName}`;

    cornerstone.loadImage(imageId).then((image: any) => {
      cornerstone.displayImage(this.dicomImage.nativeElement, image);

      const dataSet = image.data;
      const studyDescription = dataSet.string('x00081030');
      console.log('Descripción del estudio:', studyDescription);
      this.tituloTac = studyDescription || 'Sin descripción';
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
      viewport.scale = Math.max(viewport.scale - 0.1, 0.1); // Reduce el zoom, pero no permite valores negativos
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
