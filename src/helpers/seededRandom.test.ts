import { describe, expect, test } from "bun:test";
import { seededRandom } from "./seededRandom";

describe("seededRandom", () => {
  test("同じシード値で生成した乱数が等しい", () => {
    const random1 = seededRandom(1234);
    const random2 = seededRandom(1234);
    expect(random1).toBe(random2);
  });
  test("異なるシード値で生成した乱数が異なる", () => {
    const random1 = seededRandom(1234);
    const random2 = seededRandom(1235);
    expect(random1).not.toBe(random2);
  });
});
