import { Component } from '@angular/core';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-hcdm-visor',
  templateUrl: './hcdm-visor.component.html',
  imports: [
    IonicModule
  ],
  styleUrls: ['./hcdm-visor.component.scss']
})
export class HcdmVisorComponent {
  protected zoomLevel = 1;
  private posX = 0;
  private posY = 0;
  private isDragging = false;
  private startX = 0;
  private startY = 0;

  constructor() {
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
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
