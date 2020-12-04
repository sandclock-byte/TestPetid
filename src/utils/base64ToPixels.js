import PNGReader from '../utils/png';


let uInt8ClampedArray = [];
export async function base64toPixels(base64) {

  base64ToUInt8ClampedArray(base64)
  await delay(1);

  let coloresDiferentes = []
  for (let x = 0; x < 200; x++) {
    for (let y = 0; y < 200; y++) {
      let arr = getPixel(x, y);
      if (coloresDiferentes !== []) {
        if (!isElement(coloresDiferentes, arr)) coloresDiferentes.push(arr);
      } else {
        coloresDiferentes.push(arr);
      }
    }
  }

  console.log(coloresDiferentes);

  let avg = 0;
  for (let i = 0; i < coloresDiferentes.length; i++) {
    avg += coloresDiferentes[i][1]; 
  }
  avg /= coloresDiferentes.length;

  console.log(avg);


  // console.log(uInt8ClampedArray);

  // let arr = uInt8ClampedArray.slice(0, 4);

  // console.log(rGBAToInt(arr));
  // let pixels = [];
  // let valores = [];

  // for (let i = 4; i < uInt8ClampedArray.length + 1; i += 4) {
  //   let arr = uInt8ClampedArray.slice(i - 4, i);
  //   // let valor = rGBAToInt(arr);
  //   let valor = aRGBToInt(arr);
  //   // valor < 252645375 ? valor = 1 : valor = 0;
  //   pixels.push(valor);
  //   if (valores === [] || valores.indexOf(valor) === -1) valores.push(valor);
  // }

  // valores.sort((a, b) => a - b);

  // // console.log(pixelInt);

  // console.log(valores);

  // let cArray = '0x';
  // let pareja = 0;
  // for (let i = 4; i < pixels.length + 1; i += 4) {
  //   let arr = pixels.slice(i-4, i);
  //   cArray += binToHex(arr);
  //   pareja++;
  //   if (pareja === 2 || i === pixels.length - 1) {
  //     cArray += ',0x';
  //     pareja = 0;
  //   }
  // }

  // console.log(cArray);






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

const rGBAToInt = (rGBA) => {
  let r = rGBA[0] & 0XFF;
  let g = rGBA[1] & 0XFF;
  let b = rGBA[2] & 0XFF;
  let a = rGBA[3] & 0XFF;

  // return (r << 24) + (g << 16) + (b << 8) + (a);
  return (r << 24) + (g << 16) + (b << 8);
}
const aRGBToInt = (rGBA) => {
  let a = rGBA[0] & 0XFF;
  let r = rGBA[1] & 0XFF;
  let g = rGBA[2] & 0XFF;
  let b = rGBA[3] & 0XFF;

  // return (a << 24) + (r << 16) + (g << 8) + (b);
  return (a << 24) + (r << 16) + (g << 8);
}

const arrayEqual = (a, b) => {
  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

const getPixel = (x, y) => {
  const red = y * (200 * 4) + x * 4;
  return [
    uInt8ClampedArray[red],
    uInt8ClampedArray[red + 1],
    uInt8ClampedArray[red + 2],
    uInt8ClampedArray[red + 3]
  ];
};

const isElement = (arr1, arr2) => {
  let isElement = false;
  for (let i = 0; i < arr1.length; i++) {
    if (!arrayEqual(arr1[i], arr2)) {
      isElement = false;
    } else {
      isElement = true;
      break;
    }
  }
  return isElement;
}

const hexadecimales = [...'0123456789abcdef'];
const binToHex = (bin) => {
  let posicionChar = 0;
  for (let i = 0; i < 4; i++) {
    posicionChar += bin[i] * Math.pow(2, (4 - (i + 1)));
  }
  return hexadecimales[posicionChar];
}

const grayscale = (data) => {
  for (let i = 0; i < data.length; i += 4) {
    let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i]     = avg; // red
    data[i + 1] = avg; // green
    data[i + 2] = avg; // blue
  }
}