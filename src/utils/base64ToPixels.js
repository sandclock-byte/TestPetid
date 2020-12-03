import PNGReader from '../utils/png';


let uInt8ClampedArray = [];
export async function base64toPixels(base64) {
  
  base64ToUInt8ClampedArray(base64)
  await delay(1);
  
  console.log(uInt8ClampedArray);

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