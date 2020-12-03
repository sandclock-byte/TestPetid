import PNGReader from '../utils/png';


let uInt8ClampedArray = [];
export async function base64toPixels(base64) {

  base64ToUInt8ClampedArray(base64)
  await delay(1);

  // console.log(uInt8ClampedArray);

  // let arr = uInt8ClampedArray.slice(0, 4);

  // console.log(rGBAToInt(arr));
  let pixelInt = [];
  for(let i = 4; i < uInt8ClampedArray.length + 1; i += 4) {
    let arr = uInt8ClampedArray.slice(i-4, i);
    pixelInt.push(rGBAToInt(arr));
  }

  console.log(pixelInt);

}

function base64ToUInt8ClampedArray(base64) {
  const base64Data = base64.slice(22); // removes the preamble ("data:image/png;base64,")
  const pngBytes = atob(base64Data);
  const reader = new PNGReader(pngBytes);

  reader.parse((err, png) => {
    uInt8ClampedArray = (png.pixels);
  })
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const rGBAToInt = (rGBA) => {
  let r = rGBA[0] & 0XFF;
  let g = rGBA[1] & 0XFF;
  let b = rGBA[2] & 0XFF;
  let a = rGBA[3] & 0XFF;

  return (r << 240) + (g << 16) + (b << 8) + (a);
 }
const aRGBToInt = (rGBA) => {
  let a = rGBA[0] & 0XFF;
  let r = rGBA[1] & 0XFF;
  let g = rGBA[2] & 0XFF;
  let b = rGBA[3] & 0XFF;

  return (a << 24) + (r << 16) + (g << 8) + (b);
 }