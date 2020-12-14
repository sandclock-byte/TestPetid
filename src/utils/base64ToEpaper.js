import PNGReader from '../utils/png';
import ImageResizer from 'react-native-image-resizer';
import ImgToBase64 from 'react-native-image-base64';
const Buffer = require('buffer').Buffer;
global.Buffer = Buffer; // very important
const jpeg = require('jpeg-js');

/* 
     * Función que genera imagen en formato "Epaper" con base64 de PNG 
     * y modifica un estado para envíarlo
     * 
     * @param { base64 } "Información de imagen en base64"
     * @param { setValue } "Función que modifica estado"
     *
     * @author   Fernando Bernal Díaz (fernando.bernal@ditems.com)
     * @license  DITEMS
     */

/** Método que se exporta, hace mención de los demás métodos para ejecutar el proceso */
export async function base64PNGtoEpaper(base64, setValue) {

  /** Aquí tomamos el base64 de una Imagen, se redimesiona a 200x200px y se obtiene la uri */
  let uri = await ImageResizer.createResizedImage(base64, 200, 200, 'PNG', 100)
    .then(response => {
      return response.uri;
    });

  /** Se toma la uri y se obtiene base64 de imagen redimensionada */
  let base64Resized = await ImgToBase64.getBase64String(uri)
    .then(base64String => {
      return base64String
    });

  /** Se asigna en uInt8ClampedArray los valores de los pixeles puede ser en RGB o RGBA depende del móvil */
  base64ToUInt8ClampedArray(base64Resized, uInt8ClampedArray => {
    /** Se pasa la información de los Pixeles y se asigna a estado el formato para Epaper*/
    toEpaper(uInt8ClampedArray, setValue);
  });
}

/** Método que se encarga de obtener la información de pixeles del base64 de Imagen */
function base64ToUInt8ClampedArray(base64, callback) {
  const pngBytes = atob(base64);
  const reader = new PNGReader(pngBytes);
  reader.parse((err, png) => {
    callback(png.pixels);
  });
}

/** Método que transforma binarios en Hexadecimales */
const hexadecimales = [...'0123456789abcdef'];
const binToHex = (bin) => {
  let posicionChar = 0;
  for (let i = 0; i < 4; i++) {
    posicionChar += bin[i] * Math.pow(2, (4 - (i + 1)));
  }
  return hexadecimales[posicionChar];
}

/** Método que toma la información de pixeles y modifica estado con el formato Epaper. */
// const toEpaper = (uInt8ClampedArray, setValue) => {
const toEpaper = (uInt8ClampedArray, setValue) => {

  // Esta constante nos sirve para identificar si la información del Pixel es RGBA o RGB
  const pixelLength = uInt8ClampedArray.length / 40000; // Toma el valor de 4 si el pixel es RGBA o 3 si es RGB.

  // Tomamos la información de los pixeles y los tranformamos en binarios
  let pixels = [];
  for (let i = pixelLength; i < uInt8ClampedArray.length; i += pixelLength) {
    let valor = uInt8ClampedArray[i - pixelLength]; // Solo nos fijamos en la primera coordenada de cada pixel
    valor >= 128 ? pixels.push(1) : pixels.push(0); // Asignamos el valor de 1 si está mas cerca del blanco y 0 si esta más cerca del negro
  }

  // Se juntan los binarios en grupos de 4
  let binario = [];
  for (let i = 4; i < pixels.length; i += 4) {
    binario.push(pixels.slice(i - 4, i));
  }

  // Se Genera la cadena con el formato para Epaper
  let cArray = '';
  for (let i = 1; i < binario.length; i += 2) {
    cArray += `0x${binToHex(binario[i - 1]) + binToHex(binario[i])}`;
    if (i !== binario.length - 2) cArray += ',';
  }

  // Se modifica estado con cadena para Epaper
  setValue(cArray);
}

export const base64JPGtoEpaper = (base64) => {
  const jpegData = Buffer.from(base64, 'base64');
  let uInt8ClampedArray = jpeg.decode(jpegData).data;
  console.log(uInt8ClampedArray);
}