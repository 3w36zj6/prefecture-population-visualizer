import { describe, expect, test } from "bun:test";
import { getURLParams } from "./getURLParams";

describe("getURLParams", () => {
  test("URLパラメータがあるときのURLパラメータの取得", () => {
    const url = "https://example.com/?alice=a&bob=b";
    const params = getURLParams(url);
    expect(params).toStrictEqual({
      alice: "a",
      bob: "b",
    });
  });
  test("URLパラメータがないときのURLパラメータの取得", () => {
    const url = "https://example.com/";
    const params = getURLParams(url);
    expect(params).toStrictEqual({});
  });
});
