import { describe, expect, test } from "bun:test";
import { hslToRgb } from "./hslToRgb";

describe("hslToRgb", () => {
  test("HSLをRGBに変換する", () => {
    const rgb = hslToRgb([180, 0.4, 0.75]);
    expect(rgb).toStrictEqual([165, 216, 216]);
  });
});
