
export const epaperFilter = (data) => {
    toGrayScale(data);
    floydSteinberg(data);
    toMonochrome(data);
}

const floydSteinberg = (data) => {

    let oldpixel;
    let newpixel;
    let quant_error;
    let err_red, err_green, err_blue;

    for (let y = 0; y < 200; y++) {
        for (let x = 0; x < 200; x++) {
            oldpixel = get_pixel(x, y, data);
            newpixel = find_closest_palette_color(oldpixel);
            setPixel(x, y, newpixel, data);
            quant_error = color_diff(oldpixel, newpixel);

            err_red = quant_error[0];
            err_green = quant_error[1];
            err_blue = quant_error[2];

            if (x + 1 < 200)
                color_add_err(x + 1, y, (7 / 16) * err_red, (7 / 16) * err_green, (7 / 16) * err_blue, data);
            if (x - 1 > 0 && y + 1 < 200)
                color_add_err(x - 1, y + 1, (3 / 16) * err_red, (3 / 16) * err_green, (3 / 16) * err_blue, data);
            if (y + 1 < 200)
                color_add_err(x, y + 1, (5 / 16) * err_red, (5 / 16) * err_green, (5 / 16) * err_blue, data);
            if (x + 1 < 200)
                color_add_err(x + 1, y + 1, (1 / 16) * err_red, (1 / 16) * err_green, (1 / 16) * err_blue, data);
        }
    }
}

const clip = (x) => {
    return x < 0 ? 0 : (x > 255 ? 255 : x)
}

const setPixel = (x, y, color, data) => {
    let index = (x + y * 200) * 4;
    data[index + 0] = parseInt(color[0] + 0.5);
    data[index + 1] = parseInt(color[1] + 0.5);
    data[index + 2] = parseInt(color[2] + 0.5);
    data[index + 3] = 255;
}

const color_diff = (one, two) => {
    return [(one[0] - two[0]), (one[1] - two[1]), (one[2] - two[2])];
}

const color_add_err = (x, y, err_red, err_green, err_blue, data) => {
    let index = (x + y * 200) * 4;
    data[index + 0] = clip(data[index + 0] + err_red);
    data[index + 1] = clip(data[index + 1] + err_green);
    data[index + 2] = clip(data[index + 2] + err_blue);
    data[index + 3] = 255;
}

const find_closest_palette_color = (pixel) => {
    return (0.2126 * pixel[0] + 0.7152 * pixel[1] + 0.0722 * pixel[2]) > 128 ? [255, 255, 255] : [0, 0, 0];
}

const get_pixel = (x, y, data) => {
    let index = (x + y * 200) * 4;
    return [data[index + 0], data[index + 1], data[index + 2]];
}

const toGrayScale = (data) => {
    for (let i = 0; i < data.length; i += 4) {
        let gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = gray;
        data[i + 1] = gray;
        data[i + 2] = gray;
    }
}

const toMonochrome = (data) => {
    for (let i = 0; i <= data.length; i += 4) {
        data[i] = data[i] < 127 ? 0 : 255;
        data[i + 1] = data[i + 2] = data[i];
    }
}

