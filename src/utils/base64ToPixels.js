import PNGReader from '../utils/png';


let uInt8ClampedArray = [];
export async function base64toPixels(base64) {

  base64ToUInt8ClampedArray(base64)
  await delay(1);

  let pixels = [];

  for (let i = 4; i < uInt8ClampedArray.length + 1; i += 4) {
    let arr = uInt8ClampedArray.slice(i - 4, i);
    let valor = arr[1];
    valor > 115 ? valor = 1 : valor = 0;
    pixels.push(valor);
  }

  let cArray = '0x';
  let pareja = 0;
  for (let i = 4; i < pixels.length - 1; i += 4) {
    let arr = pixels.slice(i - 4, i);
    cArray += binToHex(arr);
    pareja++;
    if (pareja === 2) {
      if (i !== pixels.length - 5) cArray += ',0x';
      pareja = 0;
    }
  }

  console.log(cArray);

}

function base64ToUInt8ClampedArray(base64) {
  const base64Data = base64.slice(22); // removes the preamble ("data:image/png;base64,")
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

const getPixel = (x, y) => {
  const red = y * (200 * 4) + x * 4;
  return [
    uInt8ClampedArray[red],
    uInt8ClampedArray[red + 1],
    uInt8ClampedArray[red + 2],
    uInt8ClampedArray[red + 3]
  ];
};

const hexadecimales = [...'0123456789abcdef'];
const binToHex = (bin) => {
  let posicionChar = 0;
  for (let i = 0; i < 4; i++) {
    posicionChar += bin[i] * Math.pow(2, (4 - (i + 1)));
  }
  return hexadecimales[posicionChar];
}