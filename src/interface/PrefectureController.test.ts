import {
  afterEach,
  beforeEach,
  describe,
  expect,
  Mock,
  spyOn,
  test,
} from "bun:test";
import { PrefectureUseCase } from "../application/PrefectureUseCase";
import { Prefecture } from "../domain/models/Prefecture";
import { PrefectureController } from "./PrefectureController";

describe("PrefectureController", () => {
  let controller: PrefectureController;
  let mockGetPrefectures: Mock<() => Promise<Prefecture[]>>;

  beforeEach(() => {
    mockGetPrefectures = spyOn(
      PrefectureUseCase.prototype,
      "getPrefectures",
    ).mockImplementation(() =>
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
    controller = new PrefectureController();
  });
  afterEach(() => {
    mockGetPrefectures.mockRestore();
  });

  test("都道府県の取得", async () => {
    const result = await controller.getPrefectures();

    expect(result).toEqual([
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
    expect(mockGetPrefectures).toHaveBeenCalledTimes(1);
    expect(mockGetPrefectures).toHaveBeenCalledWith();
  });
});
