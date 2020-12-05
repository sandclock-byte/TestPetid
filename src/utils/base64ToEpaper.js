import PNGReader from '../utils/png';


let uInt8ClampedArray = [];
export async function base64toEpaper(base64) {

  base64ToUInt8ClampedArray(base64)
  await delay(1);

  return toEpaper(uInt8ClampedArray);
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

const toEpaper = (uInt8ClampedArray) => {
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

  return cArray;
}