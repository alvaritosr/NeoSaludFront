import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import * as dicomParser from 'dicom-parser';
import { HttpClient } from '@angular/common/http';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-visor-dicom',
  templateUrl: './visor-dicom.component.html',
  styleUrls: ['./visor-dicom.component.scss'],
  standalone: true,
  imports: [
    FormsModule
  ]
})
export class VisorDicomComponent implements OnInit {
  @ViewChild('dicomImage') dicomImage!: ElementRef;

  dicomFiles: any[] = [];
  currentIndex: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>(`http://localhost:8080/tac/estudio/301D3YOC`).subscribe((files) => {
      this.dicomFiles = files;
      this.loadDicomImage();
    });
  }

  ngAfterViewInit() {
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

    cornerstoneWADOImageLoader.configure({
      beforeSend: function (xhr: any) {
      }
    });

    cornerstone.enable(this.dicomImage.nativeElement);
  }

  loadDicomImage() {
    if (this.dicomFiles.length === 0) return;

    const fileName = this.dicomFiles[this.currentIndex].fileName;
    const imageId = `wadouri:http://localhost:8080/tac/301D3YOC/${fileName}`;

    cornerstone.loadImage(imageId).then((image: any) => {
      cornerstone.displayImage(this.dicomImage.nativeElement, image);
    });
  }
}
