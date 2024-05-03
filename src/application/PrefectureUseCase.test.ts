import { beforeEach, describe, expect, mock, Mock, test } from "bun:test";
import { Prefecture } from "../domain/models/Prefecture";
import { PrefectureUseCase } from "./PrefectureUseCase";

describe("PrefectureUseCase", () => {
  let useCase: PrefectureUseCase;
  let mockRepository: {
    getPrefectures: Mock<() => Promise<Prefecture[]>>;
  };

  beforeEach(() => {
    mockRepository = {
      getPrefectures: mock(),
    };
    useCase = new PrefectureUseCase(mockRepository);
  });

  test("都道府県の取得", async () => {
    mockRepository.getPrefectures.mockResolvedValue([
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

    const result = await useCase.getPrefectures();

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

    expect(mockRepository.getPrefectures).toHaveBeenCalledTimes(1);
  });
});
