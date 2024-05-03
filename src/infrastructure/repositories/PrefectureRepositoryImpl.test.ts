import {
  afterEach,
  beforeEach,
  describe,
  expect,
  Mock,
  spyOn,
  test,
} from "bun:test";
import * as module from "../api/fetchResasAPI";
import { PrefectureRepositoryImpl } from "./PrefectureRepositoryImpl";

describe("PrefectureRepositoryImpl", () => {
  let repository: PrefectureRepositoryImpl;
  let mockFetchResasAPI: Mock<
    (endpoint: string, method?: string, body?: any) => Promise<any> // eslint-disable-line @typescript-eslint/no-explicit-any
  >;

  beforeEach(() => {
    repository = new PrefectureRepositoryImpl();
    mockFetchResasAPI = spyOn(module, "fetchResasAPI");
    mockFetchResasAPI.mockImplementation(() =>
      Promise.resolve([
        {
          prefCode: 1,
          prefName: "北海道",
        },
        {
          prefCode: 2,
          prefName: "青森県",
        },
        {
          prefCode: 3,
          prefName: "岩手県",
        },
      ]),
    );
  });

  afterEach(() => {
    mockFetchResasAPI.mockRestore();
  });

  test("都道府県の取得", async () => {
    const result = await repository.getPrefectures();
    expect(mockFetchResasAPI).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual([
      {
        prefCode: 1,
        prefName: "北海道",
      },
      {
        prefCode: 2,
        prefName: "青森県",
      },
      {
        prefCode: 3,
        prefName: "岩手県",
      },
    ]);
  });
});
