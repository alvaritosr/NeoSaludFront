import * as cornerstone from '@cornerstonejs/core';
import * as cornerstoneTools from '@cornerstonejs/tools';

let initialized = false;

export async function initDemo() {
  if (initialized) return;

  await cornerstone.init();
  cornerstoneTools.init();

  // Registro del image loader para el esquema 'cornerstone:image'
  cornerstone.imageLoader.registerImageLoader('cornerstone', (imageId: string) => {
    const url = imageId.replace('cornerstone:', '');

    const promise = fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error al cargar imagen: ${response.statusText}`);
        }
        return response.blob();
      })
      .then(blob => createImageFromBlob(blob, imageId));

    return {
      promise,
      cancelFn: () => {},
      decache: () => {},
    };
  });

  initialized = true;
}

async function createImageFromBlob(blob: Blob, imageId: string) {
  const img = await loadHTMLImageFromBlob(blob);
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('No se pudo obtener el contexto 2D');

  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, img.width, img.height);

  return {
    imageId,
    minPixelValue: 0,
    maxPixelValue: 255,
    slope: 1.0,
    intercept: 0,
    windowCenter: 128,
    windowWidth: 256,
    getPixelData: () => new Uint8Array(imageData.data.buffer),
    rows: imageData.height,
    columns: imageData.width,
    height: imageData.height,
    width: imageData.width,
    color: true,
    rgba: true,
    sizeInBytes: imageData.data.byteLength,
  };
}

function loadHTMLImageFromBlob(blob: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(blob);
  });
}

// Función auxiliar para cargar imagen si necesitas desde fuera
export async function loadCornerstoneImage(imageId: string) {
  const url = imageId.replace('cornerstone:image:', '');

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Error cargando imagen: ${response.statusText}`);

  const blob = await response.blob();
  return createImageFromBlob(blob, imageId);
}
