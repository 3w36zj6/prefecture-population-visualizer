import { beforeEach, describe, expect, Mock, spyOn, test } from "bun:test";
import { fetchResasAPI } from "./fetchResasAPI";
Object.defineProperty(import.meta.env, "VITE_RESAS_API_KEY", {
  value: undefined,
});

describe("fetchResasAPI", () => {
  let mockFetch: Mock<
    (
      input: string | URL | globalThis.Request,
      init?: RequestInit,
    ) => Promise<any> // eslint-disable-line @typescript-eslint/no-explicit-any
  >;
  beforeEach(() => {
    mockFetch = spyOn(global, "fetch");
  });

  test("URLパラメータが未定義のときにエラーを返す", async () => {
    window.location.href = "https://example.com/";
    await expect(fetchResasAPI("api/v1/dummy")).rejects.toThrow(
      "'RESAS_API_KEY' is not defined. Please set the environment variable 'VITE_RESAS_API_KEY' during the build process or the URL parameter 'resas_api_key'.",
    );
  });

  test("レスポンスのステータスコードが200台以外のときにエラーを返す", async () => {
    window.location.href = "https://example.com/?resas_api_key=dummy";
    mockFetch.mockResolvedValue({
      ok: false,
      status: 403,
    });
    await expect(fetchResasAPI("api/v1/dummy")).rejects.toThrow(
      "Failed to fetch with status code 403",
    );
  });

  test("レスポンスがJSONでないときにエラーを返す", async () => {
    window.location.href = "https://example.com/?resas_api_key=dummy";
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
    });
    await expect(fetchResasAPI("api/v1/dummy")).rejects.toThrow(
      "Failed to parse response as JSON.",
    );
  });

  test("レスポンスが'result'プロパティを持たないときにエラーを返す", async () => {
    window.location.href = "https://example.com/?resas_api_key=dummy";
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({}),
    });
    await expect(fetchResasAPI("api/v1/dummy")).rejects.toThrow(
      "Response does not have 'result' field.",
    );
  });

  test("レスポンスの'result'プロパティの取得", async () => {
    window.location.href = "https://example.com/?resas_api_key=dummy";
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ result: "dummy" }),
    });
    expect(await fetchResasAPI("api/v1/dummy")).toStrictEqual("dummy");
  });
});
