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
import { PopulationRepositoryImpl } from "./PopulationRepositoryImpl";

describe("PopulationRepositoryImpl", () => {
  let repository: PopulationRepositoryImpl;
  let mockFetchResasAPI: Mock<
    (endpoint: string, method?: string, body?: any) => Promise<any> // eslint-disable-line @typescript-eslint/no-explicit-any
  >;

  beforeEach(() => {
    repository = new PopulationRepositoryImpl();
    mockFetchResasAPI = spyOn(module, "fetchResasAPI");
    mockFetchResasAPI.mockImplementation(() =>
      Promise.resolve({
        boundaryYear: 2020,
        data: [
          {
            label: "総人口",
            data: [
              {
                year: 1980,
                value: 12817,
              },
            ],
          },
          {
            label: "年少人口",
            data: [
              {
                year: 1980,
                value: 2906,
                rate: 22.67,
              },
            ],
          },
          {
            label: "生産年齢人口",
            data: [
              {
                year: 1980,
                value: 8360,
                rate: 65.23,
              },
            ],
          },
          {
            label: "老年人口",
            data: [
              {
                year: 1980,
                value: 1550,
                rate: 12.09,
              },
            ],
          },
        ],
      }),
    );
  });

  afterEach(() => {
    mockFetchResasAPI.mockRestore();
  });

  test("人口構成の取得", async () => {
    const result = await repository.getPopulationCompositionPerYear(
      11,
      "11362",
    );
    expect(mockFetchResasAPI).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual({
      boundaryYear: 2020,
      totalPopulation: [
        {
          year: 1980,
          value: 12817,
        },
      ],
      youngPopulation: [
        {
          year: 1980,
          value: 2906,
          rate: 22.67,
        },
      ],
      productiveAgePopulation: [
        {
          year: 1980,
          value: 8360,
          rate: 65.23,
        },
      ],
      elderlyPopulation: [
        {
          year: 1980,
          value: 1550,
          rate: 12.09,
        },
      ],
    });
  });
});
