type HSL = [number, number, number];
type RGB = [number, number, number];

export const hslToRgb = (hsl: HSL): RGB => {
  const [h, s, l] = hsl;

  const max = l + (s * (1 - Math.abs(2 * l - 1))) / 2;
  const min = l - (s * (1 - Math.abs(2 * l - 1))) / 2;

  let rgb: RGB;
  const i = Math.floor(h / 60);

  switch (i) {
    case 0:
    case 6:
      rgb = [max, min + (max - min) * (h / 60), min];
      break;

    case 1:
      rgb = [min + (max - min) * ((120 - h) / 60), max, min];
      break;

    case 2:
      rgb = [min, max, min + (max - min) * ((h - 120) / 60)];
      break;

    case 3:
      rgb = [min, min + (max - min) * ((240 - h) / 60), max];
      break;

    case 4:
      rgb = [min + (max - min) * ((h - 240) / 60), min, max];
      break;

    case 5:
      rgb = [max, min, min + (max - min) * ((360 - h) / 60)];
      break;

    default:
      rgb = [0, 0, 0];
  }

  return rgb.map((value) => Math.floor(value * 255)) as RGB;
};
