import PNGReader from '../utils/png';
import ImageResizer from 'react-native-image-resizer';
import ImgToBase64 from 'react-native-image-base64';
import base64 from 'react-native-base64';
const Buffer = require('buffer').Buffer;
global.Buffer = Buffer; // Muy importante
const jpeg = require('jpeg-js');
import { createFromRGBAArray } from 'png-pong';
import { epaperFilter } from './epaperFilter';


/** 
     * Funciones que analizan y procesan a las imagenes en base 
     * a las necesidades del dispositivo PET-ID 
     *
     * @author   Fernando Bernal Díaz (fernando.bernal@ditems.com)
     * @license  DITEMS
     */


/** 
  * Función que genera un string de la imagen en formato "Epaper", modifica un estado 
  * con la cadena para porteriormente ser envíado
  * 
  * @param { string } base64  base64 de Imagen png
  * @param { setState } setValue Función que modifica estado
  */
export async function base64PNGtoEpaper(base64, setValue) {

  //Aquí tomamos el base64 de una Imagen, se redimesiona a 200x200px y se obtiene la uri
  let uri = await ImageResizer.createResizedImage(base64, 200, 200, 'PNG', 100)
    .then(response => {
      return response.uri;
    });

  // Se toma la uri y se obtiene base64 de imagen redimensionada
  let base64Resized = await ImgToBase64.getBase64String(uri)
    .then(base64String => {
      return base64String
    });

  // Se asigna en uInt8ClampedArray los valores de los pixeles puede ser en RGB o RGBA depende del móvil
  base64ToUInt8ClampedArray(base64Resized, uInt8ClampedArray => {
    // Se pasa la información de los Pixeles y se asigna a estado el formato para Epaper
    toEpaper(uInt8ClampedArray, setValue);
  });
}

/**
 * Función que se encarga de obtener la información de pixeles del base64 de Imagen
 * @param {string} base64 Base64 de imagen PNG
 * @param {callback} callback Callback que se ejecuta despues de extraer PixelData
 */
function base64ToUInt8ClampedArray(base64, callback) {
  const pngBytes = atob(base64);
  const reader = new PNGReader(pngBytes);
  reader.parse((err, png) => {
    callback(png.pixels);
  });
}

const hexadecimales = [...'0123456789abcdef']; // Utilizamos este array para identificar el Hexadecimal correspondiente.
/**
 * Función que transforma binarios en Hexadecimales
 * @param {Array} bin Array de 4 binarios
 * @return {string} Hexadecimal correspondiente al binario
 */
const binToHex = (bin) => {
  let posicionChar = 0;
  for (let i = 0; i < 4; i++) {
    posicionChar += bin[i] * Math.pow(2, (4 - (i + 1)));
  }
  return hexadecimales[posicionChar];
}

const base64Char = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/']; // Utilizamos este array para identificar el Hexadecimal correspondiente.
const binToBase64 = (bin) => {
  let posicionChar = 0;
  let length = bin.length;
  for (let i = 0; i < length; i++) {
    posicionChar += bin[i] * Math.pow(2, (length - (i + 1)));
  }
  return base64Char[posicionChar];
}

/**
 * Función que toma la información de pixeles y modifica estado con el formato Epaper.
 * @param {Array} uInt8ClampedArray PixelData de la imagen
 * @param {setState} setValue Función que modifica estado
 */
const toEpaper = (uInt8ClampedArray, setValue) => {

  // Esta constante nos sirve para identificar si la información del Pixel es RGBA o RGB
  const pixelLength = uInt8ClampedArray.length / 40000; // Toma el valor de 4 si el pixel es RGBA o 3 si es RGB.

  // Tomamos la información de los pixeles y los tranformamos en binarios
  console.log('PixelData', uInt8ClampedArray.length)
  let pixels = [];
  for (let i = pixelLength; i <= uInt8ClampedArray.length + 1; i += pixelLength) {
    let valor = uInt8ClampedArray[i - pixelLength]; // Solo nos fijamos en la primera coordenada de cada pixel
    valor < 127 ? pixels.push(0) : pixels.push(1); // Asignamos el valor de 0 si esta más cerca del negro y 1 si está mas cerca del blanco
  }

  // // Se juntan los binarios en grupos de 4
  // let binario = [];
  // for (let i = 4; i < pixels.length; i += 4) {
  //   binario.push(pixels.slice(i - 4, i));
  // }

  // Se juntan los binarios en grupos de 6
  let binario = [];
  console.log('pixels.length',pixels.length);
  pixels.push(0, 0); // Se agregan 2 ceros para poder agruparlos en grupos de 6
  // console.log('pixels ultimo', pixels[pixels.length -1]);
  console.log('pixels.length',pixels.length);
  let j = 0;
  for (let i = 6; i <= pixels.length + 1; i += 6) {
    binario.push(pixels.slice(i - 6, i));
    j+=6;
  }

  // console.log(pixels);
  // console.log("i", j);

  // console.log('binario', binario);
  // console.log('binario ultimo', binario[binario.length -1]);

  
  let base64 = '';
  for (let i = 0; i < binario.length; i++) {
    base64 += binToBase64(binario[i]);
  }
  base64 += '=';

  // Se modifica estado con cadena para Epaper
  setValue(base64);


  // // Se Genera la cadena con el formato para Epaper
  // let cArray = '';
  // for (let i = 1; i < binario.length; i += 2) {
  //   cArray += `0x${binToHex(binario[i - 1]) + binToHex(binario[i])}`;
  //   if (i !== binario.length - 2) cArray += ',';
  // }

  // // Se modifica estado con cadena para Epaper
  // setValue(cArray);
}

/**
 * Función que recibe base64 de imagen en JPG, modifica state con CArray y retorna base64 en PNG de imagen con filtros
 * @param {string} base64 base64 de la imagen
 * @param {setState} setValue Función que modifica estado
 * 
 * @return {string} Base64 de imagen con filtro para Epaper.
 */
export const base64JPGtoEpaper = (base64, setValue) => {
  const jpegData = Buffer.from(base64, 'base64'); // Se extrae buffer de base64
  let uInt8ClampedArray = jpeg.decode(jpegData).data; // Se extrae pixelData
  epaperFilter(uInt8ClampedArray); // Se aplica filtro para Epaper en pixelData

  toEpaper(uInt8ClampedArray, setValue); // Se crea cArray y se almacena en state

  let uInt8Array = createFromRGBAArray(200, 200, uInt8ClampedArray); // Se crea arrayBuffer de pixelData para imagen de 200x200
  return `data:image/png;base64,${arrayBufferToBase64(uInt8Array)}`; // Retorna base64 de imagen con filtro
}

/**
 * Función que transforma uInt8Array (arrayBuffer) en base64 
 * @param {Buffer} buffer Buffer de la imagen
 * @return {string} Base64 de imagen con filtro para Epaper.
 */
const arrayBufferToBase64 = buffer => {
  let bytes = new Uint8Array(buffer);
  return base64.encodeFromByteArray(bytes);
};