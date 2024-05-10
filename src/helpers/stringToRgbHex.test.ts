import { describe, expect, test } from "bun:test";
import { stringToRgbHex } from "./stringToRgbHex";

describe("stringToRgbHex", () => {
  test("同じシード値で生成した色が等しい", () => {
    const hex1 = stringToRgbHex("test");
    const hex2 = stringToRgbHex("test");
    expect(hex1).toBe(hex2);
  });
  test("異なるシード値で生成した色が異なる", () => {
    const hex1 = stringToRgbHex("test");
    const hex2 = stringToRgbHex("test2");
    expect(hex1).not.toBe(hex2);
  });
});
