import { beforeEach, describe, expect, Mock, mock, test } from "bun:test";
import { PopulationCompositionPerYear } from "../domain/models/Population";
import { PopulationUseCase } from "./PopulationUseCase";

describe("PopulationUseCase", () => {
  let useCase: PopulationUseCase;
  let mockRepository: {
    getPopulationCompositionPerYear: Mock<
      (
        prefCode: string,
        cityCode?: string,
      ) => Promise<PopulationCompositionPerYear>
    >;
  };

  beforeEach(() => {
    mockRepository = {
      getPopulationCompositionPerYear: mock(),
    };
    useCase = new PopulationUseCase(mockRepository);
  });

  test("人口構成の取得", async () => {
    mockRepository.getPopulationCompositionPerYear.mockResolvedValue({
      boundaryYear: 2020,
      totalPopulation: [{ year: 1980, value: 12817 }],
      youngPopulation: [{ year: 1980, value: 2906, rate: 22.67 }],
      productiveAgePopulation: [{ year: 1980, value: 8360, rate: 65.23 }],
      elderlyPopulation: [{ year: 1980, value: 1550, rate: 12.09 }],
    });

    const result = await useCase.getPopulationCompositionPerYear("11", "11362");

    expect(result).toStrictEqual({
      boundaryYear: 2020,
      totalPopulation: [{ year: 1980, value: 12817 }],
      youngPopulation: [{ year: 1980, value: 2906, rate: 22.67 }],
      productiveAgePopulation: [{ year: 1980, value: 8360, rate: 65.23 }],
      elderlyPopulation: [{ year: 1980, value: 1550, rate: 12.09 }],
    });

    expect(
      mockRepository.getPopulationCompositionPerYear,
    ).toHaveBeenCalledTimes(1);
    expect(mockRepository.getPopulationCompositionPerYear).toHaveBeenCalledWith(
      "11",
      "11362",
    );
  });
});
