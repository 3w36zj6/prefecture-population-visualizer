import { md5 } from "js-md5";
import { hslToRgb } from "./hslToRgb";
import { rgbToHex } from "./rgbToHex";
import { seededRandom } from "./seededRandom";

export const stringToRgbHex = (str: string): string => {
  return `${rgbToHex(hslToRgb([360 * seededRandom(parseInt(md5(str).slice(0, 5), 16)), 0.8, 0.6]))}`;
};
