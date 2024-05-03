import {
  afterEach,
  beforeEach,
  describe,
  expect,
  Mock,
  spyOn,
  test,
} from "bun:test";
import { PopulationUseCase } from "../application/PopulationUseCase";
import { PopulationCompositionPerYear } from "../domain/models/Population";
import { PopulationController } from "./PopulationController";

describe("PopulationController", () => {
  let controller: PopulationController;
  let mockGetPopulationCompositionPerYear: Mock<
    (
      prefCode: string,
      cityCode?: string,
    ) => Promise<PopulationCompositionPerYear>
  >;

  beforeEach(() => {
    mockGetPopulationCompositionPerYear = spyOn(
      PopulationUseCase.prototype,
      "getPopulationCompositionPerYear",
    ).mockImplementation(() =>
      Promise.resolve({
        boundaryYear: 2020,
        totalPopulation: [{ year: 1980, value: 12817 }],
        youngPopulation: [{ year: 1980, value: 2906, rate: 22.67 }],
        productiveAgePopulation: [{ year: 1980, value: 8360, rate: 65.23 }],
        elderlyPopulation: [{ year: 1980, value: 1550, rate: 12.09 }],
      }),
    );
    controller = new PopulationController();
  });
  afterEach(() => {
    mockGetPopulationCompositionPerYear.mockRestore();
  });

  test("人口構成の取得", async () => {
    const result = await controller.getPopulationCompositionPerYear(
      "11",
      "11362",
    );

    expect(result).toEqual({
      boundaryYear: 2020,
      totalPopulation: [{ year: 1980, value: 12817 }],
      youngPopulation: [{ year: 1980, value: 2906, rate: 22.67 }],
      productiveAgePopulation: [{ year: 1980, value: 8360, rate: 65.23 }],
      elderlyPopulation: [{ year: 1980, value: 1550, rate: 12.09 }],
    });
    expect(mockGetPopulationCompositionPerYear).toHaveBeenCalledTimes(1);
    expect(mockGetPopulationCompositionPerYear).toHaveBeenCalledWith(
      "11",
      "11362",
    );
  });
});
