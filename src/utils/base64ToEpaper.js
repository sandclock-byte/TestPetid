import PNGReader from '../utils/png';
import ImageResizer from 'react-native-image-resizer';
import ImgToBase64 from 'react-native-image-base64';

/* 
     * Función que genera imagen en formato "Epaper" con base64 de PNG 
     * y modifica estado para desplegarlo
     * 
     * @param { base64 } "Información de imagen en base64"
     * @param { setCArray } "Función que modifica estado"
     *
     * @author   Fernando Bernal Díaz (fernando.bernal@ditems.com)
     * @license  DITEMS
     */

/** Variable dónde se van a guardar los pixeles en RGBA */
let uInt8ClampedArray = [];

/** Método que se exporta, hace mención de los demás métodos para ejecutar el proceso */
export async function base64toEpaper(base64, setCArray) {

  /** Aquí tomamos el base64 de una Imagen, se redimesiona a 200x200px y se obtiene la uri */
  let uri;
  ImageResizer.createResizedImage(base64, 200, 200, 'PNG', 100)
    .then(response => {
      uri = response.uri;
    })

  /** Damos un retraso de 10ms para esperar que la promesa asigne valor a uri */
  await delay(10);
  
  /** Se toma la uri y se obtiene base64 de imagen redimensionada */
  let base64Resized;
  ImgToBase64.getBase64String(uri)
  .then(base64String => base64Resized = base64String);
  
  /** Damos un retraso de 10ms para esperar que la promesa asigne valor a base64Resized */
  await delay(10);
  
  /** Se asigna en uInt8ClampedArray los valores de los pixeles en RGBA */
  base64ToUInt8ClampedArray(base64Resized)
  
  /** Damos un retraso de 10ms para esperar que la promesa asigne valor a uInt8ClampedArray */
  await delay(10);

  /** Se pasan la información de los Pixeles y se asigna a estado el formato para Epaper*/
  toEpaper(uInt8ClampedArray, setCArray);
}

/** Método que se encarga de obtener la información de pixeles del base64 de Imagen */
function base64ToUInt8ClampedArray(base64) {
  const pngBytes = atob(base64);
  const reader = new PNGReader(pngBytes);

  reader.parse((err, png) => {
    if (err) {
      console.error(err)
      return
    }
    uInt8ClampedArray = (png.pixels);
  })
}

/** Método que nos permite hacer un retraso en Ms */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


/** Método que tranforma binarios en Hexadecimales */
const hexadecimales = [...'0123456789abcdef'];
const binToHex = (bin) => {
  let posicionChar = 0;
  for (let i = 0; i < 4; i++) {
    posicionChar += bin[i] * Math.pow(2, (4 - (i + 1)));
  }
  return hexadecimales[posicionChar];
}

/** Método que toma la información de pixeles y modifica estado con el formato Epaper. */
const toEpaper = (uInt8ClampedArray, setCArray) => {
  
  // Tomamos la información de los pixeles y los tranformamos en binarios
  let pixels = [];
  for (let i = 4; i < uInt8ClampedArray.length; i += 4) {
    let arr = uInt8ClampedArray.slice(i - 4, i); // Agrupamos en 4 porque el pixel está en RGBA
    let valor = arr[0];
    valor >= 128 ? valor = 1 : valor = 0; // Asignamos el valor de 1 si está mas cerca del blanco y 0 si esta más cerca del negro
    pixels.push(valor);
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

  // Se modifica estado
  setCArray(cArray);
}