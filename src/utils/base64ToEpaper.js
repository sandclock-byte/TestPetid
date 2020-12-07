import PNGReader from '../utils/png';
import ImageResizer from 'react-native-image-resizer';
import ImgToBase64 from 'react-native-image-base64';


let uInt8ClampedArray = [];
let base64Resized;
let path;
export async function base64toEpaper(base64, setCArray) {

  ImageResizer.createResizedImage(base64, 200, 200,'PNG', 100)
  .then(response => {
    // response.uri is the URI of the new image that can now be displayed, uploaded...
    // response.path is the path of the new image
    // response.name is the name of the new image with the extension
    // response.size is the size of the new image
    path = response.uri;
  })
  await delay(100);
  
  console.log(path);
  
  ImgToBase64.getBase64String(path)
  .then(base64String => base64Resized = base64String);
  
  await delay(100);
  console.log(base64Resized);
  

  // base64ToUInt8ClampedArray(base64Resized)
  // await delay(1);

  // toEpaper(uInt8ClampedArray, setCArray);
}

function base64ToUInt8ClampedArray(base64) {
  const base64Data = base64.slice(22); // remueve el segmento ("data:image/png;base64,")
  const pngBytes = atob(base64Data);
  const reader = new PNGReader(pngBytes);

  reader.parse((err, png) => {
    if (err) {
      console.error(err)
      return
    }
    uInt8ClampedArray = (png.pixels);
  })
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


const hexadecimales = [...'0123456789abcdef'];
const binToHex = (bin) => {
  let posicionChar = 0;
  for (let i = 0; i < 4; i++) {
    posicionChar += bin[i] * Math.pow(2, (4 - (i + 1)));
  }
  return hexadecimales[posicionChar];
}

const toEpaper = (uInt8ClampedArray, setCArray) => {
  let pixels = [];

  for (let i = 4; i < uInt8ClampedArray.length; i += 4) {
    let arr = uInt8ClampedArray.slice(i - 4, i);
    let valor = arr[0];
    valor >= 128 ? valor = 1 : valor = 0;
    pixels.push(valor);
  }

  let binario = [];
  for (let i = 4; i < pixels.length; i += 4) {
    binario.push(pixels.slice(i - 4, i));
  }

  let cArray = '';
  for (let i = 1; i < binario.length; i += 2) {
    cArray += `0x${binToHex(binario[i - 1]) + binToHex(binario[i])}`;
    if(i !== binario.length - 2) cArray += ',';
  }

  setCArray(cArray);
}