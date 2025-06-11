import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import * as cornerstone from 'cornerstone-core';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import * as dicomParser from 'dicom-parser';

@Component({
  selector: 'app-dicom-viewer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <input [(ngModel)]="filename" placeholder="Nombre archivo DICOM" />
      <button (click)="loadDicom()">Cargar Radiografía</button>
    </div>
    <div #dicomImage style="width:512px; height:512px; background-color:black; margin-top:1rem;"></div>
  `,
})
export class DicomViewerComponent implements OnInit {
  @ViewChild('dicomImage', { static: true }) dicomImage!: ElementRef<HTMLDivElement>;

  filename = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Configurar cornerstone-wado-image-loader para usar cornerstone y dicom-parser
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

    // Inicializar el loader (opcionalmente configurar)
    cornerstoneWADOImageLoader.configure({
      useWebWorkers: true,
      taskConfiguration: {
        decodeTask: {
          codecsPath: '/assets/cornerstoneWADOImageLoaderCodecs/', // Cambia a donde tengas los codecs wasm
        },
      },
    });

    cornerstone.enable(this.dicomImage.nativeElement);
  }

  loadDicom() {
    if (!this.filename) {
      alert('Introduce el nombre del archivo DICOM');
      return;
    }

    console.log('Cargando DICOM:', this.filename);
    const imageId = `wadouri:http://localhost:5433/radiografia/dicom/${this.filename}`;

    cornerstone.loadImage(imageId).then((image: any) => {
      cornerstone.displayImage(this.dicomImage.nativeElement, image);
    }).catch((err: any) => {
      console.error('Error cargando DICOM:', err);
      alert('Error cargando el archivo DICOM');
    });
  }
}
