type RGB = [number, number, number];

export const rgbToHex = (rgb: RGB): string => {
  return (
    "#" +
    rgb
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
};
