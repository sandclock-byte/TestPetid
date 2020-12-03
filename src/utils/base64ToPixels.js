import PNGReader from '../utils/png';

export default function base64toPixels(base64) {
  const base64Data = base64.slice(22); // removes the preamble ("data:image/png;base64,")
    const pngBytes = atob(base64Data);
    const reader = new PNGReader(pngBytes);
    reader.parse(function(err, png) {
      console.log(err, '---', png)
      if(err) {
        console.error(err)
        return
      }
      console.log('Color at left top most pixel: ', png.pixels.slice(0, 4))
    })
}