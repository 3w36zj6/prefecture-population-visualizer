import { describe, expect, test } from "bun:test";
import { rgbToHex } from "./rgbToHex";

describe("rgbToHex", () => {
  test("RGBを16進数に変換する", () => {
    const hex = rgbToHex([165, 216, 216]);
    expect(hex).toBe("#a5d8d8");
  });
});
